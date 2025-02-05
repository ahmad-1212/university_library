import BorrowedBooksList from "@/components/admin/BorrowedBooksList";
import AppPagination from "@/components/AppPagination";
import { db } from "@/database/drizzle";
import { books, borrowRecords, users } from "@/database/schema";
import { desc, eq, getTableColumns, ilike, or, sql } from "drizzle-orm";
import React from "react";

export const getBorrowRecords = async ({
  query,
  page = 1,
  limit,
}: {
  query?: string;
  page?: number;
  limit: number;
}) => {
  const searchCondition = or(
    ilike(users.fullName, `%${query}%`), // Filter by user's full name
    ilike(books.title, `%${query}%`) // Filter by book's title
  );

  const { userId, bookId, ...rest } = getTableColumns(borrowRecords);

  const records = await db
    .select({
      ...rest,
      user: {
        fullName: users.fullName,
        email: users.email,
      },
      book: {
        title: books.title,
        coverColor: books.coverColor,
        coverUrl: books.coverUrl,
        author: books.author,
        genre: books.genre,
      },
      total: sql<number>`COUNT(*) OVER()`.as("total"),
    })
    .from(borrowRecords)
    .leftJoin(users, eq(borrowRecords.userId, users.id)) // Join with users table
    .leftJoin(books, eq(borrowRecords.bookId, books.id))
    .where(query ? searchCondition : undefined) // Join with books table
    .orderBy(desc(borrowRecords.createdAt))
    .limit(limit)
    .offset((page - 1) * limit)
    .groupBy(
      borrowRecords.id,
      users.fullName,
      users.email,
      books.title,
      books.coverColor,
      books.coverUrl,
      books.author,
      books.genre
    );
  const total = records.length > 0 ? records[0].total : 0;
  return {
    total,
    list: records,
  };
};

const LIMIT = 10;
const Page = async ({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) => {
  const { query, page } = await searchParams;
  const { total, list } = await getBorrowRecords({
    page: Number(page) ?? 1,
    limit: LIMIT,
    query,
  });
  const totalPages = Math.ceil(total / LIMIT);

  return (
    <section className="bg-white flex flex-col gap-7 py-10 px-7 rounded-lg ]">
      <h2 className="font-bold text-xl">Borrow Book Requests</h2>

      {/* Borrowed Books List */}
      <BorrowedBooksList borrowRecords={list as BorrowRecord[]} />
      {totalPages > 1 && (
        <AppPagination totalPages={totalPages} variant="light" />
      )}
    </section>
  );
};

export default Page;
