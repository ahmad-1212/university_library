"use client";

import { cloneElement, isValidElement, ReactElement, ReactNode } from "react";

interface Props {
  children: ReactNode;
  path?: string;
}

const SearchFormReset = ({ children, path }: Props) => {
  const resetForm = () => {
    window.location.href = path || window.location.href;
  };

  if (!isValidElement(children)) {
    throw new Error("SearchFormReset requries a valid ReactElement as a child");
  }

  return cloneElement(children as ReactElement<any>, {
    onClick: resetForm,
  });
};

export default SearchFormReset;
