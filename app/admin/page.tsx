import RecentBooks from "@/components/admin/dashboard/RecentBooks";
import RecentBorrow from "@/components/admin/dashboard/RecentBorrow";
import RecentRequest from "@/components/admin/dashboard/RecentRequest";
import Stats from "@/components/admin/dashboard/Stats";
import Spinner from "@/components/ui/spinner";
import Link from "next/link";
import React, { Suspense } from "react";

const Loading = () => {
  return (
    <div className="flex-1 h-full py-20 bg-white flex items-center justify-center gap-3">
      <Spinner variant="black" />
      <span>Loading...</span>
    </div>
  );
};

const Page = () => {
  return (
    <>
      {/* Stats */}
      <Stats />

      {/* Borrow Requests | Recently added Books */}
      <div className="flex xl:flex-row flex-col gap-3 mt-7">
        <div className="flex-1 flex flex-col gap-7">
          {/* Borrow Requests */}
          <section className="flex flex-col gap-10 bg-white p-5 rounded-lg">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold ">Borrow Requests</h2>
              <Link href="/admin/borrow-records" className="view-btn">
                View All
              </Link>
            </div>
            <Suspense fallback={<Loading />}>
              <RecentBorrow />
            </Suspense>
          </section>
          {/* Recent Requests */}
          <section className="flex flex-col gap-10 bg-white p-5 rounded-lg">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold ">Account Requests</h2>
              <Link href="/admin/account-requests" className="view-btn">
                View All
              </Link>
            </div>
            <Suspense fallback={<Loading />}>
              <RecentRequest />
            </Suspense>
          </section>
        </div>
        <Suspense fallback={<Loading />}>
          <RecentBooks />
        </Suspense>
      </div>
    </>
  );
};

export default Page;
