import { Session } from "next-auth";
import BookCard from "./BookCard";
import { currentUserWithBorrowRecords } from "@/app/(root)/my-profile/page";

interface Props {
  books: Book[];
  containerClassName?: string;
  session: Session | null;
}

const BookList = async ({ books, containerClassName, session }: Props) => {
  const user = await currentUserWithBorrowRecords(session?.user?.id);
  const records = user?.borrowRecords?.map((record) => ({
    ...record,
    book: record.bookId,
  }));
  return (
    <section className={containerClassName}>
      {
        <ul className="book-list">
          {books?.map((book: Book) => (
            <BookCard key={book.id} {...book} borrowedRecords={records} />
          ))}
        </ul>
      }
    </section>
  );
};

export default BookList;
