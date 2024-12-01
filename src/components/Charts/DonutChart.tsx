import { ApexOptions } from "apexcharts";
import React, { useMemo } from "react";
import ReactApexChart from "react-apexcharts";

const leadsSourceData = [
  { label: "Facebook Ads", value: 15000 },
  { label: "Google Ads", value: 7000 },
  { label: "Twitter Ads", value: 5000 },
  { label: "LinkedIn Ads", value: 4000 },
  { label: "Insta Ads", value: 14000 },
  { label: "xyz Ads", value: 10000 },
  { label: "abc Ads", value: 9000 },
  { label: "efv Ads", value: 8000 },
  { label: "Other", value: 2000 },
];

const generateColors = (count: number): string[] => {
  const baseColor = [37, 28, 255]; // #5750F1 in RGB
  const maxColor = [180, 180, 255]; // Limit the lightest color to avoid white
  const colors: string[] = [];

  for (let i = 0; i < count; i++) {
    const factor = i / (count - 1);
    const r = Math.round(baseColor[0] + (maxColor[0] - baseColor[0]) * factor);
    const g = Math.round(baseColor[1] + (maxColor[1] - baseColor[1]) * factor);
    const b = Math.round(baseColor[2] + (maxColor[2] - baseColor[2]) * factor);
    colors.push(`rgb(${r},${g},${b})`);
  }

  return colors;
};

const DonutCharts: React.FC = () => {
  const series = leadsSourceData.map((item) => item.value);
  const labels = leadsSourceData.map((item) => item.label);
  const colors = useMemo(() => generateColors(leadsSourceData.length), []);

  const options: ApexOptions = {
    chart: {
      fontFamily: "Satoshi, sans-serif",
      type: "donut",
    },
    colors: colors,
    labels: labels,
    legend: {
      show: false,
      position: "bottom",
    },
    plotOptions: {
      pie: {
        donut: {
          size: "75%",
          background: "transparent",
          labels: {
            show: true,
            total: {
              show: true,
              showAlways: true,
              label: "Leads",
              fontSize: "16px",
              fontWeight: "400",
            },
            value: {
              show: true,
              fontSize: "28px",
              fontWeight: "bold",
            },
          },
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    responsive: [
      {
        breakpoint: 2600,
        options: {
          chart: {
            width: 415,
          },
        },
      },
      {
        breakpoint: 640,
        options: {
          chart: {
            width: 300,
          },
        },
      },
    ],
  };

  return (
    <div className="col-span-12 rounded-[10px] bg-white px-7.5 pb-7 pt-7.5 shadow-1 dark:bg-gray-dark dark:shadow-card xl:col-span-5">
      <div className="mb-9 justify-between gap-4 sm:flex">
        <div>
          <h4 className="text-body-2xlg font-bold text-dark dark:text-white">
            Leads source overview
          </h4>
        </div>
      </div>

      <div className="mb-8">
        <div className="mx-auto flex justify-center">
          <ReactApexChart options={options} series={series} type="donut" />
        </div>
      </div>

      <div className="mx-auto w-full">
        <div className="-mx-7.5 flex flex-wrap items-center gap-y-2.5">
          {leadsSourceData.map((item, index) => (
            <div key={item.label} className="w-full px-7.5 sm:w-1/2">
              <div className="flex w-full items-center">
                <span
                  className="mr-2 block h-3 w-full max-w-3 rounded-full"
                  style={{ backgroundColor: colors[index] }}
                ></span>
                <p className="flex w-full justify-between text-body-sm font-medium text-dark dark:text-dark-6">
                  <span>{item.label}</span>
                  <span>{item.value}</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DonutCharts;