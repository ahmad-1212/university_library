import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import dayjs from "dayjs";
import BookCover from "../BookCover";
import Image from "next/image";
import Link from "next/link";
import BookAction from "./BookAction";

const BooksList = ({ books }: { books: Partial<Book>[] }) => {
  if (books.length === 0) return <div>No books found</div>;
  return (
    <Table>
      <TableHeader className="">
        <TableRow className="bg-light-700/70 hover:bg-light-700/70 border-none text-sm">
          <TableHead className="w-[40%] font-normal text-black p-3">
            Book Title
          </TableHead>
          <TableHead className="font-normal text-black ">Author</TableHead>
          <TableHead className="font-normal text-black ">Genre</TableHead>
          <TableHead className="w-[15%] font-normal text-black ">
            Date Created
          </TableHead>
          <TableHead className=" font-normal text-black ">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {books?.map((book) => (
          <TableRow
            key={book.id}
            className="text-sm"
            style={{ borderBottom: "1px solid rgba(0,0,0,0.07)" }}
          >
            <TableCell className="font-medium">
              <div className="flex items-center gap-2">
                <BookCover
                  coverColor={book.coverColor ?? "#fff"}
                  coverImage={book.coverUrl ?? "#fff"}
                  variant="extraSmall"
                />
                {book.title}
              </div>
            </TableCell>
            <TableCell className="font-medium">
              <h3 className="line-clamp-1">{book.author}</h3>
            </TableCell>
            <TableCell className="font-medium">
              <p className="line-clamp-1">{book.genre}</p>
            </TableCell>
            <TableCell className="font-medium">
              {dayjs(book.createdAt).format("MMM DD YYYY")}
            </TableCell>

            <TableCell className="font-medium">
              <div className="flex gap-4">
                <Link href={`books/${book.id}`}>
                  <Image
                    src="/icons/admin/edit.svg"
                    width={20}
                    height={20}
                    alt="edit"
                  />
                </Link>
                <BookAction bookId={book.id} />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default BooksList;
