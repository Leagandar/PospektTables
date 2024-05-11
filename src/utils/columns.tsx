import type { ColumnHelper, SortDirection } from "@tanstack/react-table";

interface Props {
  start: number;
  end: number;
  step: number;
  options: Record<string, unknown>;
}

const generateColumns = <T,>(
  columnHelper: ColumnHelper<T>,
  { start, end, step, options }: Props,
) => {
  const depthColumns = [];
  for (let i = start; i <= end; i += step) {
    const id = i.toString();
    const column = columnHelper.accessor((row: any) => row.data[id], {
      id,
      cell: (info) => <i>{info.getValue()?.value.toFixed(2)}</i>,
      header: () => id,
      ...options,
    });

    depthColumns.push(column);
  }

  return depthColumns;
};

function isSortDirection(value: any): value is SortDirection {
  return value === "asc" || value === "desc";
}

export { generateColumns, isSortDirection };
