import {
  ComponentPropsWithoutRef,
  memo,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
  getPaginationRowModel,
  type ColumnDef,
  flexRender,
} from "@tanstack/react-table";
import type { BaseResponse, PaginationInfo } from "../types";
import { isDateInRange, isSortDirection } from "../utils";
import { DatePicker } from "./DatePicker";
import { Pagination } from "./Pagination";
import { SortingIndicator } from "./SortingIndicator";

interface Props<T> extends ComponentPropsWithoutRef<"div"> {
  title: string;
  columns: ColumnDef<any, any>[];
  data: ({ data: T[] } & BaseResponse & PaginationInfo) | null;
  pinMultiple?: boolean;
}

const ROW_HEIGHT = 44;

const Table = memo(
  <T extends { time: string }>({
    title,
    columns,
    data,
    className,
    pinMultiple = false,
  }: Props<T>) => {
    const [startDate, setStartDate] = useState<string>("");
    const [endDate, setEndDate] = useState<string>("");
    const leftMargin = useRef<number>(0);

    const filteredData = useMemo(
      () =>
        data?.data.filter((item) =>
          isDateInRange(new Date(item.time), startDate, endDate),
        ) ?? [],
      [data, startDate, endDate],
    );

    const table = useReactTable({
      data: filteredData,
      columns,
      initialState: { pagination: { pageSize: 20 } },
      getCoreRowModel: getCoreRowModel(),
      getSortedRowModel: getSortedRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
    });

    const isPinSecond = (index: number) => index === 1 && pinMultiple;

    const headerGroups = table
      .getHeaderGroups()
      .map((headerGroup, groupIndex) => (
        <tr
          key={headerGroup.id}
          className={`sticky z-10 h-[44px] bg-white text-gray-800 `}
          style={{ top: `${groupIndex * ROW_HEIGHT}px` }}
        >
          {headerGroup.headers.map((header, headerIndex) => {
            if (isPinSecond(headerIndex)) {
              leftMargin.current = header.getStart("left");
            }

            const isSorted = header.column.getIsSorted();
            let isSortedDesc = null;
            if (isSortDirection(isSorted)) {
              isSortedDesc = isSorted === "desc";
            }

            return (
              <th
                key={header.id}
                className={`border p-0 text-center font-medium  first:sticky first:left-0 first:bg-white ${isPinSecond(headerIndex) ? "sticky bg-white" : ""}`}
                style={{
                  left: `${isPinSecond(headerIndex) ? leftMargin.current : 0}px`,
                }}
                colSpan={
                  header.column.columnDef.meta?.colSpan ?? header.colSpan
                }
              >
                {!header.isPlaceholder && (
                  <div
                    className={
                      header.column.getCanSort()
                        ? "min-w-30 cursor-pointer select-none whitespace-nowrap"
                        : ""
                    }
                    style={{ width: `${header.getSize()}px` }}
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
                    <SortingIndicator
                      isSorted={isSorted}
                      isSortedDesc={isSortedDesc}
                    />
                  </div>
                )}
              </th>
            );
          })}
        </tr>
      ));

    const rows = table.getRowModel().rows.map((row) => (
      <tr key={row.id}>
        {row.getVisibleCells().map((cell, index) => (
          <td
            key={cell.id}
            className={`border px-2 py-2 text-center first:sticky first:left-0 first:bg-white ${isPinSecond(index) ? "sticky bg-white" : ""}`}
            style={{
              left: `${isPinSecond(index) ? leftMargin.current : 0}px`,
            }}
          >
            {flexRender(cell.column.columnDef.cell, cell.getContext())}
          </td>
        ))}
      </tr>
    ));

    const { pageSize, pageIndex } = table.getState().pagination;

    return (
      <div className={className}>
        <DatePicker
          startDate={startDate}
          endDate={endDate}
          onStartDateChange={setStartDate}
          onEndDateChange={setEndDate}
        />
        <h3 className="mb-2">{title}</h3>
        <div className="overflow-auto">
          <table
            className="relative border-separate border-spacing-0"
            style={{
              width: table.getTotalSize(),
            }}
          >
            <thead>{headerGroups}</thead>
            <tbody>{rows}</tbody>
          </table>
        </div>
        <Pagination
          pageSize={pageSize}
          pageIndex={pageIndex}
          pageCount={table.getPageCount()}
          onPageSizeChange={(size) => table.setPageSize(size)}
          onPageIndexChange={(index) => table.setPageIndex(index)}
          canPreviousPage={table.getCanPreviousPage()}
          canNextPage={table.getCanNextPage()}
          pageSizeOptions={[2, 5, 10, 20]}
        />
      </div>
    );
  },
);

export { Table };
