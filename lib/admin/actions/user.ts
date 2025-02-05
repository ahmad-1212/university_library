"use server";

import { db } from "@/database/drizzle";
import { users } from "@/database/schema";
import { appError } from "@/lib/appError";
import { eq } from "drizzle-orm";

export const approveUser = async (userId: string) => {
  try {
    await db
      .update(users)
      .set({ status: "APPROVED" })
      .where(eq(users.id, userId));

    return {
      success: true,
    };
  } catch (err: any) {
    const { type, message } = appError(
      err,
      "Something went wrong while approving user account, Please try again!"
    );
    return {
      success: false,
      type,
      message,
    };
  }
};

export const revokeUser = async (userId: string) => {
  try {
    await db
      .update(users)
      .set({ status: "REJECTED" })
      .where(eq(users.id, userId));

    return {
      success: true,
    };
  } catch (err: any) {
    const { type, message } = appError(
      err,
      "Something went wrong while rejecting user account, Please try again!"
    );
    return {
      success: false,
      type,
      message,
    };
  }
};
