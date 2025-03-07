"use client";

import * as React from "react";
import { addDays, differenceInDays, format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";

import { cn } from "@/src/lib/utils";
import { Button } from "@/src/components/ui/button";
import { Calendar } from "@/src/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/src/components/ui/popover";
import { fr } from "date-fns/locale";

interface DatePickerProps extends React.HTMLAttributes<HTMLDivElement> {
  onDateChange: (days: number) => void;
  startDate?: (date: Date) => void;
  endDate?: (date: Date) => void;
}

export function DatePicker({
  className,
  onDateChange,
  startDate,
  endDate,
}: DatePickerProps) {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 7),
  });

  React.useEffect(() => {
    if (date?.from && date?.to) {
      const days = differenceInDays(date.to, date.from) + 1;
      onDateChange(days);
      if (startDate) startDate(date.from);
      if (endDate) endDate(date.to);
    }
  }, [date, onDateChange, startDate, endDate]);

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[300px] justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "d MMMM yyyy", { locale: fr })} -{" "}
                  {format(date.to, "d MMMM yyyy", { locale: fr })}
                </>
              ) : (
                format(date.from, "d MMMM yyyy", { locale: fr })
              )
            ) : (
              <span>Ajouter une date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
            locale={fr}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
