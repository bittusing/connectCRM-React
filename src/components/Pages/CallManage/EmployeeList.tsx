"use client";
import React, { useState } from "react";
import DatePickerOne from "@/components/FormElements/DatePicker/DatePickerOne";
import ButtonDefault from "@/components/Buttons/ButtonDefault";
import CustomAntdTable from "@/components/Tables/CustomAntdTable";
import useScreenHook from "@/hooks/useScreenHook";

interface EmployeeData {
  key: string;
  srNo: number;
  user: string;
  higstestNoOfCall: number;
  totalDuration: string;
  averageCallDuration: string;
}

const EmployeeList: React.FC = () => {
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const { deviceType } = useScreenHook();

  const handleStartDateChange = (selectedDates: Date[], dateStr: string) => {
    setStartDate(dateStr);
  };

  const handleEndDateChange = (selectedDates: Date[], dateStr: string) => {
    setEndDate(dateStr);
  };

  const handleSubmit = () => {
    console.log("Submitting with date range:", startDate, "to", endDate);
    // Implement your submit logic here
  };

  const handleRefresh = () => {
    console.log("Refreshing data");
    // Implement your refresh logic here
  };

  const columns = [
    {
      title: "Sr. No.",
      dataIndex: "srNo",
      key: "srNo",
      align: "center",
      minWidth: 80,
    },
    {
      title: "User",
      dataIndex: "user",
      key: "user",
      align: "center",
    },
    {
      title:
        deviceType === "mobile" ? "Number of Calls" : "Highest No. of Calls",
      dataIndex: "higstestNoOfCall",
      key: "higstestNoOfCall",
      minWidth: 142,
      align: "center",
    },
    {
      title: "Total Duration",
      dataIndex: "totalDuration",
      key: "totalDuration",
      minWidth: 127,
      align: "center",
    },
    {
      title: "Average Call Duration",
      dataIndex: "averageCallDuration",
      key: "averageCallDuration",
      minWidth: 180,
      align: "center",
    },
  ];

  const data: EmployeeData[] = [
    {
      key: "1",
      srNo: 1,
      user: "riya",
      higstestNoOfCall: 0,
      totalDuration: "0h 0m 0s",
      averageCallDuration: "0h 0m 0s",
    },
    // Add more data as needed
  ];

  return (
    <div className="rounded-lg bg-white p-6 shadow-md dark:bg-gray-800">
      <div className="mb-6 flex flex-col gap-4 items-center justify-between sm:flex-row">
        <div className="flex flex-col w-full items-center gap-4  sm:flex-row">
          <DatePickerOne
            label=""
            onChange={handleStartDateChange}
            customClassName={deviceType === "mobile" ? " w-full" : ""}
          />
          <DatePickerOne
            label=""
            onChange={handleEndDateChange}
            customClassName={deviceType === "mobile" ? " w-full" : ""}
          />
        </div>
        <div className="flex items-center space-x-4">
          <ButtonDefault
            label="Submit"
            onClick={handleSubmit}
            variant="primary"
            customClasses="bg-primary text-white"
          />
          <ButtonDefault
            label="Refresh"
            onClick={handleRefresh}
            variant="secondary"
            customClasses="bg-green-500 text-white"
          />
        </div>
      </div>

      <CustomAntdTable
        columns={columns}
        dataSource={data}
        pagination={false}
        className="w-full"
      />
    </div>
  );
};

export default EmployeeList;
