import { useEffect } from "react";
import ReactEChartsCore from "echarts-for-react/lib/core";
import * as echarts from "echarts";
import * as ecStat from "echarts-stat";
import type { ExternalDataTransform } from "@manufac/echarts-simple-transform";

declare module "echarts-stat" {
  let transform: {
    regression: ExternalDataTransform;
    histogram: ExternalDataTransform;
    clustering: ExternalDataTransform;
  };
}

function App() {
  echarts.registerTransform(ecStat.transform.histogram);

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
    <div className="flex h-screen w-screen justify-center items-center bg-[#D9D9D9]">
      <div className="w-[40%] border-solid border-2 border-gray-50 p-5 rounded-xl bg-white shadow">
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
                  "Village",
                  "Village 1",
                  "Village 2",
                  "Village 3",
                  "Village 4",
                  "Village 5",
                ],
                [10, 43.3, 85.8, 93.7, 12, 34],
                [20, 83.1, 73.4, 55.1, 32, 54, 21],
                [30, 86.4, 65.2, 82.5, 32, 21],
                [40, 72.4, 53.9, 39.1, 21, 43],
                [50, 72.4, 53.9, 39.1, 21, 43],
              ],
            },
            xAxis: {
              type: "category",
              name: "IWI Score (0-100)",
              nameLocation: "middle",
              nameTextStyle: {
                padding: [13, 0],
                fontSize: 15,
                color: "#9F9F9F",
              },
            },
            yAxis: {
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
    </div>
  );
}

export default App;
