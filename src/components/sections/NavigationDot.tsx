import { cn } from "@/lib/design-utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/ui/Tooltip";
import React from "react";

interface Props {
  dot: {
    title: string;
    comment?: string;
    color: string;
    top: number;
    left: number;
  };
}

export function NavigationDot({ dot }: Props) {
  const [open, setOpen] = React.useState<boolean>(false);
  return (
    <TooltipProvider>
      <Tooltip delayDuration={0} onOpenChange={setOpen} open={open}>
        <TooltipTrigger
          asChild
          onClick={(event) => {
            event.preventDefault();
            setOpen(true);
          }}
        >
          <div
            style={{
              top: `${dot.top}%`,
              left: `${dot.left}%`,
              backgroundImage: `radial-gradient(${dot.color}aa, #ffffff00)`,
            }}
            className={cn(
              "absolute flex items-center justify-center cursor-pointer -translate-x-1/2 -translate-y-1/2 group rounded-full w-3 h-3 md:w-5 md:h-5"
            )}
          >
            <div
              className='h-1 w-1 md:h-2 md:w-2 rounded-full group-hover:h-2 md:group-hover:h-3 group-hover:w-2 md:group-hover:w-3 transition-all'
              style={{ backgroundColor: dot.color }}
            ></div>
          </div>
        </TooltipTrigger>
        <TooltipContent className='max-w-sm'>
          <p className='line-clamp-1 font-semibold'>{dot.title}</p>
          <p className='text-xs'>{dot.comment}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
