import { memo, useEffect, useState } from "react";
import Plot from "react-plotly.js";
import { Layout } from "plotly.js";
import { fetchMeasurements } from "../API";
import { TermoDataResponse, TermoTrendResponse } from "../types";

interface Props {
  termoData: TermoDataResponse | null;
}

const TermoChainChart = memo(({ termoData }: Props) => {
  const [trendData, setTrendData] = useState<TermoTrendResponse | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const trend = await fetchMeasurements("termo_trend_response");
      setTrendData(trend as TermoTrendResponse);
    };

    fetchData();
  }, []);

  if (!termoData || !trendData) {
    return <div>Loading...</div>;
  }

  const temperatureTraces = termoData.data.slice(0, 3).map((item) => ({
    x: Object.values(item.data).map((temp) => temp?.value ?? 0),
    y: Object.keys(item.data).map((depth) => parseFloat(depth)),
    mode: "lines+markers",
    name: new Date(item.time).toLocaleDateString(),
  }));

  const criticalTemperatures: number[] = [];
  const dates: string[] = [];
  const avrTemperatures: number[] = [];
  termoData.data.forEach(
    ({ time, averageTemperature, criticalTemperature }) => {
      dates.push(time);
      avrTemperatures.push(averageTemperature);
      criticalTemperatures.push(criticalTemperature);
    },
  );

  const { points, criticalEndDate } = trendData.data;
  const trendDates = Object.keys(points);
  const trendValues = Object.values(points);

  const termoDepthData = [
    ...temperatureTraces,
    {
      x: criticalTemperatures,
      y: [10, 80],
      mode: "lines+markers",
      name: "Te max, °C",
      line: { color: "red", dash: "dash" },
    },
  ];

  const termoDateData = [
    {
      x: trendDates,
      y: trendValues,
      mode: "lines+markers",
      name: "Тренд Te",
      line: { color: "red" },
    },
    {
      x: dates,
      y: avrTemperatures,
      mode: "lines+markers",
      name: "Te, °C",
      line: { color: "blue" },
    },
    {
      x: dates,
      y: criticalTemperatures,
      mode: "lines+markers",
      name: "Te max, °C",
      line: { color: "orange", dash: "dash" },
    },
    {
      x: [criticalEndDate, criticalEndDate],
      y: [Math.min(...trendValues), Math.max(...trendValues)],
      mode: "lines",
      name: "Конец эксплуатации",
      line: { color: "black", dash: "solid" },
    },
  ];

  const termoDepthLayout: Partial<Layout> = {
    title: "Распределение температур по глубине",
    xaxis: { title: "Температура, °C" },
    yaxis: { title: "Глубина, м" },
  };

  const termoDateLayout: Partial<Layout> = {
    title: "Распределение тренда и Te",
    xaxis: { title: "Дата" },
    yaxis: { title: "Температура, °C" },
  };

  return (
    <div>
      <Plot data={termoDepthData} layout={termoDepthLayout} />;
      <Plot data={termoDateData} layout={termoDateLayout} />;
    </div>
  );
});

export { TermoChainChart };
