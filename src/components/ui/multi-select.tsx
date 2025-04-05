
import * as React from "react";
import { 
  Command as CommandPrimitive, 
  CommandInput, 
  CommandList, 
  CommandEmpty, 
  CommandGroup,
  CommandItem
} from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { Check, X, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export type Option = {
  value: string;
  label: string;
};

interface MultiSelectProps {
  options?: readonly Option[];
  value?: string[];
  onValueChange?: (value: string[]) => void;
  placeholder?: string;
  className?: string;
  children?: React.ReactNode;
}

export function MultiSelect({
  options,
  placeholder,
  value,
  onValueChange,
  className,
  children,
  ...props
}: MultiSelectProps) {
  const [open, setOpen] = React.useState(false);

  const handleUnselect = (item: string) => {
    if (!onValueChange) return;
    onValueChange(value?.filter((i) => i !== item) || []);
  };

  return (
    <Popover open={open} onOpenChange={setOpen} {...props}>
      <PopoverTrigger asChild>
        {children || (
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className={cn(
              "min-h-10 w-full justify-between",
              value?.length ? "h-auto" : "h-10",
              className
            )}
          >
            <div className="flex flex-wrap gap-1">
              {value?.length ? (
                value.map((item) => {
                  const selectedOption = options?.find((option) => option.value === item);
                  return (
                    <Badge
                      key={item}
                      variant="secondary"
                      className="mr-1 mb-1"
                    >
                      {selectedOption?.label || item}
                      <button
                        className="ml-1 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            handleUnselect(item);
                          }
                        }}
                        onMouseDown={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                        }}
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleUnselect(item);
                        }}
                      >
                        <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                      </button>
                    </Badge>
                  );
                })
              ) : (
                <span className="text-sm text-muted-foreground">{placeholder}</span>
              )}
            </div>
            <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
          </Button>
        )}
      </PopoverTrigger>
      <PopoverContent className="w-full p-0" align="start">
        <CommandPrimitive>
          <CommandInput placeholder="Rechercher..." />
          <CommandList>
            <CommandEmpty>Aucun résultat trouvé.</CommandEmpty>
            <CommandGroup className="max-h-64 overflow-auto">
              {options?.map((option) => {
                const isSelected = value?.includes(option.value);
                return (
                  <CommandItem
                    key={option.value}
                    onSelect={() => {
                      if (isSelected) {
                        onValueChange?.(
                          value.filter((v) => v !== option.value)
                        );
                      } else {
                        onValueChange?.([...(value || []), option.value]);
                      }
                      setOpen(true);
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        isSelected ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {option.label}
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </CommandList>
        </CommandPrimitive>
      </PopoverContent>
    </Popover>
  );
}

export const MultiSelectTrigger = React.forwardRef<
  React.ElementRef<typeof PopoverTrigger>,
  React.ComponentPropsWithoutRef<typeof PopoverTrigger>
>(({ className, ...props }, ref) => (
  <PopoverTrigger
    ref={ref}
    className={cn(
      "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
      className
    )}
    {...props}
  />
));
MultiSelectTrigger.displayName = "MultiSelectTrigger";

export const MultiSelectValue = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement> & { placeholder?: string }
>(({ className, placeholder, ...props }, ref) => (
  <span
    ref={ref}
    className={cn("flex gap-1 flex-wrap", className)}
    {...props}
  >
    {props.children || (
      <span className="text-sm text-muted-foreground">{placeholder}</span>
    )}
  </span>
));
MultiSelectValue.displayName = "MultiSelectValue";

export const MultiSelectContent = PopoverContent;
export const MultiSelectItem = CommandItem;
