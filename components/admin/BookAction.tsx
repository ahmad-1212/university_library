"use client";

import Image from "next/image";
import { toast } from "@/hooks/use-toast";
import { deleteBook } from "@/lib/admin/actions/book";
import { useRouter } from "next/navigation";
import { useState } from "react";

const BookAction = ({ bookId }: { bookId?: string }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleClick = async () => {
    if (!bookId) {
      return toast({
        title: "Error",
        description: "Something went wrong!",
        variant: "destructive",
      });
    } else {
      setLoading(true);
      const result = await deleteBook(bookId);
      setLoading(false);
      if (result.success) {
        toast({
          title: "Success",
          description: "Book successfully deleted",
        });
        router.refresh();
      } else {
        toast({
          title: "Error",
          description: result.message,
          variant: "destructive",
        });
      }
    }
  };
  return (
    <button
      className="all-unset disabled:opacity-50 disabled:cursor-not-allowed"
      disabled={loading}
      onClick={handleClick}
    >
      <Image src="/icons/admin/trash.svg" width={20} height={20} alt="delete" />
    </button>
  );
};

export default BookAction;
