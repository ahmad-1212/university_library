"use server";

import { db } from "@/database/drizzle";
import { books, borrowRecords, users } from "@/database/schema";
import { appError } from "@/lib/appError";
import { emailTemplate } from "@/lib/utils";
import { sendEmail } from "@/lib/workflow";
import dayjs from "dayjs";
import { desc, eq, sql } from "drizzle-orm";
import { revalidateTag } from "next/cache";
import { after } from "next/server";

export const changeBorrowStatus = async (id: string, value: string) => {
  try {
    const status = value.toUpperCase() === "BORROWED" ? "BORROWED" : "RETURNED";
    const returnDate = status === "RETURNED" ? dayjs().toISOString() : null;

    // 1️⃣ Update borrow record status
    const [updatedRecord] = await db
      .update(borrowRecords)
      .set({ status, returnDate })
      .where(eq(borrowRecords.id, id))
      .returning();

    if (!updatedRecord) {
      return { success: false, message: "No record found with ID" };
    }

    // 2️⃣ Directly increment/decrement available copies
    const copiesChange = status === "RETURNED" ? 1 : -1;

    const [updatedBook] = await db
      .update(books)
      .set({
        availableCopies: sql`${books.availableCopies} + ${copiesChange}`,
      })
      .where(eq(books.id, updatedRecord.bookId))
      .returning();

    after(async () => {
      if (value.toUpperCase() === "RETURNED") {
        const [user] = await db
          .select({ fullName: users.fullName, email: users.email })
          .from(users)
          .where(eq(users.id, updatedRecord.userId))
          .limit(1);
        if (user) {
          const template = emailTemplate.bookReturn(
            user.fullName,
            updatedBook.title
          );
          // await sendEmail({
          //   email: user.email,
          //   subject: "Thanks for Returning the Book!",
          //   template,
          // });
        }
      }

      const [isRecentBook] = await db
        .select({ id: books.id })
        .from(books)
        .orderBy(desc(books.createdAt))
        .limit(1);

      if (isRecentBook.id === updatedBook.id) {
        revalidateTag("books");
      }
      revalidateTag(`book-${updatedBook.id}`);
      revalidateTag(`user-record-${updatedRecord.userId}`);
    });
    return { success: true };
  } catch (err: any) {
    const { type, message } = appError(
      err,
      "Something went wrong while changing the status of the record. Please try again!"
    );
    return { success: false, type, message };
  }
};
