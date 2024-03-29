import { MouseEventHandler, ReactNode } from "react";
import clsx from "clsx";

interface Props {
  children: ReactNode;
  className?: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
}

function Button({ children, className, onClick }: Props) {
  return (
    <button
      className={clsx(
        "relative px-5 py-2 font-medium text-white group h-10",
        className,
      )}
      onClick={onClick}
    >
      <span className="absolute inset-0 w-full h-full transition-all duration-300 ease-out transform translate-x-0 -skew-x-12 bg-[#89B99B] group-hover:bg-[#9F9F9F] group-hover:skew-x-12"></span>
      <span className="absolute inset-0 w-full h-full transition-all duration-300 ease-out transform skew-x-12 bg-[#9F9F9F] group-hover:bg-[#89B99B] group-hover:-skew-x-12"></span>
      <span className="absolute bottom-0 left-0 hidden w-10 h-20 transition-all duration-100 ease-out transform -translate-x-8 translate-y-10 bg-purple-600 -rotate-12"></span>
      <span className="absolute bottom-0 right-0 hidden w-10 h-20 transition-all duration-100 ease-out transform translate-x-10 translate-y-8 bg-purple-400 -rotate-12"></span>
      <span className="relative">{children}</span>
    </button>
  );
}

export { Button };
