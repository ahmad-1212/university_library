"use server";

import { db } from "@/database/drizzle";
import { books } from "@/database/schema";

export const createBook = async (params: BookParams) => {
  try {
    console.log(params);
    const newBook = await db
      .insert(books)
      .values({ ...params, availableCopies: params.totalCopies })
      .returning();

    return { success: true, data: JSON.parse(JSON.stringify(newBook[0])) };
  } catch (err: any) {
    console.log(err);
    return {
      success: false,
      message: err.message,
    };
  }
};
