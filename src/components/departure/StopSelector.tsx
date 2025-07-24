import React from 'react';
import { CaretSortIcon, CheckIcon } from '@radix-ui/react-icons';
import { cn } from '@/lib/utils';
import { Button } from '@/ui/Button';
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
import type { StopOption } from '../departure/types';

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
    <div className="flex justify-center md:justify-start w-full">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            role="combobox"
            aria-expanded={open}
            className="w-auto justify-between px-0 text-xl font-bold text-foreground hover:bg-transparent hover:text-primary"
          >
            {value
              ? allStops.find((stop) => stop.id === value)?.name
              : 'Haltestelle auswählen...'}
            <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 text-muted-foreground" />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          // Adjusted width: 80vw on small screens, 250px on medium and larger screens
          className="w-[80vw] md:w-[250px] h-[300px] p-0 bg-popover text-popover-foreground border border-border"
        >
          <Command className="h-full">
            <CommandInput
              placeholder="Haltestelle suchen..."
              className="text-lg text-foreground placeholder:text-muted-foreground focus:ring-ring" // Increased text size to text-lg
            />
            <CommandEmpty className="text-lg text-muted-foreground">Keine Haltestelle gefunden.</CommandEmpty> {/* Increased text size to text-lg */}
            <CommandGroup className="overflow-y-auto">
              {allStops.map((stop) => (
                <CommandItem
                  value={stop.name}
                  key={stop.id}
                  onSelect={() => {
                    setValue(stop.id);
                    onStopChange(stop.id);
                    setOpen(false);
                  }}
                  className="aria-selected:bg-accent aria-selected:text-accent-foreground text-lg text-foreground" // Increased text size to text-lg
                >
                  {stop.name}
                  <CheckIcon
                    className={cn(
                      'ml-auto h-4 w-4 text-primary',
                      stop.id === value ? 'opacity-100' : 'opacity-0'
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default StopSelector;