import BooksList from "@/components/admin/BooksList";
import AppPagination from "@/components/AppPagination";
import { Button } from "@/components/ui/button";
import { db } from "@/database/drizzle";
import { books } from "@/database/schema";
import { desc, ilike, or } from "drizzle-orm";
import Link from "next/link";
import React from "react";

export const getBooks = async ({
  page = 1,
  limit,
  query,
}: {
  page?: number;
  limit: number;
  query?: string;
}): Promise<{ total: number; booksList: Partial<Book>[] }> => {
  const searchCondition = or(
    ilike(books.title, `%${query}%`),
    ilike(books.author, `%${query}%`),
    ilike(books.genre, `%${query}%`)
  );

  const [total, list] = await Promise.all([
    db.$count(books, query ? searchCondition : undefined),
    db
      .select({
        id: books.id,
        title: books.title,
        author: books.author,
        genre: books.genre,
        coverUrl: books.coverUrl,
        coverColor: books.coverColor,
        createdAt: books.createdAt,
      })
      .from(books)
      .where(query ? searchCondition : undefined)
      .orderBy(desc(books.createdAt))
      .limit(limit)
      .offset((page - 1) * limit),
  ]);

  return {
    total,
    booksList: list,
  };
};

const LIMIT = 10;
const Page = async ({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) => {
  const { page, query } = await searchParams;
  const { total, booksList } = await getBooks({
    limit: LIMIT,
    page: Number(page) ?? 1,
    query,
  });
  const totalPages = Math.ceil(total / LIMIT);
  return (
    <section className="w-full rounded-2xl bg-white p-7">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-xl font-semibold">All Books</h2>
        <Button className="bg-primary-admin hover:bg-primary-admin/90" asChild>
          <Link href="/admin/books/new" className="text-white ">
            + Create a New Book
          </Link>
        </Button>
      </div>

      <div className="mt-7 w-full overflow-hidden">
        <BooksList books={booksList} />

        {totalPages > 1 && (
          <AppPagination totalPages={totalPages} variant="light" />
        )}
      </div>
    </section>
  );
};

export default Page;
