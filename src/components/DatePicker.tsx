import { ComponentPropsWithoutRef } from "react";

interface Props extends ComponentPropsWithoutRef<"div"> {
  startDate: string;
  endDate: string;
  onStartDateChange: (date: string) => void;
  onEndDateChange: (date: string) => void;
}

const DatePicker = ({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
}: Props) => {
  return (
    <div className="flex w-32 gap-8 px-2 py-2">
      <label>
        Start Date:
        <input
          type="date"
          value={startDate}
          onChange={(e) => onStartDateChange(e.target.value)}
        />
      </label>
      <label>
        End Date:
        <input
          type="date"
          value={endDate}
          onChange={(e) => onEndDateChange(e.target.value)}
        />
      </label>
    </div>
  );
};

export { DatePicker };
