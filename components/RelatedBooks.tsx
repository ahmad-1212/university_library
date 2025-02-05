import { db } from "@/database/drizzle";
import { books } from "@/database/schema";
import { and, ilike, ne } from "drizzle-orm";
import React from "react";
import BookCover from "./BookCover";
import Link from "next/link";

const RelatedBooks = async ({
  bookId,
  bookGenre,
}: {
  bookGenre: string;
  bookId: string;
}) => {
  const genre = bookGenre.split(" ").at(0);
  let relatedBooks: Book[] = [];
  if (genre) {
    relatedBooks = await db
      .select()
      .from(books)
      .where(and(ilike(books.genre, `%${genre}%`), ne(books.id, bookId)))
      .limit(6);
  }

  if (!relatedBooks.length) return null;

  return (
    <div className="flex flex-1 flex-col gap-7 h-full static lg:sticky top-0">
      <h3 className="text-primary">Similar Books</h3>
      <ul className="flex  gap-7 items-center  flex-wrap">
        {relatedBooks.map((book) => (
          <Link key={book.id} href={`/books/${book.id}`}>
            <BookCover
              coverColor={book.coverColor}
              coverImage={book.coverUrl}
              variant="medium"
            />
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default RelatedBooks;
