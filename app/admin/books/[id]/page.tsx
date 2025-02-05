import BookForm from "@/components/admin/forms/BookForm";
import { db } from "@/database/drizzle";
import { books } from "@/database/schema";
import { eq } from "drizzle-orm";
import React from "react";

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const [book] = await db.select().from(books).where(eq(books.id, id)).limit(1);

  return <BookForm bookId={id} type="update" {...book} />;
};

export default Page;
