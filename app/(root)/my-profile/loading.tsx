import Spinner from "@/components/ui/spinner";
import React from "react";

const Loading = () => {
  return (
    <div className="text-white text-center text-xl mt-[140px] flex items-center justify-center gap-3">
      <Spinner variant="white" />
      <h4>Loading</h4>
    </div>
  );
};

export default Loading;
