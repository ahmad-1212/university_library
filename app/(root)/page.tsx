import { auth } from "@/auth";
import BookList from "@/components/BookList";
import BookOverview from "@/components/BookOverview";
import { db } from "@/database/drizzle";
import { books } from "@/database/schema";
import { desc } from "drizzle-orm";
import { unstable_cache } from "next/cache";

export const getLatestBooks = unstable_cache(
  async (): Promise<{ total: number; latestBooks: Book[] }> => {
    console.log("Books Cached");
    const total = await db.$count(books);
    const latestBooks = (await db
      .select()
      .from(books)
      .limit(10)
      .orderBy(desc(books.createdAt))) as Book[];
    return { total, latestBooks };
  },
  ["books"],
  { tags: ["books"] }
);

const Home = async () => {
  const session = await auth();
  const { latestBooks } = await getLatestBooks();

  return (
    <>
      <BookOverview {...latestBooks[0]} userId={session?.user?.id as string} />
      {latestBooks.length >= 2 && (
        <>
          <h2 className="mt-28 font-bebas-neue text-4xl text-light-100">
            Latest Books
          </h2>
          <BookList
            session={session}
            books={latestBooks.slice(1)}
            containerClassName="mt-10"
          />
        </>
      )}
    </>
  );
};

export default Home;
