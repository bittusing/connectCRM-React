"use client";

import React, { useState } from "react";
import SelectGroupOne from "@/components/FormElements/SelectGroup/SelectGroupOne";
import InputGroup from "@/components/FormElements/InputGroup";
import type { CollapseProps } from "antd";
import AdditionalLeadDetails from "./AdditionalLeadDetails";
import CustomCollapse from "../../FormElements/CustomCollapse";
import DateTimePicker from "../../FormElements/DatePicker/DateTimePicker";
import ButtonDefault from "../../Buttons/ButtonDefault";
import { AGEND_NAMES, leadStatus as leadStatusConstant } from "@/utils/Constants/UsefullJSON";
import LeadStatusUI from "@/components/CommonUI/LeadStatus/LeadStatus";

const selectOptionsData = {
  leadSources: {
    label: "Lead source",
    options: [
      {
        value: "Facebook",
        label: "Facebook",
      },
      {
        value: "Google",
        label: "Google",
      },
      {
        value: "Twitter",
        label: "Twitter",
      },
      {
        value: "LinkedIn",
        label: "LinkedIn",
      },
      {
        value: "Instagram",
        label: "Instagram",
      },
    ],
  },
  productAndService: {
    label: "Product & Service",
    options: [
      {
        value: "Bhutani",
        label: "Bhutani",
      },
      {
        value: "Delhi NCR",
        label: "Delhi NCR",
      },
      {
        value: "Mumbai",
        label: "Mumbai",
      },
      {
        value: "Chennai",
        label: "Chennai",
      },
      {
        value: "Kolkata",
        label: "Kolkata",
      },
    ],
  },
  agents: {
    label: "Assign to agents",
    options: AGEND_NAMES,
  },
  status: {
    label: "Lead status",
    options: leadStatusConstant,
  },
};

const items: CollapseProps["items"] = [
  {
    key: "1",
    label: (
      <span className="text-body-sm font-medium text-white">
        Additional details
      </span>
    ),
    children: <AdditionalLeadDetails />,
  },
];
export default function AddLeads() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    contactNumber: "",
    leadSource: "",
    productAndService: [],
    assignedAgent: "",
    leadStatus: "",
    followUpDate: "",
    description: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSelectChange = (
    name: string,
    value: string | number | string[] | number[],
  ) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleDateChange = (selectedDates: Date[], dateStr: string) => {
    setFormData((prevData) => ({
      ...prevData,
      followUpDate: dateStr ? dateStr : "",
    }));
  };

  const handleSubmit = () => {
    console.log("Form data:", formData);
  };
  return (
    <div className="mt-auto w-auto ">
      <div className="grid grid-cols-1 gap-9 sm:grid-cols-1">
        <div className="flex flex-col gap-9">
          {/* <!-- Contact Form --> */}
          <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
            <div className="flex items-center justify-between border-b border-stroke px-6.5 py-4 dark:border-dark-3">
              <h3 className="font-semibold text-dark dark:text-white">
                Basic Details
              </h3>
              <ButtonDefault label="↓ Import" mode="link" link={"/import"} />
            </div>
            <form action={handleSubmit}>
              <div className="w-full p-6.5">
                <div className="mb-4.5 flex flex-col gap-4.5 xl:flex-row">
                  <InputGroup
                    label="First name"
                    name="firstName"
                    type="text"
                    placeholder="Enter lead's first name"
                    customClasses="w-full xl:w-1/2"
                    value={formData.firstName}
                    onChange={handleInputChange}
                  />
                  <InputGroup
                    label="Last name"
                    name="lastName"
                    type="text"
                    placeholder="Enter lead's last name"
                    customClasses="w-full xl:w-1/2"
                    value={formData.lastName}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="mb-4.5 flex flex-col gap-4.5 xl:flex-row">
                  <InputGroup
                    label="Email"
                    name="email"
                    type="email"
                    placeholder="Enter lead's email address"
                    customClasses="w-full xl:w-1/2"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                  <InputGroup
                    label="Contact number"
                    name="contactNumber"
                    type="tel"
                    required
                    placeholder="Enter lead's contact number"
                    customClasses="w-full xl:w-1/2"
                    value={formData.contactNumber}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="mb-4.5 flex flex-col gap-4.5 xl:flex-row">
                  <div className="w-full xl:w-1/2">
                    <SelectGroupOne
                      label={selectOptionsData["leadSources"]?.label}
                      options={selectOptionsData["leadSources"]?.options}
                      setSelectedOption={(value) =>
                        handleSelectChange("leadSource", value)
                      }
                    />
                  </div>
                  <div className="w-full xl:w-1/2">
                    <SelectGroupOne
                      label={selectOptionsData["productAndService"]?.label}
                      options={selectOptionsData["productAndService"]?.options}
                      setSelectedOption={(value) =>
                        handleSelectChange("productAndService", value)
                      }
                    />
                  </div>
                  {/* <div className="w-full xl:w-1/2">
                    <MultiSelect
                      id="productAndService"
                      label={selectOptionsData["productAndService"]?.label}
                      optionsList={
                        selectOptionsData["productAndService"]?.options
                      }
                      onChange={(value) =>
                        handleSelectChange("productAndService", value)
                      }
                    />
                  </div> */}
                </div>

                <div className="mb-4.5 flex flex-col gap-4.5 xl:flex-row">
                  <div className="w-full xl:w-1/2">
                    <SelectGroupOne
                      label={selectOptionsData["agents"]?.label}
                      options={selectOptionsData["agents"]?.options}
                      setSelectedOption={(value) =>
                        handleSelectChange("assignedAgent", value)
                      }
                    />
                  </div>
                  <div className="w-full xl:w-1/2">
                    <LeadStatusUI
                      handleInputChange={handleInputChange}
                      handleSelectChange={handleSelectChange}
                      formData={formData}
                    />
                  </div>
                </div>

                <div className="mb-4.5 w-full">
                  <DateTimePicker
                    label="Follow-up date"
                    onChange={handleDateChange}
                  />
                </div>
                <div className="mb-6 w-full ">
                  <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                    Description
                  </label>
                  <textarea
                    name="description"
                    rows={3}
                    placeholder="Enter description / note about lead."
                    className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5 py-3 text-dark outline-none transition placeholder:text-dark-6 focus:border-primary active:border-primary disabled:cursor-default dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                    value={formData.description}
                    onChange={handleInputChange}
                  ></textarea>
                </div>
                <div className="mb-6 w-full ">
                  <CustomCollapse items={items} />
                </div>

                <button
                  type="submit"
                  onClick={handleSubmit}
                  className="flex w-full justify-center rounded-[7px] bg-primary p-[13px] font-medium text-white hover:bg-opacity-90"
                >
                  Add lead
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
