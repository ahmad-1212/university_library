"use server";

import { db } from "@/database/drizzle";
import { books, borrowRecords, users } from "@/database/schema";
import { eq } from "drizzle-orm";
import dayjs from "dayjs";
import { revalidateTag } from "next/cache";
import { workFlowClient } from "../workflow";

import config from "../config";

export const borrowBook = async (params: BorrowBookParams) => {
  const { userId, bookId } = params;

  try {
    const book = await db
      .select()
      .from(books)
      .where(eq(books.id, bookId))
      .limit(1);

    if (!book.length || book[0].availableCopies <= 0) {
      return {
        success: false,
        error: "Book is not available for borrowing",
      };
    }

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

    await workFlowClient.trigger({
      url: `${config.env.prodApiEndpoint}/api/workflow/onBorrowing`,
      body: {
        email: user.email,
        fullName: user.fullName,
        recordId: record[0].id,
        bookTitle: book[0].title,
      },
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
