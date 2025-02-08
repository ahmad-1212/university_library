import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import BookCover from "../BookCover";
import dayjs from "dayjs";
import BookReturnStatus from "./BookReturnStatus";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { getInitials } from "@/lib/utils";
import Receipt from "../Receipt/Receipt";
import Image from "next/image";

const BorrowedBooksList = ({
  borrowRecords,
}: {
  borrowRecords: BorrowRecord[];
}) => {
  if (borrowRecords.length === 0)
    return (
      <div className="text-xl font-semibold text-center py-10">
        No Records found!
      </div>
    );
  return (
    <Table>
      <TableHeader className="">
        <TableRow className="bg-light-700/70 hover:bg-light-700/70 border-none text-xs">
          <TableHead className=" font-normal text-black p-3">
            Book Title
          </TableHead>
          <TableHead className="font-normal text-black ">
            User Requested
          </TableHead>
          <TableHead className="font-normal text-black ">
            Borrowed Date
          </TableHead>
          <TableHead className=" font-normal text-black ">
            Return Date
          </TableHead>
          <TableHead className=" font-normal text-black ">Due Date</TableHead>
          <TableHead className=" font-normal text-black ">Status</TableHead>
          <TableHead className=" font-normal text-black ">Receipt</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {borrowRecords?.map((record) => (
          <TableRow
            key={record.id}
            className="text-xs"
            style={{ borderBottom: "1px solid rgba(0,0,0,0.07)" }}
          >
            <TableCell className="font-medium">
              <div className="flex items-center gap-2">
                <BookCover
                  coverColor={record.book.coverColor ?? "#fff"}
                  coverImage={record.book.coverUrl ?? "#fff"}
                  variant="extraSmall"
                />
                {record.book.title}
              </div>
            </TableCell>
            <TableCell className="font-medium">
              <div className="flex items-center gap-1">
                <Avatar>
                  <AvatarFallback>
                    {getInitials(record?.user?.fullName || "")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h5 className="font-bold">{record?.user?.fullName}</h5>
                  <p className="text-[10px] text-light-500">
                    {record?.user?.email}
                  </p>
                </div>
              </div>
            </TableCell>

            <TableCell className="font-medium text-[11px]">
              {dayjs(record.borrowDate).format("MMM DD YYYY")}
            </TableCell>

            <TableCell className="font-medium text-[11px]">
              {record.returnDate
                ? dayjs(record.returnDate).format("MMM DD YYYY")
                : "..."}
            </TableCell>

            <TableCell className="font-medium text-[11px]">
              {dayjs(record.dueDate).format("MMM DD YYYY")}
            </TableCell>

            <TableCell className="font-medium">
              <BookReturnStatus record={record} />
            </TableCell>

            <TableCell className="font-medium">
              <Receipt
                bookAuthor={record.book.author!}
                bookGenre={record.book.genre!}
                bookTitle={record.book.title!}
                borrowDate={record.borrowDate!}
                dueDate={record.dueDate!}
                receiptId={record.id!}
              >
                <a
                  aria-disabled={record.status === "RETURNED" ? true : false}
                  className="bg-primary-admin/5 rounded-sm py-1 px-2 flex items-center gap-1 shadow-sm aria-disabled:opacity-50 aria-disabled:cursor-not-allowed"
                >
                  <Image
                    src="/icons/admin/receipt.svg"
                    width={12}
                    height={12}
                    alt="receipt"
                  />
                  <span>Generate</span>
                </a>
              </Receipt>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default BorrowedBooksList;
