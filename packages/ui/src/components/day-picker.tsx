"use client";
import { dayjs } from "@vms/lib";
import classNames from "classnames";
import { Dayjs } from "dayjs";
import React, { useMemo, useState } from "react";
import { PiCaretLeftBold, PiCaretRightBold } from "react-icons/pi";
import { Button } from "./button";

type WeekayFormat = "short" | "long" | "narrow";

export enum HourFormat {
  TWELVE_HOUR = 12,
  TWENTY_FOUR = 24,
}

export const getHours = (format: HourFormat = HourFormat.TWELVE_HOUR) => {
  const hours = [];

  if (format === HourFormat.TWENTY_FOUR) {
    for (let i = 0; i < HourFormat.TWENTY_FOUR; i++) {
      hours.push(i.toString().padStart(2, "0"));
    }
  } else if (format === HourFormat.TWELVE_HOUR) {
    for (let i = 1; i <= HourFormat.TWELVE_HOUR; i++) {
      const hour = i % 12 === 0 ? 12 : i % 12;
      const period = i < 12 ? "AM" : "PM";
      //  hours.push(`${hour}:00 ${period}`);
      hours.push(hour.toString().padStart(2, "0"));
    }

    //  hours.push("12");
  }

  return hours;
};

export const getMinutes = (interval = 1) => {
  const minutes = [];
  for (let i = 0; i < 60; i += interval) {
    minutes.push(i.toString().padStart(2, "0")); // Pads single-digit minutes with a leading zero
  }
  return minutes;
};

const weekdayName = (format: WeekayFormat = "short") => {
  return Array(7)
    .fill(null)
    .map((_, i) => {
      const date = new Date(1970, 0, i + 4);
      return new Intl.DateTimeFormat("en", { weekday: format }).format(date);
    });
};

export const yyyymm = (date: Date | Dayjs) =>
  date instanceof Date ? dayjs(date).format("YYYY-MM") : date.format("YYYY-MM");

export const daysInMonth = (date: Dayjs | Date) => {
  const [year, month] =
    date instanceof Date
      ? [date.getFullYear(), date.getMonth()]
      : [date.year(), date.month()];

  return new Date(year, month + 1, 0).getDate();
};

type DayPickerProps = {
  onMonthChange?: (date: Dayjs) => void;
  browsingDate?: Dayjs;
  onSelectedDate: (date: Dayjs) => void;
};

