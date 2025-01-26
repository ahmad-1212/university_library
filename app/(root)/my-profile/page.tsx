import { signOut } from "@/auth";
import BookList from "@/components/BookList";
import { Button } from "@/components/ui/button";
import { db } from "@/database/drizzle";
import { books } from "@/database/schema";

const Page = async () => {
  const booksArr = (await db.select().from(books).limit(10)) as Book[];
  return (
    <>
      <BookList title="Borrowed Books" books={booksArr} />
    </>
  );
};

export default Page;
