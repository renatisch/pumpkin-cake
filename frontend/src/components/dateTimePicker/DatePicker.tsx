import React from "react";
import { Dayjs } from "dayjs";
import { DesktopDateTimePicker } from "@mui/x-date-pickers/DesktopDateTimePicker";
import { DatePickerProps } from "../../pages/jobs/types";

function dateConverter(dateTime: any) {
  var dayjs = require("dayjs");
  var utc = require("dayjs/plugin/utc");
  var timezone = require("dayjs/plugin/timezone");
  var advanced = require("dayjs/plugin/advancedFormat");
  dayjs.extend(timezone);
  dayjs.extend(utc);
  dayjs.extend(advanced);
  return dayjs(dateTime).tz("Europe/Prague");
}

export default function DatePicker({ date, setDate }: DatePickerProps) {
  return (
    <DesktopDateTimePicker
      label={"Run on"}
      value={date}
      format="DD/MM/YYYY hh:mm a"
      minDateTime={dateConverter(Date.now()).subtract(1, "minute")}
      onChange={(newValue) => setDate(newValue)}
    />
  );
}

export { dateConverter };