export const DayPicker = React.memo(
  ({ onMonthChange, onSelectedDate, ...passthroughProps }: DayPickerProps) => {
    const [showPast, setShowPast] = useState(true);

    // const [browsingDate, setBrowsingDate] = useState(dayjs().startOf("month"));

    const browsingDate = useMemo(
      () => passthroughProps.browsingDate || dayjs().startOf("month"),
      [passthroughProps.browsingDate]
    );

    // reset to the start of the month

    const currentMonth = new Intl.DateTimeFormat("en", {
      month: "long",
    }).format(new Date(browsingDate.year(), browsingDate.month()));

    const changeMonth = (newMonth: number) => {
      //  setBrowsingDate((prev) => prev.add(num, "month"));
      // browsingDate.add(num, "month");

      if (onMonthChange) {
        onMonthChange(browsingDate.add(newMonth, "month"));
      }
    };

    const weekdayOfFirst = browsingDate.date(1).day(); // Day of the week for 1st day (0=Sunday, 6=Saturday)

    const noDaysInPrev = daysInMonth(browsingDate.subtract(1, "month"));

    const days: (Dayjs | null)[] = [];

    if (showPast) {
      // Add the past days from the previous month
      for (let i = weekdayOfFirst - 1; i >= 0; i--) {
        const date = browsingDate
          .subtract(1, "month")
          .set("date", noDaysInPrev - i);
        days.push(date);
      }
    } else {
      // Add placeholders for the empty days in the first week
      for (let i = 0; i < weekdayOfFirst; i++) {
        days.push(null); // Placeholder for empty day
      }
    }

    for (
      let day = 1, dayCount = daysInMonth(browsingDate);
      day <= dayCount;
      day++
    ) {
      const date = browsingDate.set("date", day);
      days.push(date);
    }

    const daysToRender = days.map((item) => {
      if (item === null) {
        return {
          day: null,
          disabled: true,
        };
      }

      return {
        day: item,
        disabled: item.isBefore(browsingDate),
      };
    });

    const getClassString = (disabled: boolean, day: Dayjs) => {
      let classStr = "";

      if (day.isToday()) {
        classStr += "bg-brand-default text-default";
      }
    };

    return (
      <div className="bg-[#EDEDED] w-[213px] p-[12px]">
        <div className="flex items-center mb-8">
          <Button
            variant="icon"
            onClick={() => changeMonth(-1)}
            className={classNames(
              "bg-transparent border-none hover:bg-transparent",
              !browsingDate.isAfter(dayjs()) &&
                "disabled:text-[red] cursor-not-allowed"
            )}
            disabled={!browsingDate.isAfter(dayjs())}
            prefixIcon={
              <PiCaretLeftBold className="text-black h-[12px] w-[12px]" />
            }
          />

          <div className="flex items-center gap-3 shrink-0  flex-1">
            <span className=" font-bold font-lato p-[6px] text-[12px] bg-white flex-1">
              {currentMonth}
            </span>
            <span className=" font-bold font-lato text-[12px] bg-white p-[6px]">
              {browsingDate.format("YYYY")}
            </span>
          </div>

          <Button
            variant="icon"
            onClick={() => changeMonth(+1)}
            className="bg-transparent border-none hover:bg-transparent md:border-0"
            prefixIcon={
              <PiCaretRightBold className="text-black h-[12px] w-[12px]" />
            }
          />
        </div>
        <div className="grid grid-cols-7 border-b border-t md:border-0 text-center">
          {weekdayName().map((item, idx) => (
            <div key={item + idx}>{item}</div>
          ))}
        </div>

        <div className="grid grid-cols-7 text-center relative gap-2 ">
          {daysToRender.map(({ day, disabled }, idx) => {
            if (day === null) {
              return <div key={idx + "empty"} />;
            }
            if (day !== null) {
              return (
                <Day
                  onSelectedDate={onSelectedDate}
                  day={day}
                  disabled={disabled}
                  key={day + "day"}
                />
                // <div
                //   className="justify-center relative w-full flex "
                //   key={day + "day"}
                //   onClick={() => onSelectedDate?.(day)}
                // >
                //   <button
                //     type="button"
                //     disabled={day.isBefore(dayjs(), "day")}
                //     key={"day" + day.format("DD")}
                //     className={classNames(
                //       !disabled
                //         ? " hover:border hover:border-[#9C9C9C]"
                //         : "text-muted",
                //       !disabled
                //         ? day.isToday()
                //           ? "bg-brand-default text-default"
                //           : "bg-white"
                //         : "text-[#9C9C9C]",

                //       "w-[27px] cursor-pointer font-lato font-medium text-[#1F1F1F] text-[9px]  h-[22px] flex  justify-center items-center  border-2 border-transparent text-center   rounded-lg px-[10px] py-[6.5px]",

                //       "disabled:bg-[#d9d9d9] disabled:border-none focus:border-[#9C9C9C] "
                //     )}
                //   >
                //     {day.format("DD")}
                //   </button>
                // </div>
              );
            }
          })}
        </div>
      </div>
    );
  }
);

type DayProps = {
  day: dayjs.Dayjs;
  onSelectedDate: (date: Dayjs) => void;
  disabled: boolean;
};
export const Day = React.memo(({ day, onSelectedDate, disabled }: DayProps) => {
  const [active, setActive] = useState(false);

  return (
    <div
      className="justify-center relative w-full flex "
      key={day + "day"}
      onClick={() => {
        onSelectedDate?.(day);
        setActive(true);
      }}
    >
      <button
        type="button"
        disabled={day.isBefore(dayjs(), "day")}
        key={"day" + day.format("DD")}
        className={classNames(
          !disabled ? " hover:border hover:border-[#9C9C9C]" : "text-muted",
          !disabled
            ? day.isToday()
              ? "bg-brand-default text-default"
              : "bg-white"
            : "text-[#9C9C9C]",

          "w-[27px] cursor-pointer font-lato font-medium text-[#1F1F1F] text-[9px]  h-[22px] flex  justify-center items-center  border-2 border-transparent text-center   rounded-lg px-[10px] py-[6.5px]",

          "disabled:bg-[#d9d9d9] disabled:border-none focus:border-[#9C9C9C] active:border-[#9C9C9C] ",
          active && "focus:border-[#9C9C9C] active:border-[#9C9C9C] "
        )}
      >
        {day.format("DD")}
      </button>
    </div>
  );
});
