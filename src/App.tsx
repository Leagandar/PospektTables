import { DeformationChart, Table, TermoChainChart } from "./components";
import { DeformationResponse, TermoDataResponse } from "./types";
import { useEffect, useState } from "react";
import { fetchMeasurements } from "./API";
import { deformationColumns, termoColumns } from "./data";

export default function App() {
  const [isShownCharts, setIsShownCharts] = useState(false);
  const [termoData, setTermoData] = useState<TermoDataResponse | null>(null);
  const [deformationData, setDeformationData] =
    useState<DeformationResponse | null>(null);

  useEffect(() => {
    const getData = async () => {
      const [termoData, deformationData] = await Promise.all([
        fetchMeasurements("termo_response"),
        fetchMeasurements("deformation_response"),
      ]);
      setTermoData(termoData as TermoDataResponse);
      setDeformationData(deformationData as DeformationResponse);
    };

    getData();
  }, []);

  return (
    <div className="p-12">
      <button
        className="cursor-pointer rounded bg-slate-200  px-4 py-2 text-sm font-medium outline outline-2 outline-blue-400 hover:opacity-65"
        onClick={() => setIsShownCharts((prev) => !prev)}
      >
        Show charts
      </button>
      <Table
        title="Термометрическая скважина: ts3"
        columns={termoColumns}
        data={termoData}
        className="flex max-h-screen flex-col pb-12"
        pinMultiple
      />
      <Table
        title="Деформационная марка: dm5"
        columns={deformationColumns}
        data={deformationData}
        className="flex max-h-screen flex-col pb-12"
      />
      {isShownCharts && (
        <>
          <DeformationChart deformationData={deformationData} />
          <TermoChainChart termoData={termoData} />
        </>
      )}
    </div>
  );
}
