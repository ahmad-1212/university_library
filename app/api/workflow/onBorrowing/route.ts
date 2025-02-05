import { db } from "@/database/drizzle";
import { borrowRecords } from "@/database/schema";
import { emailTemplate } from "@/lib/utils";
import { sendEmail } from "@/lib/workflow";
import { serve } from "@upstash/workflow/nextjs";
import dayjs from "dayjs";
import { eq } from "drizzle-orm";

type BorrowState = "RETURNED" | "BORROWED";

type InitialData = {
  email: string;
  fullName: string;
  recordId: string;
  bookTitle: string;
};

const getBorrowState = async (recordId: string): Promise<BorrowState> => {
  const record = await db
    .select()
    .from(borrowRecords)
    .where(eq(borrowRecords.id, recordId))
    .limit(1);

  if (record.length === 0 || record[0].status === "RETURNED") return "RETURNED";

  return "BORROWED";
};

export const { POST } = serve<InitialData>(async (context) => {
  const { email, fullName, recordId, bookTitle } = context.requestPayload;
  const [recordDetail] = await db
    .select()
    .from(borrowRecords)
    .where(eq(borrowRecords.id, recordId))
    .limit(1)
    .groupBy(borrowRecords.id);

  // Borrowed Book Email
  await context.run("borrowed-book", async () => {
    const template = emailTemplate.borrowedBook({
      name: fullName,
      borrowDate: recordDetail.borrowDate,
      dueDate: recordDetail.dueDate,
      bookTitle,
    });
    await sendEmail({
      email,
      subject: "Borrowed Book",
      template,
    });
  });

  const reminderDelay =
    (dayjs(recordDetail.dueDate).subtract(1, "day").valueOf() - Date.now()) /
    1000;
  await context.sleep("wait-for-reminder", reminderDelay);

  const state = await context.run("check-borrow-state", async () => {
    return await getBorrowState(recordId);
  });

  if (state !== "RETURNED") {
    await context.run("send-email-reminder", async () => {
      const template = emailTemplate.bookReminder({
        name: fullName,
        dueDate: recordDetail.dueDate,
        bookTitle,
      });
      await sendEmail({
        email,
        template,
        subject: "Reminder: Book Due Soon",
      });
    });
  }
});
