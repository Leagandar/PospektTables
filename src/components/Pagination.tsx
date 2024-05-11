import { type ComponentPropsWithoutRef } from "react";

interface Props extends ComponentPropsWithoutRef<"div"> {
  pageSize: number;
  pageIndex: number;
  pageCount: number;
  onPageSizeChange: (size: number) => void;
  onPageIndexChange: (index: number) => void;
  canPreviousPage: boolean;
  canNextPage: boolean;
  pageSizeOptions: number[];
}

const Pagination = ({
  pageSize,
  pageIndex,
  pageCount,
  onPageSizeChange,
  onPageIndexChange,
  canPreviousPage,
  canNextPage,
  pageSizeOptions,
}: Props) => {
  const handlePageSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onPageSizeChange(Number(e.target.value));
  };

  const handlePageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const page = e.target.value ? Number(e.target.value) - 1 : 0;
    onPageIndexChange(page);
  };

  const goToFirstPage = () => {
    onPageIndexChange(0);
  };

  const goToPreviousPage = () => {
    onPageIndexChange(pageIndex - 1);
  };

  const goToNextPage = () => {
    onPageIndexChange(pageIndex + 1);
  };

  const goToLastPage = () => {
    onPageIndexChange(pageCount - 1);
  };

  return (
    <div className="mt-8 flex w-full flex-col items-center gap-2 text-xs sm:flex-row">
      <div className="mb-2 sm:mb-0 sm:mr-auto">
        <span className="mr-2">Items per row</span>
        <select
          className="w-16 rounded border border-gray-200 p-1"
          value={pageSize}
          onChange={handlePageSizeChange}
        >
          {pageSizeOptions.map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
      </div>
      <div className="flex gap-2">
        <button
          className={`${
            !canPreviousPage
              ? "bg-gray-100"
              : "bg-gray-100 hover:cursor-pointer hover:bg-gray-200"
          } rounded p-1`}
          onClick={goToFirstPage}
          disabled={!canPreviousPage}
        >
          <span className="h-5 w-5">{"<<"}</span>
        </button>
        <button
          className={`${
            !canPreviousPage
              ? "bg-gray-100"
              : "bg-gray-100 hover:cursor-pointer hover:bg-gray-200"
          } rounded p-1`}
          onClick={goToPreviousPage}
          disabled={!canPreviousPage}
        >
          <span className="h-5 w-5">{"<"}</span>
        </button>
        <span className="flex items-center gap-1">
          <input
            min={1}
            max={pageCount}
            type="number"
            value={pageIndex + 1}
            onChange={handlePageChange}
            className="w-10 rounded border p-1"
          />
          из {pageCount}
        </span>
        <button
          className={`${
            !canNextPage
              ? "bg-gray-100"
              : "bg-gray-100 hover:cursor-pointer hover:bg-gray-200"
          } rounded p-1`}
          onClick={goToNextPage}
          disabled={!canNextPage}
        >
          <span className="h-5 w-5">{">"}</span>
        </button>
        <button
          className={`${
            !canNextPage
              ? "bg-gray-100"
              : "bg-gray-100 hover:cursor-pointer hover:bg-gray-200"
          } rounded p-1`}
          onClick={goToLastPage}
          disabled={!canNextPage}
        >
          <span className="h-5 w-5">{">>"}</span>
        </button>
      </div>
    </div>
  );
};

export { Pagination };
