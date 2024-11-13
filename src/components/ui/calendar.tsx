import * as React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { DayPicker } from 'react-day-picker';

import { cn } from '../../lib/utils';
import { buttonVariants } from './button';

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn('p-3', className)}
      classNames={{
        months: 'flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0',
        month: 'space-y-4',
        caption: 'flex justify-center pt-1 relative items-center',
        caption_label: 'text-sm font-medium',
        nav: 'space-x-1 flex items-center',
        nav_button: cn(
          buttonVariants({ variant: 'primary' }),
          'h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100'
        ),
        nav_button_previous: 'absolute left-1',
        nav_button_next: 'absolute right-1',
        table: 'w-full border-collapse space-y-1',
        head_row: 'flex',
        head_cell:
          'text-muted-foreground rounded-full w-9 font-normal text-[0.8rem]',
        row: 'flex w-full mt-1',
        cell: 'rounded-full h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-full [&:has([aria-selected].day-outside)]:bg-[#5176ff70]/50 [&:has([aria-selected])]:bg-[#5176ff70] first:[&:has([aria-selected])]:rounded-l-full last:[&:has([aria-selected])]:rounded-r-full focus-within:relative focus-within:z-20',
        day: cn(
          buttonVariants({ variant: 'default' }),
          'h-9 w-9 p-0 font-normal text-body-12 aria-selected:opacity-100 text-black aria-selected:bg-[#5176FF] aria-selected:hover:text-white'
        ),

        day_range_end: 'day-range-end',
        // focus:text-primary-foreground
        day_selected: `text-white bg-[#5176FF] !rounded-full  text-primary-foreground hover:text-primary hover:bg-[#5176FF] !hover:rounded-full focus:bg-[#5176FF] focus:outline-none focus:ring-0 focus:shadow-none  `,

        day_today:
          'border-2 border-[#5176FF]  text-[#5176ff70]-foreground  !rounded-full',
        day_outside:
          'day-outside text-muted-foreground opacity-50 aria-selected:bg-[#5176ff70]/50 aria-selected:text-muted-foreground aria-selected:opacity-30',
        day_disabled: 'text-muted-foreground opacity-50',
        day_range_middle:
          'aria-selected:bg-[#5176ff70] aria-selected:text-[#5176ff70]-foreground',
        day_hidden: 'invisible',
        ...classNames,
      }}
      components={{
        IconLeft: () => <ChevronLeft className="h-4 w-4" />,
        IconRight: () => <ChevronRight className="h-4 w-4" />,
      }}
      {...props}
    />
  );
}
Calendar.displayName = 'Calendar';

export { Calendar };
