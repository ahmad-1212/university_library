"use server";

import { db } from "@/database/drizzle";
import { books } from "@/database/schema";
import { appError } from "@/lib/appError";
import { eq } from "drizzle-orm";
import { revalidateTag } from "next/cache";

export const createBook = async (params: BookParams) => {
  try {
    const newBook = await db
      .insert(books)
      .values({ ...params, availableCopies: params.totalCopies })
      .returning();

    revalidateTag("books");

    return { success: true, data: JSON.parse(JSON.stringify(newBook[0])) };
  } catch (err: any) {
    const { type, message } = appError(
      err,
      "Something went wrong while creating the book, Please try again!"
    );
    return {
      success: false,
      type,
      message,
    };
  }
};

export const updateBook = async (params: { bookId?: string } & BookParams) => {
  try {
    const { bookId } = params;
    if (!bookId)
      return {
        success: false,
        message: "No book ID provided, Please provide book ID!",
      };
    const updatedBook = await db
      .update(books)
      .set({ ...params })
      .where(eq(books.id, bookId))
      .returning();

    revalidateTag(`book-${bookId}`);

    return {
      success: true,
      data: JSON.parse(JSON.stringify(updatedBook)),
    };
  } catch (err: any) {
    const { type, message } = appError(
      err,
      "Something went wrong while updating the book, Please try again!"
    );
    return {
      success: false,
      type,
      message,
    };
  }
};

export const deleteBook = async (bookId: string) => {
  try {
    await db.delete(books).where(eq(books.id, bookId));
    revalidateTag("books");
    return {
      success: true,
    };
  } catch (err: any) {
    const { type, message } = appError(
      err,
      "Something went wrong while deleting book, Please try again later!"
    );
    return {
      success: false,
      type,
      message,
    };
  }
};
