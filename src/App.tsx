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
import { initialChartData } from "./constants/initialChartData";

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
    const selectedCategoryData = chartData.categories[selectedVillageIndex];
    if (selectedCategoryData.data.length < 10)
      selectedCategoryData.data.push(0);

    setChartData({
      ...chartData,
      categories: [...chartData.categories, selectedCategoryData],
    });
  };

  const handleInput = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    let prevVal = "";

    if (e.target.checkValidity() || e.target.value === "") {
      prevVal = e.target.value;
    } else {
      e.target.value = prevVal;
    }

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
            option={transformOptions(transformedData, chartData)}
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
