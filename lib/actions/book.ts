"use server";

import { db } from "@/database/drizzle";
import { books, borrowRecords, users } from "@/database/schema";
import { and, desc, eq } from "drizzle-orm";
import dayjs from "dayjs";
import { revalidateTag } from "next/cache";
import { workFlowClient } from "../workflow";

import config from "../config";
import { after } from "next/server";

export const borrowBook = async (params: BorrowBookParams) => {
  const { userId, bookId } = params;

  try {
    // 1. Check if book exists
    const book = await db
      .select()
      .from(books)
      .where(eq(books.id, bookId))
      .limit(1);

    // if book doesnot exists return error
    if (!book.length || book[0].availableCopies <= 0) {
      return {
        success: false,
        error: "Book is not available for borrowing",
      };
    }

    // 2. check if book is already borrowed or not
    const isBookBorrowed = await db
      .select({ id: borrowRecords.id })
      .from(borrowRecords)
      .where(
        and(
          eq(borrowRecords.userId, userId),
          eq(borrowRecords.bookId, bookId),
          eq(borrowRecords.status, "BORROWED")
        )
      )
      .limit(1);

    // if book is borrowed return error
    if (isBookBorrowed.length > 0)
      return {
        success: false,
        error:
          "Book is already borrowed, Please renew it while visiting the Library!",
      };

    const dueDate = dayjs().add(7, "day").toDate().toDateString();

    const record = await db
      .insert(borrowRecords)
      .values({ userId, bookId, dueDate, status: "BORROWED" })
      .returning();

    const [user] = await db
      .select({ email: users.email, fullName: users.fullName })
      .from(users)
      .where(eq(users.id, userId))
      .limit(1);

    await db
      .update(books)
      .set({ availableCopies: book[0].availableCopies - 1 })
      .where(eq(books.id, bookId))
      .returning();

    after(async () => {
      await workFlowClient.trigger({
        url: `${config.env.prodApiEndpoint}/api/workflow/onBorrowing`,
        body: {
          email: user.email,
          fullName: user.fullName,
          recordId: record[0].id,
          bookTitle: book[0].title,
        },
      });
      const [isRecentBook] = await db
        .select({ id: books.id })
        .from(books)
        .orderBy(desc(books.createdAt))
        .limit(1);
      if (isRecentBook.id === params.bookId) {
        revalidateTag("books");
      }
      revalidateTag(`book-${params.bookId}`);
    });

    revalidateTag(`user-record-${userId}`);
    return {
      success: true,
      data: JSON.parse(JSON.stringify(record)),
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      error: "An error occurred while borrowing the book",
    };
  }
};
