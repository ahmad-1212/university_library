import { getLatestBooks } from "@/app/(root)/page";
import { auth } from "@/auth";
import { db } from "@/database/drizzle";
import { books } from "@/database/schema";
import { desc, ilike, or } from "drizzle-orm";
import React from "react";
import BookList from "./BookList";
import AppPagination from "./AppPagination";
import Image from "next/image";
import SearchFormReset from "./SearchFormReset";
import { Button } from "./ui/button";

const getBooks = async (
  query: string | null,
  page: string,
  limit: number
): Promise<{ total: number; bookList: Book[] }> => {
  const currentPage = Number(page) || 1;
  let bookList: Book[] = [];
  let total = 0;
  if (query || currentPage > 1) {
    const searchCondition = or(
      ilike(books.title, `%${query}%`),
      ilike(books.author, `%${query}%`)
    );

    total = await db.$count(books, query ? searchCondition : undefined);

    bookList = (await db
      .select()
      .from(books)
      .where(query ? searchCondition : undefined)
      .orderBy(desc(books.createdAt))
      .limit(limit)
      .offset((currentPage - 1) * limit)) as Book[];
    return {
      total: total,
      bookList,
    };
  } else {
    const { total, latestBooks } = await getLatestBooks();
    return {
      total,
      bookList: latestBooks.slice(0, limit),
    };
  }
};

interface Props {
  query: string | null;
  page: string;
  limit: number;
}

const SearchedBooks = async ({ query, page, limit }: Props) => {
  const session = await auth();
  const { total, bookList } = await getBooks(query, page, limit);
  const totalPages = Math.ceil(Number(total) / limit);

  return (
    <>
      <h2 className="font-ibm-plex-sans text-[32px] font-semibold text-light-100 mt-10">
        Search Results for "<span className="text-primary">{query}</span>"
      </h2>
      {/* Show book list */}
      {bookList.length > 0 ? (
        <>
          <BookList
            session={session}
            containerClassName="capitalize mt-5"
            books={bookList}
          />
          {totalPages > 1 && (
            <AppPagination variant="dark" totalPages={totalPages} />
          )}
        </>
      ) : (
        // Not Found
        <div id="not-found" className="mt-10">
          <Image
            src="/images/no-books.png"
            width={150}
            height={200}
            alt="Book not found"
          />
          <h4>No Results Found</h4>
          <p>
            We couldn&aspos;t find any books matching your search. Try using
            different keywords or check for typos.
          </p>
          {/* Reset search form button */}
          <SearchFormReset path="/books/search" formSelector=".search">
            <Button type="reset" className="not-found-btn">
              Clear Search
            </Button>
          </SearchFormReset>
        </div>
      )}
    </>
  );
};

export default SearchedBooks;
