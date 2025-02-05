"use client"; // Error boundaries must be Client Components

import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Error({
  error,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <main className="bg-dark-200/50 p-10 mt-[150px] flex flex-col items-center justify-center gap-7">
      <h1 className="font-bebas-neue text-5xl font-bold text-light-100">
        Error:
      </h1>
      <p className=" max-w-xl text-center text-light-400">
        Invalid book ID or something went wrong, Please try again.
      </p>
      <Button onClick={() => router.back()}>
        <ArrowLeft />
        Go Back
      </Button>
    </main>
  );
}
