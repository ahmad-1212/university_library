import { getBooks } from "@/app/admin/books/page";
import React from "react";
import BookStripe from "./BookStripe";
import Image from "next/image";
import Link from "next/link";

const RecentBooks = async () => {
  const { booksList } = await getBooks({ limit: 8 });
  await new Promise((res) => setTimeout(res, 1000));

  return (
    <section className="flex flex-1 flex-col gap-10 bg-white p-5 rounded-lg">
      <div>
        <h2 className="text-xl font-bold">Recently added Books</h2>
      </div>
      <ul className="flex flex-col gap-4">
        <li className="book-stripe">
          <Link
            href="/admin/books/new"
            className="w-full flex items-center gap-7"
          >
            <Image
              src="/icons/admin/plus.svg"
              width={20}
              height={20}
              alt="add"
            />
            <h4 className="font-semibold">Add New Book</h4>
          </Link>
        </li>
        {booksList.map((book) => (
          <BookStripe
            key={book.id}
            id={book.id}
            title={book.title}
            author={book.author}
            createdAt={book.createdAt}
            coverColor={book.coverColor}
            coverUrl={book.coverUrl}
            genre={book.genre}
            showBorrowedUser={false}
          />
        ))}
      </ul>
    </section>
  );
};

export default RecentBooks;
