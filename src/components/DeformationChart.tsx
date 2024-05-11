import { memo, useEffect, useState } from "react";
import Plot from "react-plotly.js";
import { Layout } from "plotly.js";
import { fetchMeasurements } from "../API";
import { DeformationResponse, DeformationTrendResponse } from "../types";

interface Props {
  deformationData: DeformationResponse | null;
}

const DeformationChart = memo(({ deformationData }: Props) => {
  const [trendData, setTrendData] = useState<DeformationTrendResponse | null>(
    null,
  );

  useEffect(() => {
    const fetchData = async () => {
      const trend = await fetchMeasurements("deformation_trend_response");
      setTrendData(trend as DeformationTrendResponse);
    };

    fetchData();
  }, []);

  if (!deformationData || !trendData) {
    return <div>Loading...</div>;
  }

  const maxDeltas: number[] = [];
  const minDeltas: number[] = [];
  const deltas: number[] = [];
  const deformationDates: string[] = [];

  deformationData.data.forEach(({ time, criticalDelta, data }) => {
    deformationDates.push(time);
    deltas.push(data.delta ?? 0);
    maxDeltas.push(criticalDelta);
    minDeltas.push(-criticalDelta);
  });

  const { points, endDate } = trendData.data;
  const dates = Object.keys(points);
  const trendValues = Object.values(points);

  const deformationTraces = [
    {
      x: deformationDates,
      y: deltas,
      mode: "lines+markers",
      name: "Δ",
    },
    {
      x: dates,
      y: trendValues,
      mode: "lines+markers",
      name: "Тренд Δ",
      line: { color: "red" },
    },
    {
      x: [endDate, endDate],
      y: [Math.min(...trendValues), Math.max(...trendValues)],
      mode: "lines",
      name: "Конец эксплуатации",
      line: { color: "black", dash: "solid" },
    },
    {
      x: deformationDates,
      y: maxDeltas,
      mode: "lines",
      name: "Макс. Δ",
      line: { color: "orange", dash: "dash" },
    },
    {
      x: deformationDates,
      y: minDeltas,
      mode: "lines",
      name: "Мин. Δ",
      line: { color: "green", dash: "dash" },
    },
  ];

  const deformationLayout: Partial<Layout> = {
    title: "Смещения по деформационной марке: dm5",
    xaxis: { title: "Дата" },
    yaxis: { title: "Смещение (Δ), м" },
  };

  return <Plot data={deformationTraces} layout={deformationLayout} />;
});

export { DeformationChart };
