import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { userRoles } from "@/constants";
import Image from "next/image";

const UserRole = ({ user }: { user: User }) => {
  const role = userRoles.find((itm) => itm.value === user.role?.toLowerCase());
  const userRoleObj = userRoles[0];
  const adminRoleObj = userRoles[1];

  return (
    <Popover>
      <PopoverTrigger
        className=" px-3 rounded-full"
        style={{
          backgroundColor: role?.bgColor,
          color: role?.textColor,
        }}
      >
        {role?.label}
      </PopoverTrigger>
      <PopoverContent
        align="start"
        className="w-36 shadow-2xl flex flex-col gap-7"
      >
        <div className="flex justify-between ">
          <h5
            className="px-3 rounded-full"
            style={{
              backgroundColor: userRoleObj.bgColor,
              color: userRoleObj.textColor,
            }}
          >
            User
          </h5>
          {role?.value === "user" && (
            <Image
              src="/icons/admin/check.svg"
              width={20}
              height={20}
              alt="tick"
            />
          )}
        </div>
        <div className="flex justify-between ">
          <h5
            className="px-3 rounded-full"
            style={{
              backgroundColor: adminRoleObj.bgColor,
              color: adminRoleObj.textColor,
            }}
          >
            Admin
          </h5>
          {role?.value === "admin" && (
            <Image
              src="/icons/admin/check.svg"
              width={20}
              height={20}
              alt="tick"
            />
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
};
export default UserRole;
