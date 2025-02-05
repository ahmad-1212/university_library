import { auth } from "@/auth";
import BookOverview from "@/components/BookOverview";
import BookVideo from "@/components/BookVideo";
import RelatedBooks from "@/components/RelatedBooks";
import { db } from "@/database/drizzle";
import { books } from "@/database/schema";
import { eq } from "drizzle-orm";
import { unstable_cache } from "next/cache";
import { notFound } from "next/navigation";
import { Suspense } from "react";

// Using unstable_cache directly for caching
const fetchBook = (bookId: string): Promise<Book> => {
  const getCachedBook = unstable_cache(
    async (): Promise<Book> => {
      console.log("CACHED");
      const [bookDetails] = await db
        .select()
        .from(books)
        .where(eq(books.id, bookId))
        .limit(1);

      if (!bookDetails) notFound();
      return bookDetails;
    },
    [`book-${bookId}`],
    { tags: [`book-${bookId}`] }
  );

  return getCachedBook();
};

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const session = await auth();

  const bookDetails = await fetchBook(id); // Fetching book details with cache

  return (
    <>
      <BookOverview {...bookDetails} userId={session?.user?.id as string} />
      <div className="book-details">
        <div className="flex-[1.5]">
          <section className="flex flex-col gap-7 items-start">
            <h3>Video</h3>
            <BookVideo videoUrl={bookDetails.videoUrl} />
          </section>
          <section className="mt-10 flex flex-col gap-7">
            <h3>Summary</h3>
            <div className="space-y-5 text-xl text-light-100">
              {bookDetails.summary.split("\n").map((line, i) => (
                <p key={i}>{line}</p>
              ))}
            </div>
          </section>
        </div>

        {/* Similar */}
        <Suspense
          fallback={
            <div className="text-white flex-1 text-xl text-center mt-10">
              Loading...
            </div>
          }
        >
          <RelatedBooks bookId={id} bookGenre={bookDetails.genre} />
        </Suspense>
      </div>
    </>
  );
};

export default Page;
