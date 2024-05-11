import { type SortDirection } from "@tanstack/react-table";

interface Props {
  isSorted: boolean | SortDirection;
  isSortedDesc: boolean | null;
}

const SortingIndicator = ({ isSorted, isSortedDesc }: Props) => {
  return (
    <>{isSorted && <span className="pl-2">{isSortedDesc ? "↓" : "↑"}</span>}</>
  );
};

export { SortingIndicator };
