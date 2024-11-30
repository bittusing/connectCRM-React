"use client";

import React, { useState } from "react";
import ButtonDefault from "../../components/Buttons/ButtonDefault";
import CheckboxTwo from "../../components/FormElements/Checkboxes/CheckboxTwo";
import AllDetailsFields from "../Components/AllDetailsFields";
import AdditionalInformation from "../Components/AdditionalInformation";
import AttachmentTab from "../Components/AttachmentTab";
import CustomAntdTable from "../../components/Tables/CustomAntdTable";
import DateTimePicker from "../../components/FormElements/DatePicker/DateTimePicker";
import SelectGroupOne from "../../components/FormElements/SelectGroup/SelectGroupOne";
import TabPanel from "../../components/TabPanel/TabPanel";
import { AGEND_NAMES } from "../../utils/Constants/UsefullJSON";
import LeadStatusUI from "../../components/CommonUI/LeadStatus/LeadStatus";

const staticData = [
  {
    fieldName: "Full name",
    fieldNameValue: "John Doe",
  },
  {
    fieldName: "Email",
    fieldNameValue: "johndoe@example.com",
  },
  {
    fieldName: "Contact Number",
    fieldNameValue: "+91 9876543210",
  },
  {
    fieldName: "Region",
    fieldNameValue: "Pune, Maharashtra",
  },
  {
    fieldName: "Lead source",
    fieldNameValue: "New York",
  },
  {
    fieldName: "Service",
    fieldNameValue: "Fair fox",
  },
];

const columns = [
  {
    title: "COMMENTED BY",
    dataIndex: "commentedBy",
    key: "commentedBy",
  },
  {
    title: "DATE",
    dataIndex: "date",
    key: "date",
  },
  {
    title: "STATUS",
    dataIndex: "status",
    key: "status",
  },
  {
    title: "FOLLOWUP DATE",
    dataIndex: "followupDate",
    key: "followupDate",
  },
  {
    title: "COMMENT",
    dataIndex: "comment",
    key: "comment",
  },
];

const data = [
  {
    key: "1",
    commentedBy: "Admin",
    date: "30/09/24 10:14:14",
    status: "Call Back",
    followupDate: "01/10/24 3:44:00",
    comment: "hiii",
  },
  {
    key: "2",
    commentedBy: "Admin",
    date: "25/09/24 3:32:00",
    status: "Call Back-Re-visit",
    followupDate: "27/09/24 9:01:00",
    comment: "sefse",
  },
];

const LeadAction: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: "dfdsf",
    emailId: "tinnting@gmail.com",
    contactNo: "3432423424",
    service: "Fairfox",
    leadSource: "Just Dial",
    agentName: "juhi",
    status: "Call Back",
    followup: "",
    description: "",
    addToCalendar: false,
    wonAmount: 0,
    lostReason: "",
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

  const handleSelectChange = (name: string, value: string | number) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleDateChange = (selectedDates: Date[], dateStr: string) => {
    setFormData((prevData) => ({
      ...prevData,
      followup: dateStr,
    }));
  };

  const handleCheckboxChange = ({
    value,
    isChecked,
  }: {
    value: string;
    isChecked: boolean;
  }) => {
    setFormData((prevData) => ({
      ...prevData,
      [value]: isChecked,
    }));
  };

  const handleSubmit = () => {
    console.log("Form data:", formData);
  };

  const tabsData = [
    {
      tabName: "History",
      component: <CustomAntdTable columns={columns} dataSource={data} />,
    },
    {
      tabName: "All Details",
      component: <AllDetailsFields />,
    },
    {
      tabName: "Additional Information",
      component: <AdditionalInformation />,
    },
    {
      tabName: "Geo-Location Record",
      component: <AttachmentTab />,
    },
  ];

  return (
    <div className="rounded-lg bg-white p-6 shadow-md dark:bg-gray-dark">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-dark dark:text-white">
          Basic Details
        </h2>
        {/* Messaging buttons :  can be used in Future.  */}
        {/* <div>
          <Button
            icon={<WhatsAppOutlined />}
            className="mr-2 border-none bg-green-500 text-white hover:bg-green-600"
          >
            Whatsapp
          </Button>
          <Button
            icon={<MessageOutlined />}
            className="hover:bg-primary-dark border-none bg-primary text-white"
          >
            Send SMS
          </Button>
        </div> */}
      </div>

      <div className="mb-8 flex w-full flex-col justify-between gap-4 sm:flex-row sm:gap-8">
        <div className="flex w-full flex-col gap-4 border-r-0 pr-0 text-dark dark:text-white sm:border-r-2 sm:pr-8">
          {/* static Fields  */}
          {staticData?.map((item) => (
            <div
              key={item.fieldNameValue}
              className="flex w-full items-center border-b-2 border-solid border-gray py-2"
            >
              <span className="w-[220px] text-lg font-medium">
                {item.fieldName}
              </span>
              <span className="text-base ">{item.fieldNameValue}</span>
            </div>
          ))}
          <SelectGroupOne
            label="Agent Name"
            options={AGEND_NAMES}
            setSelectedOption={(value) =>
              handleSelectChange("assignedAgent", value)
            }
          />
        </div>

        {/* Form Fields  */}
        <div className="flex w-full flex-col gap-4">
          <LeadStatusUI
            handleInputChange={handleInputChange}
            handleSelectChange={handleSelectChange}
            formData={formData}
          />

          <DateTimePicker label="Followup" onChange={handleDateChange} />

          <div>
            <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Notes about Lead."
              className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-dark outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
              rows={2}
            />
          </div>

          <div className="flex items-center">
            <CheckboxTwo
              label="Add to Calender"
              onChange={handleCheckboxChange}
              checked={formData.addToCalendar}
              id="addToCalendar"
            />
          </div>
        </div>
      </div>

      <div className="flex w-full justify-center ">
        <ButtonDefault
          onClick={handleSubmit}
          label="Submit"
          variant="primary"
        />
      </div>

      <TabPanel
        tabsData={tabsData}
        type="card"
        defaultActiveKey="1"
        customClassName="mt-6"
      />
    </div>
  );
};

export default LeadAction;
