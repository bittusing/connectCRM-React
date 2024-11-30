"use client";
import React, { useState } from "react";
import { CopyOutlined } from "@ant-design/icons";
import TextAreaCustom from "../../components/FormElements/TextArea/TextAreaCustom";
import SelectGroupOne from "../../components/FormElements/SelectGroup/SelectGroupOne";

export default function ApiIntegeration() {
  const [apiService, setApiService] = useState("housing");
  const [curl, setCurl] = useState(null);

  const handleEmployeeChange = (value: string) => {
    setApiService(value);
  };
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-lg bg-white p-6 shadow-md dark:bg-gray-800">
      <div className="flex flex-col items-center gap-3 w-full sm:w-auto sm:flex-row ">
        <span className="sm:w-[347px] w-auto text-base font-semibold text-dark dark:text-white">
          Choose your API Service:
        </span>
        <SelectGroupOne
          options={[
            { value: "housing", label: "Housing API" },
            { value: "nobroker", label: "No-Broker API" },
          ]}
          wrapperClasses="w-[300px]"
          setSelectedOption={handleEmployeeChange}
        />
      </div>
      <div className="relative w-full">
        <CopyOutlined
          className={`absolute right-[14px] top-[18px] ${curl ? "cursor-pointer" : "cursor-not-allowed opacity-50"}`}
        />
        <TextAreaCustom
          rows={12}
          placeholder="Your curl will appear here."
          customClasses="w-full"
          readOnly
          onChange={(e) => {
            // e.target.value will be properly typed as string
            console.log(e.target.value);
          }}
        />
      </div>
    </div>
  );
}
