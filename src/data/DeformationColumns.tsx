import { createColumnHelper } from "@tanstack/react-table";
import { getTableDate } from "../utils";
import { Deformation } from "../types";

const deformationColumnHelper = createColumnHelper<Deformation>();
const deformationColumns = [
  deformationColumnHelper.accessor("time", {
    cell: (info) => getTableDate(new Date(info.getValue())),
    header: () => "Дата и время измерения",
    sortingFn: (a, b) =>
      new Date(a.getValue("time")).getTime() -
      new Date(b.getValue("time")).getTime(),
    size: 250,
  }),
  deformationColumnHelper.accessor("data.value", {
    aggregatedCell: "mark",
    cell: (info) => info.getValue().toFixed(4),
    header: () => "Отметка, м",
    enableSorting: false,
    size: 300,
  }),
  deformationColumnHelper.accessor("data.delta", {
    aggregatedCell: "mark",
    cell: (info) => info.getValue()?.toFixed(4),
    header: () => <span>&Delta;, м </span>,
    enableSorting: false,
    size: 1000,
  }),
];

export { deformationColumns };
