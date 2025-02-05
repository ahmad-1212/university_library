import { auth } from "@/auth";
import BorrowedBooks from "@/components/BorrowedBooks";
import UserDetailCard from "@/components/UserDetailCard";
import { db } from "@/database/drizzle";
import { users } from "@/database/schema";
import { eq } from "drizzle-orm";
import { unstable_cache } from "next/cache";
import { notFound } from "next/navigation";

// Cache user data with borrow records
export const currentUserWithBorrowRecords = async (
  userId: string | undefined
) => {
  if (!userId) return;
  const cachedRecords = unstable_cache(
    async () => {
      console.log("Records cached");
      const user = await db.query.users.findFirst({
        where: eq(users.id, userId || ""),
        with: {
          borrowRecords: {
            with: {
              bookId: true,
            },
          },
        },
      });
      return user;
    },
    [`user-record-${userId}`],
    { tags: [`user-record-${userId}`] }
  );
  return cachedRecords();
};

const Page = async () => {
  const session = await auth();
  const user = await currentUserWithBorrowRecords(session?.user?.id);
  const borrowRecords = user?.borrowRecords.map((record) => ({
    ...record,
    book: record.bookId,
  }));

  if (!user) {
    return notFound();
  }

  return (
    <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-20 mb-10">
      <UserDetailCard
        fullName={user?.fullName}
        email={user?.email}
        status={user?.status}
        universityCard={user?.universityCard}
        universityId={user?.universityId}
      />
      {borrowRecords && <BorrowedBooks records={borrowRecords} />}
    </div>
  );
};

export default Page;
