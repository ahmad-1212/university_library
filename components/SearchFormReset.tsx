"use client";

import { useRouter } from "next/navigation";
import { cloneElement, isValidElement, ReactElement, ReactNode } from "react";

interface Props {
  children: ReactNode;
  formSelector?: string;
  onReset?: () => void;
  path?: string;
}

const SearchFormReset = ({ children, formSelector, onReset, path }: Props) => {
  const router = useRouter();
  const resetForm = () => {
    const form = document.querySelector(
      formSelector || ".form"
    ) as HTMLFormElement;
    if (path) {
      form.querySelectorAll("input").forEach((input) => (input.value = ""));
      router.push(path);
    } else {
      formSelector || ".form";
      if (form) {
        form.value = "";
        form.reset();
        if (onReset) onReset();
      }
    }
  };

  if (!isValidElement(children)) {
    throw new Error("SearchFormReset requries a valid ReactElement as a child");
  }

  return cloneElement(children as ReactElement<any>, {
    onClick: resetForm,
  });
};

export default SearchFormReset;
