// src/components/StopSelector.tsx
import React from 'react';
import { CaretSortIcon, CheckIcon } from '@radix-ui/react-icons'; // Assuming you have @radix-ui/react-icons installed
import { cn } from '@/lib/utils'; // Assuming your shadcn utils path
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import type { StopOption } from '../departure/types'; // Assuming types are defined

interface StopSelectorProps {
  selectedStopId: string;
  allStops: StopOption[];
  onStopChange: (newStopId: string) => void;
}

const StopSelector: React.FC<StopSelectorProps> = ({ selectedStopId, allStops, onStopChange }) => {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(selectedStopId);

  // Update internal value when selectedStopId changes externally
  React.useEffect(() => {
    setValue(selectedStopId);
  }, [selectedStopId]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          role="combobox"
          aria-expanded={open}
          className="w-auto justify-between px-0 text-xl font-bold text-gray-900 dark:text-white hover:bg-transparent hover:text-gray-900 dark:hover:text-white"
        >
          {value
            ? allStops.find((stop) => stop.id === value)?.name
            : 'Haltestelle auswählen...'}
          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0">
        <Command>
          <CommandGroup>
            {allStops.map((stop) => (
              <CommandItem
                value={stop.name} // Use name for searchability
                key={stop.id}
                onSelect={() => {
                  setValue(stop.id);
                  onStopChange(stop.id);
                  setOpen(false);
                }}
              >
                {stop.name}
                <CheckIcon
                  className={cn(
                    'ml-auto h-4 w-4',
                    stop.id === value ? 'opacity-100' : 'opacity-0'
                  )}
                />
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default StopSelector;