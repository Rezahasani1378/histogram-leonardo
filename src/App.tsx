import { useEffect } from "react";
import ReactEChartsCore from "echarts-for-react/lib/core";
import * as echarts from "echarts";
import * as ecStat from "echarts-stat";
import type { ExternalDataTransform } from "@manufac/echarts-simple-transform";
import { Button } from "./components/Button";
import { Input } from "./components/input";
import { Selector } from "./components/Selector";

declare module "echarts-stat" {
  let transform: {
    regression: ExternalDataTransform;
    histogram: ExternalDataTransform;
    clustering: ExternalDataTransform;
  };
}

function App() {
  echarts.registerTransform(ecStat.transform.histogram);

  const chartData = {
    title: "Village",
    categories: [
      { name: "Village 1", data: [43.3, 85.8, 93.7, 12, 34] },
      { name: "Village 2", data: [83.1, 73.4, 55.1, 32, 54] },
      { name: "Village 3", data: [86.4, 65.2, 82.5, 32, 21] },
      { name: "Village 4", data: [72.4, 53.9, 39.1, 21, 43] },
      { name: "Village 5", data: [72.4, 53.9, 39.1, 21, 43] },
    ],
  };

  const transformChartData = () => {
    const chartNumbers = chartData.categories.map((category) => category.data);
    for (let i = 0; i < chartNumbers.length; i++) {
      chartNumbers[i].unshift((i + 1) * 10);
    }
    return chartNumbers;
  };

  useEffect(() => {
    // fetch("http://localhost:3001/villages", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({ name: "village 10", data: [10, 20, 30] }),
    // })
    //   .then((res) => res.text())
    //   .then(console.log);
  }, []);

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

                  ...transformChartData(),
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
            <Selector />
            <div className="flex flex-wrap">
              {chartData.categories.map((category, index) => (
                <Input
                  title={category.name}
                  placeholder={category.name}
                  key={index}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      <Button className="mt-8">Change Data</Button>
    </div>
  );
}

export default App;
