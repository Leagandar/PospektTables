import { createColumnHelper } from "@tanstack/react-table";
import type { TermoData } from "../types";
import { generateColumns, getTableDate } from "../utils";

const termoColumnHelper = createColumnHelper<TermoData>();
const depthColumns = generateColumns<TermoData>(termoColumnHelper, {
    start: 0.5,
    end: 28.5,
    step: 1,
    options: { size: 60, enableSorting: false },
});

const termoColumns = [
    termoColumnHelper.accessor("time", {
        cell: (info) => getTableDate(new Date(info.getValue())),
        header: () => "Дата и время измерения",
        sortingFn: (a, b) =>
            new Date(a.getValue("time")).getTime() -
            new Date(b.getValue("time")).getTime(),
        size: 250,
    }),
    termoColumnHelper.accessor("averageTemperature", {
        cell: (info) => info.getValue().toFixed(2),
        header: () => "T",
        enableSorting: false,
        size: 90,
    }),
    termoColumnHelper.group({
        header: () => "Глубина, м",
        id: "depth",
        meta: { colSpan: depthColumns.length },
        columns: depthColumns,
    }),
];

export { termoColumns }