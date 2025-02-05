import config from "@/lib/config";
import { getInitials } from "@/lib/utils";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

import Image from "next/image";

interface Props {
  fullName: string;
  status: "PENDING" | "APPROVED" | "REJECTED" | null;
  email: string;
  universityId: number;
  universityCard: string;
}

const UserDetailCard = ({
  fullName,
  status,
  email,
  universityId,
  universityCard,
}: Props) => (
  <section className="gradient-blue h-min rounded-xl pt-[7rem] p-10 text-white relative">
    {/* Badge */}
    <div className="badge absolute -top-4 left-1/2 -translate-x-1/2 ">
      <span></span>
    </div>
    {/* User detail */}
    <div className="flex flex-col gap-10">
      <div className="flex flex-row gap-7">
        {/* Avatar */}
        <Avatar className="size-20">
          <AvatarFallback className="bg-amber-100 text-dark-300 text-3xl font-bold">
            {getInitials(fullName)}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col justify-between">
          {/* status */}
          <div className="flex flex-row items-center gap-1">
            <Image
              src={
                status === "APPROVED"
                  ? "/icons/verified.svg"
                  : "/icons/warning.svg"
              }
              width={14}
              height={14}
              alt="user status"
            />{" "}
            <h6 className="capitalize text-xs text-light-100">
              {status !== "APPROVED" ? "Not Verified" : "Verified"} student
            </h6>
          </div>
          {/* Name */}
          <h2 className="text-2xl font-bold">{fullName}</h2>
          {/* Email */}
          <h6 className="text-sm text-light-100">{email}</h6>
        </div>
      </div>

      <div className="flex flex-col gap-1 ">
        <p className="text-light-100 text-md font-extralight">Universty</p>
        <h2 className="text-white text-2xl font-bold">Swat University</h2>
      </div>

      <div className="flex flex-col gap-1 ">
        <p className="text-light-100 text-md font-extralight">Student ID</p>
        <h2 className="text-white text-2xl font-bold">{universityId}</h2>
      </div>

      <div>
        <Image
          src={`${config.env.imageKit.urlEndpoint}/${universityCard}`}
          alt="university card"
          height={300}
          width={200}
          className="w-[100%] rounded-xl"
        />
      </div>
    </div>
  </section>
);

export default UserDetailCard;
