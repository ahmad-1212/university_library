"use server";

import { db } from "@/database/drizzle";
import { users } from "@/database/schema";
import { appError } from "@/lib/appError";
import { emailTemplate } from "@/lib/utils";
import { sendEmail } from "@/lib/workflow";
import { eq } from "drizzle-orm";
import { revalidateTag } from "next/cache";
import { after } from "next/server";

export const approveUser = async (userId: string) => {
  try {
    const [user] = await db
      .update(users)
      .set({ status: "APPROVED" })
      .where(eq(users.id, userId))
      .returning();

    after(async () => {
      const template = emailTemplate.userApprove(user.fullName);
      await sendEmail({
        email: user.email,
        subject: "Approved Account",
        template,
      });
      revalidateTag(`user-record-${userId}`);
    });

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

export const changeUserRole = async (userId: string) => {
  try {
    const [user] = await db
      .select({ userRole: users.role })
      .from(users)
      .where(eq(users.id, userId))
      .limit(1);

    if (!user) return { success: false, message: "No user found with ID" };
    const role = user.userRole === "ADMIN" ? "USER" : "ADMIN";
    await db.update(users).set({ role }).where(eq(users.id, userId));
    return { success: true };
  } catch (err: any) {
    const { type, message } = appError(
      err,
      "Something went wrong while changing user status."
    );
    return {
      success: false,
      type,
      message,
    };
  }
};
