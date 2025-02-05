import { cn } from "@/lib/utils";

const Spinner = ({
  className,
  variant = "white",
}: {
  className?: string;
  variant: "black" | "white";
}) => {
  const styles = {
    black: "w-8 h-8 border-black rounded-full  border-4 border-t-transparent ",
    white: "w-8 h-8 border-white rounded-full  border-4 border-t-transparent ",
  };
  return (
    <svg
      className={cn(styles[variant], "animate-spin", className)}
      viewBox="0 0 24 24"
    ></svg>
  );
};

export default Spinner;
