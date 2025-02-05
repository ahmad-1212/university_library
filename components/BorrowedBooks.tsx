import Link from "next/link";
import BorrowedBookDetail from "./BorrowedBookDetail";

const BorrowedBooks = async ({ records }: { records: BorrowRecord[] }) => (
  <section>
    <h1 className="text-light-100 text-2xl font-semibold mb-10">
      Borrowed Books
    </h1>

    {records.length > 0 ? (
      <ul className="custom-grid gap-5  gap-y-10">
        {records?.map((record) => (
          <BorrowedBookDetail key={record.id} {...record} />
        ))}
      </ul>
    ) : (
      <div id="not-found" className="mt-[6rem]">
        <h4>No Records Found!</h4>
        <p>
          Looks like you haven&apos;t borrowed any books yet. Start exploring
          our collection!
        </p>
        <Link
          href={"/"}
          className="not-found-btn flex items-center justify-center rounded-sm"
        >
          Explore
        </Link>
      </div>
    )}
  </section>
);

export default BorrowedBooks;
