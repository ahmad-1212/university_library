import { auth } from "@/auth";
import Header from "@/components/Header";
import { db } from "@/database/drizzle";
import { users } from "@/database/schema";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { after } from "next/server";
import { ReactNode } from "react";

const layout = async ({ children }: { children: ReactNode }) => {
  const session = await auth();
  if (!session) redirect("/sign-in");
  const [user] = await db
    .select({ userRole: users.role })
    .from(users)
    .where(eq(users.id, session.user?.id || ""));
  after(async () => {
    if (!session?.user?.id) return;

    // Get the user and see if the last activity date is today
    const user = await db
      .select()
      .from(users)
      .where(eq(users.id, session?.user?.id))
      .limit(1);

    if (user[0].lastActivityDate === new Date().toISOString().slice(0, 10))
      return;
    await db
      .update(users)
      .set({ lastActivityDate: new Date().toISOString().slice(0, 10) })
      .where(eq(users.id, session?.user?.id));
  });

  return (
    <main className="root-container">
      <div className="mx-auto max-w-[1200px] w-full">
        <Header session={session} userRole={user.userRole} />
        <div className="mt-10 pb-20">{children}</div>
      </div>
    </main>
  );
};

export default layout;
