"use client";

import { usePathname, useRouter } from "next/navigation";
import { ActionTooltip } from "../action-tooltip";
import { cn } from "@/lib/utils";

export const NavigationConfessionsButton = () => {
  const router = useRouter();
  const pathname = usePathname();
  const isActive = pathname === "/confessions";

  const onClick = () => {
    router.push("/confessions");
  };

  return (
    <ActionTooltip side="right" align="center" label="Confessions">
      <button
        onClick={onClick}
        className={cn(
          "relative flex items-center justify-center h-[48px] w-[48px] rounded-[24px] transition-all overflow-hidden mx-3",
          isActive
            ? "bg-primary/10 text-primary rounded-[16px]"
            : "bg-gray-200 dark:bg-gray-700",
          "hover:bg-primary/20"
        )}
      >
        {/* Solid heart icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="h-6 w-6"
        >
          <path
            d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 
                   4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 
                   14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 
                   6.86-8.55 11.54L12 21.35z"
          />
        </svg>
      </button>
    </ActionTooltip>
  );
};
