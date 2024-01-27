import { ChangeEvent, useState } from "react";
import ReactEChartsCore from "echarts-for-react/lib/core";
import * as echarts from "echarts";
import * as ecStat from "echarts-stat";
import type { ExternalDataTransform } from "@manufac/echarts-simple-transform";
import { Button } from "./components/Button";
import { Input } from "./components/input";
import { Selector } from "./components/Selector";
import { produce } from "immer";
import { transformData } from "./utils/transformers/chart/transformData";
import { transformOptions } from "./utils/transformers/chart/transformOptions";
import { chartColors, initialChartData } from "./constants/chart";

declare module "echarts-stat" {
  let transform: {
    regression: ExternalDataTransform;
    histogram: ExternalDataTransform;
    clustering: ExternalDataTransform;
  };
}

function App() {
  echarts.registerTransform(ecStat.transform.histogram);

  const [chartData, setChartData] = useState(initialChartData);

  const [selectedVillageIndex, setSelectedVillageIndex] = useState(0);

  const transformedData = transformData(chartData);

  const handleSelectorChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedVillageIndex(e.target.selectedIndex);
  };

  const addInput = () => {
    setChartData((chartData) => {
      return produce(chartData, (chartData) => {
        const selectedCategoryData = chartData.categories[selectedVillageIndex];
        if (selectedCategoryData.data.length < 10)
          selectedCategoryData.data[selectedCategoryData.data.length] = 0;
      });
    });
  };

  const handleInput = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    let prevVal = "";

    if (!(e.target.checkValidity() || e.target.value === "")) {
      e.target.value = prevVal;
    }

    setChartData((chartData) => {
      return produce(chartData, (chartData) => {
        chartData.categories[selectedVillageIndex].data[index] = e.target
          .value as unknown as number;
      });
    });
  };

  const calculateAverageData = () => {
    let res = [];
    const { categories } = chartData;

    for (let i = 0; i < categories.length; i++) {
      const categoryData = categories[i].data;
      const average =
        categoryData.reduce((a, b) => Number(a) + Number(b)) /
        categoryData.length;
      res.push({
        color: chartColors[i],
        value: average.toFixed(2),
      });
    }

    return res;
  };

  const averageData = calculateAverageData();

  return (
    <div className="flex flex-col h-screen w-screen justify-start xl:justify-center items-center">
      <div className="w-full flex xl:justify-center flex-col xl:flex-row">
        <div className="flex flex-col xl:flex-row w-full xl:w-[40%] xl:border-solid xl:border-2 xl:border-gray-50 p-5 xl:rounded-xl bg-white shadow">
          <div className="w-full">
            <ReactEChartsCore
              echarts={echarts}
              option={transformOptions(transformedData, chartData)}
              notMerge={true}
              lazyUpdate={true}
            />
          </div>
          <div className="flex flex-row xl:flex-col mt-12 ml-[-20px] items-center">
            <div className="flex flex-col mb-2 mx-2 xl:mx-0">
              <span className="font-bold text-sm">Avg.</span>
              <span className="text-uppermostGray font-bold text-sm">Unit</span>
            </div>
            <div className="flex flex-row xl:flex-col justify-between xl:justify-normal w-full xl:w-auto cursor-default mr-2">
              {averageData.map(({ color, value }) => (
                <span
                  className="text-xl mb-1.5 font-bold"
                  style={{ color }}
                  key={color}
                >
                  {value}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="w-full xl:w-[40%] xl:border-solid xl:border-2 xl:border-gray-50 p-5 xl:rounded-xl bg-white xl:shadow xl:ml-10">
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
                    pattern="[0-9]*\.?[0-9]*"
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
