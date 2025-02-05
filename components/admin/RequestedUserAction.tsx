"use client";

import { approveUser, revokeUser } from "@/lib/admin/actions/user";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

const RequestedUserAction = ({ user }: { user: User }) => {
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const router = useRouter();

  const handleClick = async () => {
    setLoading(true);
    try {
      if (user.status === "PENDING") {
        await approveUser(user.id);
        router.refresh();
        setOpenModal(false);
      } else if (user.status === "APPROVED") {
        await revokeUser(user.id);
        router.refresh();
        setOpenModal(false);
      }
    } finally {
      setLoading(false);
    }
  };

  const isApproved = user.status === "APPROVED";
  const buttonLabel = isApproved ? "Revoke Account" : "Approve Account";
  const actionLabel = isApproved
    ? "Revoke Student Account"
    : "Approve & Send Confirmation";
  const dialogTitle = isApproved
    ? "Deny Account Access"
    : "Approve Account Request";
  const description = isApproved
    ? "Denying this request will notify the student they’re not eligible due to unsuccessful ID card verification."
    : "Approve the student's account request and grant access. A confirmation email will be sent upon approval.";

  if (user.status === "REJECTED") return null;

  return (
    <Dialog onOpenChange={setOpenModal} modal open={openModal}>
      <DialogTrigger
        className={cn(
          "confirm-trigger text-xs w-full py-3 rounded-lg px-7",
          isApproved ? "confirm-approve" : "confirm-reject"
        )}
      >
        {buttonLabel}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="confirm-content gap-4 mb-5">
          <div
            className={cn(
              "confirm-illustration",
              isApproved ? "bg-red-50" : "bg-green-100"
            )}
          >
            <div className={cn(isApproved ? "bg-red-500" : "bg-green-400")}>
              <Image
                src={
                  isApproved ? "/icons/admin/info.svg" : "/icons/admin/tick.svg"
                }
                width={35}
                height={35}
                alt={isApproved ? "Revoke Info" : "Approval Tick"}
              />
            </div>
          </div>
          <DialogTitle>{dialogTitle}</DialogTitle>
          <DialogDescription className="text-center">
            {description}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="w-full">
          <button
            onClick={handleClick}
            disabled={loading}
            className={cn(
              "confirm-btn flex items-center justify-center",
              isApproved ? "bg-red-500" : "bg-green-400",
              loading && "opacity-50 cursor-not-allowed"
            )}
          >
            {loading ? "Processing..." : actionLabel}
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RequestedUserAction;
