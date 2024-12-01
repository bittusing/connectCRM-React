"use client";
import React, { useState } from "react";
import { Card, DatePicker } from "antd";
import dayjs from "dayjs";
import SelectGroupOne from "../../components/FormElements/SelectGroup/SelectGroupOne";
import ButtonDefault from "../../components/Buttons/ButtonDefault";
import CustomAntdTable from "../../components/Tables/CustomAntdTable";

const { RangePicker } = DatePicker;

interface SummaryCardProps {
  title: string;
  value: string | number;
}

const SummaryCard: React.FC<SummaryCardProps> = ({ title, value }) => (
  <Card className="bg-white text-center shadow-md dark:bg-gray-700">
    <p className="text-lg font-semibold text-gray-600 dark:text-gray-300">
      {title}
    </p>
    <p className="text-2xl font-bold text-gray-800 dark:text-white">{value}</p>
  </Card>
);

const ManageReports: React.FC = () => {
  const [dateRange, setDateRange] = useState<[string, string]>([
    "2024-05-01",
    "2024-10-20",
  ]);

  const handleDateRangeChange = (
    _dates: any,
    dateStrings: [string, string]
  ) => {
    setDateRange(dateStrings);
  };

  const handleSubmit = () => {
    console.log("Submitting with current form data");
    // Implement your submit logic here
  };

  // const handleRefresh = () => {
  //   console.log("Refreshing data");
  //   // Implement your refresh logic here
  // };

  const columns = [
    {
      title: "Sr. No.",
      dataIndex: "srNo",
      key: "srNo",
      minWidth: 80,
    },
    {
      title: "Client Name",
      dataIndex: "clientName",
      key: "clientName",
      minWidth: 115,
    },
    {
      title: "Lead Price",
      dataIndex: "leadPrice",
      key: "leadPrice",
      minWidth: 113,
    },
  ];

  const data = [
    { key: "1", srNo: 1, clientName: "Hritik roshan", leadPrice: 0 },
    { key: "2", srNo: 2, clientName: "Ajay", leadPrice: 0 },
    { key: "3", srNo: 3, clientName: "Sharukh khan", leadPrice: 0 },
    { key: "4", srNo: 4, clientName: "Amir khan", leadPrice: 0 },
  ];

  return (
    <div className="rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
      {/* <h2 className="mb-6 text-2xl font-semibold text-gray-800 dark:text-white">
        Income Report
      </h2> */}

      <div className="mb-2 grid grid-cols-2 gap-2 sm:grid-cols-5">
        <div className="col-span-1">
          <SelectGroupOne
            options={[{ value: "Godrej", label: "Godrej" }]}
            setSelectedOption={() => {}}
            placeholder="Godrej"
            // wrapperClasses="max-w-[146px] lg:max-w-none"
          />
        </div>
        <div className="col-span-1">
          <SelectGroupOne
            options={[{ value: "Facebook", label: "Facebook" }]}
            setSelectedOption={() => {}}
            placeholder="Facebook"
            // wrapperClasses="max-w-[146px] lg:max-w-none"
          />
        </div>
        <div className="col-span-1">
          <SelectGroupOne
            options={[{ value: "Call Back", label: "Call Back" }]}
            setSelectedOption={() => {}}
            placeholder="Call Back"
            // wrapperClasses="max-w-[146px] lg:max-w-none"
          />
        </div>
        <div className="col-span-1">
          <SelectGroupOne
            options={[{ value: "riya", label: "Riya" }]}
            setSelectedOption={() => {}}
            placeholder="User"
            // wrapperClasses="max-w-[146px] lg:max-w-none"
          />
        </div>
        <div className="col-span-2 sm:col-span-1">
          <RangePicker
            value={[dayjs(dateRange[0]), dayjs(dateRange[1])]}
            onChange={handleDateRangeChange}
            className="h-[50px] w-full  dark:border-gray-600 dark:bg-gray-700 dark:text-white lg:max-w-none"
          />
        </div>
      </div>
      <div className="mb-2 flex justify-center">
        <ButtonDefault
          label="Submit"
          customClasses="w-full md:w-auto"
          onClick={handleSubmit}
        />
      </div>

      <div className="mb-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
        <div className="col-span-1">
          <SummaryCard title="Total" value={4} />
        </div>
        <div className="col-span-1">
          <SummaryCard title="Won" value={0} />
        </div>
        <div className="col-span-1">
          <SummaryCard title="Ratio" value="0.00%" />
        </div>
        <div className="col-span-1">
          <SummaryCard title="Amount" value={0} />
        </div>
      </div>

      <CustomAntdTable
        columns={columns}
        dataSource={data}
        pagination={{
          total: data.length,
          showSizeChanger: true,
          showQuickJumper: true,
          showTotal: (total: number, range: any) =>
            `${range[0]}-${range[1]} of ${total} items`,
        }}
        className="dark:bg-gray-700 dark:text-white"
      />

      <style>{`
        .ant-select-selector,
        .ant-input,
        .ant-picker {
          border-radius: 4px !important;
        }
        .dark .ant-select-selector,
        .dark .ant-input,
        .dark .ant-picker,
        .dark .ant-picker-panel-container {
          background-color: #374151 !important;
          border-color: #4b5563 !important;
          color: white !important;
        }
        .dark .ant-select-arrow,
        .dark .ant-picker-suffix,
        .dark .ant-picker-icon {
          color: white !important;
        }
        .dark .ant-picker-header,
        .dark .ant-picker-content th {
          color: white !important;
        }
        .dark .ant-picker-cell {
          color: rgba(255, 255, 255, 0.7) !important;
        }
        .dark .ant-picker-cell-in-view {
          color: white !important;
        }
        .dark .ant-picker-cell:hover .ant-picker-cell-inner {
          background-color: #4b5563 !important;
        }
        .dark .ant-picker-cell-selected .ant-picker-cell-inner {
          background-color: #1890ff !important;
        }

        .dark .ant-picker-footer,
        .dark .ant-picker-today-btn {
          color: white !important;
        }
        .dark .ant-card-bordered {
          border: 1px solid grey;
        }
      `}</style>
    </div>
  );
};

export default ManageReports;
