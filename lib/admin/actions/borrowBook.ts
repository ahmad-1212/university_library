"use server";

import { db } from "@/database/drizzle";
import { books, borrowRecords } from "@/database/schema";
import { appError } from "@/lib/appError";
import dayjs from "dayjs";
import { eq, sql } from "drizzle-orm";

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

    await db
      .update(books)
      .set({
        availableCopies: sql`${books.availableCopies} + ${copiesChange}`,
      })
      .where(eq(books.id, updatedRecord.bookId));

    return { success: true };
  } catch (err: any) {
    const { type, message } = appError(
      err,
      "Something went wrong while changing the status of the record. Please try again!"
    );
    return { success: false, type, message };
  }
};
