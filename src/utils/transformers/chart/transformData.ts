import { ChartSource } from "../../../types/ChartSource";

export const transformData = (chartData: ChartData): ChartSource => {
  const res = [];

  for (let i = 0; i < chartData.categories[0].data.length; i++) {
    if (res[i] === undefined) {
      res[i] = [(i + 1) * 10];
    }
    for (const category of chartData.categories) {
      res[i].push(category.data[i]);
    }
  }

  return res;
};
