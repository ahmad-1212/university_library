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

const BorrowedBooksList = ({
  borrowRecords,
}: {
  borrowRecords: BorrowRecord[];
}) => {
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

            <TableCell className="font-medium">book receipt</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default BorrowedBooksList;
