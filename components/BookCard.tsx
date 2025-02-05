import Link from "next/link";
import BookCover from "./BookCover";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import BorrowedBookStatus from "./BorrowedBookStatus";

interface Props extends Book {
  borrowedRecords?: BorrowRecord[];
}

const BookCard = ({
  id,
  title,
  genre,
  coverColor,
  coverUrl,
  borrowedRecords,
}: Props) => {
  // Check if the book is borrowed
  const isBorrowed = borrowedRecords?.find(
    (record: BorrowRecord) => record.book.id === id
  );

  // check if the borrowed book is returned or not
  const isReturned = isBorrowed?.status === "RETURNED";
  return (
    <li className={cn(isBorrowed && "xs:w-52 w-full")}>
      <Link
        href={`/books/${id}`}
        className={cn(isBorrowed && "w-full flex flex-col items-center")}
      >
        <BookCover coverColor={coverColor} coverImage={coverUrl} />

        <div className={cn("mt-4", !isBorrowed && "xs:max-w-40 max-w-28")}>
          <p className="book-title">{title}</p>
          <p className="book-genre">{genre}</p>
        </div>

        {isBorrowed && !isReturned && (
          <div className="mt-3 w-full">
            <BorrowedBookStatus
              dueDate={isBorrowed.dueDate}
              status={isBorrowed.status}
            />
            <Button className="book-btn ">Upload receipt</Button>
          </div>
        )}
      </Link>
    </li>
  );
};

export default BookCard;
