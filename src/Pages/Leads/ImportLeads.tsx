"use client";

import React, { useState, useRef } from "react";
import { message } from "antd";
import SelectGroupOne from "@/components/FormElements/SelectGroup/SelectGroupOne";
import ButtonDefault from "@/components/Buttons/ButtonDefault";
import FileUploadFillType from "../../components/FormElements/FileUpload/FileUploadFillType";

const ImportLeads: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    leadSource: "",
    status: "",
    assignToAgent: "",
    service: "",
    country: "",
    state: "",
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const fileExtension = file.name.split(".").pop()?.toLowerCase();
      if (fileExtension === "xlsx" || fileExtension === "xls") {
        setSelectedFile(file);
        message.success("Excel file selected successfully");
      } else {
        message.error("Please select only Excel files (.xlsx or .xls)");
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      }
    }
  };

  const handleSelectChange = (name: string, value: string | number) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleNextClick = () => {
    console.log("Form data:", formData);
    console.log("Selected file:", selectedFile);
    // Here you would typically process the file and form data
  };

  const handleDownloadSample = () => {
    // Implement the logic to download a sample CSV file
    console.log("Downloading sample file...");
  };

  // Mock options for select inputs
  const mockOptions = [
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
    { value: "option3", label: "Option 3" },
  ];

  return (
    <div className="rounded-lg bg-white p-6 shadow-md dark:bg-gray-800">
      <div className="mb-6 flex flex-col items-center justify-between gap-3 sm:flex-row">
        <label className="block text-lg font-medium text-gray-700 dark:text-gray-300">
          Select File (CSV File)
        </label>
        <FileUploadFillType
          onChange={handleFileChange}
          customClasses="w-full"
          accept=".xlsx,.xls"
          ref={fileInputRef}
          tooltipInfo="Only .xls and .xlsx formats are allowed to upload"
        />
        <ButtonDefault
          label="Download Sample File"
          onClick={handleDownloadSample}
          variant="secondary"
          customClasses="w-fit"
        />
      </div>

      <div className="mb-6 grid grid-cols-2 gap-6">
        <SelectGroupOne
          label=" Lead Source"
          options={mockOptions}
          setSelectedOption={(value) => handleSelectChange("leadSource", value)}
        />
        <SelectGroupOne
          label=" Service"
          options={mockOptions}
          setSelectedOption={(value) => handleSelectChange("service", value)}
        />
        <SelectGroupOne
          label=" Status"
          options={mockOptions}
          setSelectedOption={(value) => handleSelectChange("status", value)}
        />
        <SelectGroupOne
          label=" Country"
          options={mockOptions}
          setSelectedOption={(value) => handleSelectChange("country", value)}
        />
        <SelectGroupOne
          label=" Assign to agent"
          options={mockOptions}
          setSelectedOption={(value) =>
            handleSelectChange("assignToAgent", value)
          }
        />
        <SelectGroupOne
          label=" State"
          options={mockOptions}
          setSelectedOption={(value) => handleSelectChange("state", value)}
        />
      </div>
      <div className="flex w-full justify-center">
        <ButtonDefault
          label="Next"
          onClick={handleNextClick}
          variant="primary"
          customClasses="w-full bg-primary text-white"
        />
      </div>
    </div>
  );
};

export default ImportLeads;
