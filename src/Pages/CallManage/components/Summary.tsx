import CustomAntdTable from "@/components/Tables/CustomAntdTable";
import useScreenHook from "@/hooks/useScreenHook";
import React from "react";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

const data = [
  { type: "Miss Call", count: 9 },
  { type: "Not Connected Call", count: 33 },
  { type: "Connected Calls", count: 182 },
  { type: "Rejected", count: 9 },
  { type: "Working Hours", count: "00:38:17" },
];
export default function Summary() {
  const { deviceType } = useScreenHook();
  const summaryColumns = [
    {
      title: "Call Type",
      dataIndex: "callType",
      key: "callType",
      render: (text: any) => (
        <span style={{ color: returnColorCode(text) }}>{text}</span>
      ),
    },
    { title: "Calls", dataIndex: "calls", key: "calls" },
    { title: "Duration", dataIndex: "duration", key: "duration" },
  ];

  const summaryData = [
    { key: "1", callType: "Incoming", calls: 27, duration: "00:08:45" },
    { key: "2", callType: "Outgoing", calls: 205, duration: "01:27:45" },
    { key: "3", callType: "Missed", calls: 9, duration: "-" },
    { key: "4", callType: "Rejected", calls: 9, duration: "-" },
    { key: "5", callType: "Total", calls: 241, duration: "01:36:10" },
  ];

  const donutChartData = [74, 64, 103, 1];
  const donutChartLabels = [
    "Incoming Call",
    "Outgoing Call",
    "Missed Call",
    "Rejected Call",
  ];
  const donutChartColors = ["#10b981", "#3b82f6", "#fbbf24", "#ec4899"];

  const donutChartOptions: ApexOptions = {
    chart: {
      type: "donut",
    },
    labels: donutChartLabels,
    colors: donutChartColors,
    legend: {
      show: true,
      position: "right", // Change legend position to right
      fontSize: deviceType === "mobile" ? "7px" : "14px",
      fontFamily: "Helvetica, Arial, sans-serif",
      fontWeight: 400,
      itemMargin: {
        horizontal: 5,
        vertical: 2,
      },
    },
    plotOptions: {
      pie: {
        donut: {
          size: "65%",
        },
      },
    },
    dataLabels: {
      enabled: true,
      formatter: function (val: number) {
        return val.toFixed(0) + "%";
      },
      //   style: {
      //     fontSize: "16px",
      //     fontFamily: "Helvetica, Arial, sans-serif",
      //     fontWeight: "bold",
      //     colors: ["#fff", "#10b981"], // Set data label color to white
      //   },
      // dropShadow: {
      //   enabled: false,
      //   color: '#000',
      //   top: 1,
      //   left: 1,
      //   blur: 1,
      //   opacity: 0.45
      // }
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: "100%",
          },
        },
      },
    ],
  };

  const returnColorCode = (type: string) => {
    switch (type) {
      case "Incoming":
        return "#10b981";
      case "Outgoing":
        return "#3b82f6";
      case "Missed":
        return "#fbbf24";
      case "Rejected":
        return "#ec4899";
    }
  };
  return (
    <div className="flex flex-col items-center gap-3 lg:flex-row lg:gap-0">
      <div className="w-full max-w-[560px] pr-4">
        <CustomAntdTable
          columns={summaryColumns}
          dataSource={summaryData}
          pagination={false}
        />
      </div>
      <div className="flex w-full min-w-[167px] flex-wrap gap-3 lg:w-auto">
        {data?.map((item) => (
          <div
            key={item.type + item.count}
            className="flex w-full max-w-[159px] flex-col justify-center bg-gray-100 p-2 px-4 dark:bg-gray-7 sm:max-w-[200px]"
          >
            <span className="text-gray-6 dark:text-gray-5">{item.type}</span>
            <span className="t font-semibold text-dark dark:text-white">
              {item.count}
            </span>
          </div>
        ))}
      </div>
      <div className="w-full">
        <ReactApexChart
          options={donutChartOptions}
          series={donutChartData}
          type="donut"
          height={350}
        />
      </div>
    </div>
  );
}
