import type { ChartSource } from "../../../types/ChartSource";
import { chartColors } from "../../../constants/chart";

const transformOptions = (
  transformedData: ChartSource,
  chartData: ChartData,
) => ({
  legend: {
    top: "bottom",
    icon: "circle",
    itemGap: 30,
    itemWidth: 8,
    textStyle: {
      color: "#9F9F9F",
    },
  },
  tooltip: {},
  title: {
    text: "International Wealth Index (IWI)",
    textStyle: {
      color: "black",
      fontWeight: "normal",
    },
    padding: [8, 20],
  },
  color: chartColors,
  dataset: {
    source: [
      [
        chartData.title,
        ...chartData.categories.map((category) => category.name),
      ],
      ...transformedData,
    ],
  },
  xAxis: {
    type: "category",
    name: "IWI Score (0-100)",
    nameLocation: "middle",
    nameTextStyle: {
      padding: [13, 0],
      fontSize: 13,
      fontWeight: "bold",
      color: "#9F9F9F",
    },
  },
  yAxis: {
    interval: 25,
    axisLabel: {
      formatter: "{value}%",
    },
  },
  series: [
    { type: "bar" },
    { type: "bar" },
    { type: "bar" },
    { type: "bar" },
    { type: "bar" },
  ],
});

export { transformOptions };
