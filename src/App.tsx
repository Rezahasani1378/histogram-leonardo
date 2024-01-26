import { ChangeEvent, useState } from "react";
import ReactEChartsCore from "echarts-for-react/lib/core";
import * as echarts from "echarts";
import * as ecStat from "echarts-stat";
import type { ExternalDataTransform } from "@manufac/echarts-simple-transform";
import { Button } from "./components/Button";
import { Input } from "./components/input";
import { Selector } from "./components/Selector";
import { produce } from "immer";

declare module "echarts-stat" {
  let transform: {
    regression: ExternalDataTransform;
    histogram: ExternalDataTransform;
    clustering: ExternalDataTransform;
  };
}

function App() {
  echarts.registerTransform(ecStat.transform.histogram);

  const [chartData, setChartData] = useState({
    title: "Village",
    categories: [
      { name: "Village 1", data: [43.3, 85.8, 93.7, 12, 34] },
      { name: "Village 2", data: [83.1, 73.4, 55.1, 32, 54] },
      { name: "Village 3", data: [86.4, 65.2, 82.5, 32, 21] },
      { name: "Village 4", data: [72.4, 53.9, 39.1, 21, 43] },
      { name: "Village 5", data: [72.4, 53.9, 39.1, 21, 43] },
    ],
  });

  const [selectedVillageIndex, setSelectedVillageIndex] = useState(0);

  const transformChartData = (): Array<Array<number>> => {
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
  }; // move to util

  const transformedData = transformChartData();

  const handleSelectorChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedVillageIndex(e.target.selectedIndex);
  };

  const addInput = () => {
    const selectedCategoryData = chartData.categories[selectedVillageIndex];
    if (selectedCategoryData.data.length < 10)
      selectedCategoryData.data.push(0);

    setChartData({
      ...chartData,
      categories: [...chartData.categories, selectedCategoryData],
    });
  };

  const handleInput = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    setChartData((chartData) => {
      return produce(chartData, (chartData) => {
        chartData.categories[selectedVillageIndex].data[index] = e.target
          .value as unknown as number;
      });
    });
  };

  return (
    <div className="flex flex-col h-screen w-screen justify-start lg:justify-center items-center">
      <div className="w-full flex lg:justify-center flex-col lg:flex-row">
        <div className="w-full lg:w-[40%] lg:border-solid lg:border-2 lg:border-gray-50 p-5 lg:rounded-xl bg-white shadow">
          <ReactEChartsCore
            echarts={echarts}
            option={{
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
              color: ["#6f9ca3", "#fec876", "#89B99B", "#7B72FF", "#4A7A81"],
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
            }}
            notMerge={true}
            lazyUpdate={true}
          />
        </div>
        <div className="w-full lg:w-[40%] lg:border-solid lg:border-2 lg:border-gray-50 p-5 lg:rounded-xl bg-white lg:shadow lg:ml-10">
          <div>
            <Selector
              title="Select a Village"
              options={chartData.categories.map(({ name }) => name)}
              selected={selectedVillageIndex}
              handleChange={(e) => handleSelectorChange(e)}
            />
            <div className="flex flex-wrap items-end">
              {chartData.categories[selectedVillageIndex].data.map(
                (data, index) => (
                  <Input
                    title={`${index * 10} - ${(index + 1) * 10}`}
                    value={data}
                    key={index}
                    type="text"
                    onChange={(e) => handleInput(e, index)}
                  />
                ),
              )}
              {chartData.categories[selectedVillageIndex].data.length < 10 && (
                <Button className="my-2 mx-auto" onClick={addInput}>
                  Add Data
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
