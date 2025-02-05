import RecentBooks from "@/components/admin/dashboard/RecentBooks";
import RecentBorrow from "@/components/admin/dashboard/RecentBorrow";
import RecentRequest from "@/components/admin/dashboard/RecentRequest";
import Stats from "@/components/admin/dashboard/Stats";
import Spinner from "@/components/ui/spinner";
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
          <Suspense fallback={<Loading />}>
            <RecentBorrow />
          </Suspense>
          <Suspense fallback={<Loading />}>
            <RecentRequest />
          </Suspense>
        </div>
        <Suspense fallback={<Loading />}>
          <RecentBooks />
        </Suspense>
      </div>
    </>
  );
};

export default Page;
