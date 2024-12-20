import { ApexOptions } from "apexcharts";
import ReactApexChart from "react-apexcharts";

interface PaymentOverview {
  chartData: Array<{
    month: string;
    received: number;
    loss: number;
    receivedAmount: number;
    lossAmount: number;
  }>;
  summary: {
    receivedLeads: number;
    lostLeads: number;
  };
}

interface ChartOneProps {
  paymentOverview: PaymentOverview | null;
}

const ChartOne: React.FC<ChartOneProps> = ({ paymentOverview }) => {
  const series = [
    {
      name: "Won Amount",
      data: paymentOverview?.chartData.map(item => item.receivedAmount) || [],
    },
    {
      name: "Lost Amount",
      data: paymentOverview?.chartData.map(item => item.lossAmount) || [],
    },
  ];

  const options: ApexOptions = {
    legend: {
      show: false,
      position: "top",
      horizontalAlign: "left",
    },
    colors: ["#5750F1", "#0ABEF9"],
    chart: {
      fontFamily: "Satoshi, sans-serif",
      height: 310,
      type: "area",
      toolbar: {
        show: false,
      },
    },
    fill: {
      gradient: {
        opacityFrom: 0.55,
        opacityTo: 0,
      },
    },
    responsive: [
      {
        breakpoint: 1024,
        options: {
          chart: {
            height: 300,
          },
        },
      },
      {
        breakpoint: 1366,
        options: {
          chart: {
            height: 320,
          },
        },
      },
    ],
    stroke: {
      curve: "smooth",
    },
    markers: {
      size: 0,
    },
    grid: {
      strokeDashArray: 5,
      xaxis: {
        lines: {
          show: false,
        },
      },
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    tooltip: {
      fixed: {
        enabled: false,
      },
      x: {
        show: false,
      },
      y: {
        title: {
          formatter: function (_e) {
            return "";
          },
        },
      },
      marker: {
        show: false,
      },
    },
    xaxis: {
      type: "category",
      categories: paymentOverview?.chartData.map(item => item.month) || [],
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      title: {
        style: {
          fontSize: "0px",
        },
      },
    },
  };

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-7">
      <div className="flex flex-wrap items-start justify-between gap-3 sm:flex-nowrap">
        <div className="flex w-full flex-wrap gap-3 sm:gap-5">
          <div className="flex min-w-47.5">
            <h4 className="text-xl font-bold text-black dark:text-white">
              Won - Loss Overview
            </h4>
          </div>
        </div>
        {/* <div className="flex w-full max-w-45 justify-end">
          <div className="inline-flex items-center rounded-md bg-whiter p-1.5 dark:bg-meta-4">
            <button className="rounded bg-white py-1 px-3 text-xs font-medium text-black shadow-card hover:bg-white hover:shadow-card dark:bg-boxdark dark:text-white dark:hover:bg-boxdark">
              Month
            </button>
          </div>
        </div> */}
      </div>

      <div className="mb-2">
        <div id="chartOne" className="-ml-5">
          <ReactApexChart
            options={options}
            series={series}
            type="area"
            height={350}
          />
        </div>
      </div>

      <div className="flex flex-wrap items-start justify-center gap-3.5 sm:flex-nowrap sm:gap-5">
        <div className="flex w-full flex-wrap items-center gap-3.5 sm:gap-5">
          <div className="w-full px-8">
            <div className="flex w-full items-center gap-3.5">
              <div className="w-full max-w-52">
                <div className="flex w-full items-center justify-between border-b border-stroke pb-2.5 dark:border-strokedark">
                  <div className="flex items-center gap-1.5">
                    <span className="block h-3 w-3 rounded-full bg-primary"></span>
                    <span className="font-medium w-fit text-black dark:text-white">
                      Won Amount
                    </span>
                  </div>
                  <span className="font-medium text-meta-3">
                    ₹{paymentOverview?.summary.receivedLeads.toLocaleString() || '0'}
                  </span>
                </div>
              </div>
              <div className="w-full max-w-45">
                <div className="flex w-full items-center justify-between border-b border-stroke pb-2.5 dark:border-strokedark">
                  <div className="flex items-center gap-1.5">
                    <span className="block h-3 w-3 rounded-full bg-secondary"></span>
                    <span className="font-medium text-black dark:text-white">
                      Lost Amount
                    </span>
                  </div>
                  <span className="font-medium text-meta-3 ml-3">
                    ₹{paymentOverview?.summary.lostLeads.toLocaleString() || '0'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChartOne;