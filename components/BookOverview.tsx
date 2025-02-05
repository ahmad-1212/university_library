import Image from "next/image";
import { Button } from "./ui/button";
import BookCover from "./BookCover";
import BorrowBook from "./BorrowBook";
import { db } from "@/database/drizzle";
import { eq } from "drizzle-orm";
import { users } from "@/database/schema";
import { currentUserWithBorrowRecords } from "@/app/(root)/my-profile/page";

interface Props extends Book {
  userId: string;
}

const BookOverview = async ({
  title,
  author,
  genre,
  rating,
  totalCopies,
  availableCopies,
  description,
  coverColor,
  coverUrl,
  id,
  userId,
}: Props) => {
  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.id, userId))
    .limit(1);

  const borrowingEligibility = {
    isEligible: availableCopies > 0 && user.status === "APPROVED",
    message:
      availableCopies === 0
        ? "Book is not available for borrowing"
        : "You are not allowed to borrow this book until your account is approved!",
  };

  let isBorrowedBook: BorrowRecord | undefined;

  if (borrowingEligibility.isEligible) {
    const userRecords = (await currentUserWithBorrowRecords(user.id))
      ?.borrowRecords;
    const foundRecord = userRecords?.find((record) => record.bookId.id === id);

    if (foundRecord) {
      isBorrowedBook = {
        ...foundRecord,
        book: foundRecord.bookId, // Fix: Convert bookId to book
      } as BorrowRecord;
    }
  }

  return (
    <section className="book-overview">
      <div className="flex flex-1 flex-col gap-5">
        <h1>{title}</h1>
        <div className="book-info">
          <p>
            By <span className="font-semibold text-light-200">{author}</span>
          </p>
          <p>
            Category{" "}
            <span className="font-semibold text-lime-200">{genre}</span>
          </p>
          <div className="flex flex-row gap-1">
            <Image src="/icons/star.svg" alt="Star" width={22} height={22} />
            <p>{rating}</p>
          </div>
        </div>
        <div className="book-copies">
          <p>
            Total Books: <span>{totalCopies}</span>
          </p>
          <p>
            Available Books: <span>{availableCopies}</span>
          </p>
        </div>
        <p className="book-description">{description}</p>
        {user && (
          <BorrowBook
            userId={userId}
            bookId={id}
            borrowingEligibility={borrowingEligibility}
            borrowedRecord={isBorrowedBook}
          />
        )}
      </div>
      <div className="relative flex flex-1 justify-center">
        <div className="relative">
          <BookCover
            variant="wide"
            className="z-10"
            coverColor={coverColor}
            coverImage={coverUrl}
          />
          <div className="absolute left-16 top-10 rotate-12 opacity-40 max-sm:hidden">
            <BookCover
              variant="wide"
              className="z-10"
              coverColor={coverColor}
              coverImage={coverUrl}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookOverview;
