import React from "react";
import BookCover from "./BookCover";
import Image from "next/image";
import dayjs from "dayjs";
import BorrowedBookStatus from "./BorrowedBookStatus";
import Receipt from "./Receipt/Receipt";

const BorrowedBookDetail = ({
  borrowDate,
  dueDate,
  returnDate,
  status,
  book,
  id,
}: BorrowRecord) => (
  <li key={book.id} className="p-5 rounded-xl flex flex-col gap-5 bg-dark-100">
    <div
      className={`py-5 flex justify-center w-full rounded-xl`}
      style={{ backgroundColor: `${book.coverColor}80` }}
    >
      <BookCover
        coverColor={book.coverColor || ""}
        coverImage={book.coverUrl || ""}
        variant="medium"
        className="shadow-xl"
      />
    </div>
    <div className="flex flex-col gap-1">
      <h1 className="text-xl text-white font-bold">{book.title}</h1>
      <p className="text-light-100 italic text-sm">{book.genre}</p>
    </div>
    <div className="flex flex-col gap-1 mt-auto">
      <div className="flex items-center gap-1 text-light-100">
        <Image
          src="/icons/book-2.svg"
          width={20}
          height={20}
          alt="borrowed book"
        />
        <p>Borrowed on {dayjs(borrowDate).format("MMM DD")}</p>
      </div>
      <div className="flex justify-between items-center">
        <BorrowedBookStatus
          status={status}
          dueDate={dueDate}
          returnDate={returnDate}
        />
        <div
          className="p-1 rounded-sm "
          style={{ backgroundColor: `${book.coverColor}80` }}
        >
          <Receipt
            bookAuthor={book.author!}
            bookGenre={book.genre!}
            bookTitle={book.title!}
            borrowDate={dayjs(borrowDate).format("MMM DD YYYY")}
            dueDate={dayjs(dueDate).format("MMM DD YYYY")}
            receiptId={id}
            disabled={status === "RETURNED" && true}
          >
            <a>
              <Image
                src="/icons/receipt.svg"
                width={15}
                height={15}
                alt="receipt"
              />
            </a>
          </Receipt>
        </div>
      </div>
    </div>
  </li>
);

export default BorrowedBookDetail;
