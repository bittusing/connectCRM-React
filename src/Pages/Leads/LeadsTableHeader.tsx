import React, { useState } from "react";
import SelectGroupOne from "../../components/FormElements/SelectGroup/SelectGroupOne";
import ButtonDefault from "../../components/Buttons/ButtonDefault";
import SearchForm from "../../components/Header/SearchForm";
import { SearchOutlined } from "@ant-design/icons";
import AdvanceFilterUI from "../Components/AdvanceFilterUI";
import useScreenHook from "../../hooks/useScreenHook";

const selectOptionsData = {
  agents: {
    label: "Assign to agents",
    options: [
      {
        label: "Shashank",
        value: 8948492799,
      },
      {
        label: "Kiran",
        value: 9321220039,
      },
      {
        label: "Abhilekh",
        value: 33098938928,
      },
    ],
  },
  status: {
    label: "Lead status",
    options: [
      {
        value: "Call Back",
        label: "Call Back",
      },
      {
        value: "Call Back-Re-visit",
        label: "Call Back-Re-visit",
      },
      {
        value: "Call Back-Schedule-visit",
        label: "Call Back-Schedule-visit",
      },
      {
        value: "Call Back-Visit",
        label: "Call Back-Visit",
      },
      {
        value: "Fake lead",
        label: "Fake lead",
      },
      {
        value: "Lost",
        label: "Lost",
      },
      {
        value: "Meeting",
        label: "Meeting",
      },
      {
        value: "Not Attempt",
        label: "Not Attempt",
      },
      {
        value: "Pending",
        label: "Pending",
      },
      {
        value: "SMS & Whatsapp Shoots",
        label: "SMS & Whatsapp Shoots",
      },
      {
        value: "Won",
        label: "Won",
      },
    ],
  },
};

export default function LeadsTableHeader() {
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
  const { deviceType } = useScreenHook();

  const [isAdvanceFilterEnable, setIsAdvanceFilterEnable] =
    useState<boolean>(false);
  const handleSelectChange = (
    name: string,
    value: string | number | string[] | number[],
  ) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const renderMobileView = () => {
    return (
      <>
        <div className="mb-3 flex flex-row gap-2  ">
          <div className="w-full">
            {" "}
            <SearchForm customClasses="border-stroke-dark" />
          </div>
          <div className="w-[30%]">
            <ButtonDefault
              label="Advance Filter"
              variant="outline"
              onClick={() => setIsAdvanceFilterEnable(!isAdvanceFilterEnable)}
            />
          </div>
        </div>
        {isAdvanceFilterEnable && <AdvanceFilterUI />}
        <div className="mb-2 flex gap-2">
          <ButtonDefault label="Select All" variant="primary" fullWidth/>
          <ButtonDefault
            label="Select Per Page"
            variant="secondary"
            fullWidth
          />
        </div>
        <div className="mb-4 justify-center flex gap-2">
            <ButtonDefault
              label="Export PDF"
              variant="outline"
              customClasses="bg-black text-white"
            />
            <ButtonDefault
              label="Export Excel"
              variant="outline"
              customClasses="bg-black text-white"
            />
            <ButtonDefault
              label="Delete"
              variant="outline"
              customClasses="bg-red-500 text-white"
            />
        </div>
      </>
    );
  };
  return (
    <>
      {" "}
      <div className="mb-4 hidden justify-between sm:flex">
        <div className="hidden flex-col items-center  justify-center gap-3 rounded-md border border-stroke bg-white px-6.5 py-2 shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card sm:flex">
          <span className="text-base font-medium text-dark dark:text-white">
            Bulk Action on selected rows
          </span>
          <div className="flex space-x-2">
            <SelectGroupOne
              options={selectOptionsData["status"]?.options}
              setSelectedOption={(value) => handleSelectChange("status", value)}
            />
            <SelectGroupOne
              options={selectOptionsData["agents"]?.options}
              setSelectedOption={(value) => handleSelectChange("agents", value)}
            />
            <ButtonDefault label="Submit" variant="primary" fullWidth />
          </div>
        </div>
        <div className="hidden flex-col gap-2 sm:flex ">
          <ButtonDefault
            icon={<SearchOutlined />}
            label="Advance Filter"
            variant="outline"
            onClick={() => setIsAdvanceFilterEnable(!isAdvanceFilterEnable)}
            fullWidth
          />
          <div className="flex gap-2">
            <ButtonDefault
              mode="link"
              link={"/import"}
              label="↓ Import"
              variant="outline"
            />
            <ButtonDefault
              mode="link"
              link={"/leads/add"}
              label="+ Add Lead"
              variant="outline"
            />
          </div>
        </div>
      </div>
      {isAdvanceFilterEnable && deviceType !== "mobile" && <AdvanceFilterUI />}
      <div className="mb-4 hidden justify-between sm:flex">
        <div className="flex min-w-[330px] gap-2">
          <ButtonDefault label="Select All" variant="primary" fullWidth />
          <ButtonDefault
            label="Select Per Page"
            variant="secondary"
            fullWidth
          />
        </div>
        <div className="ml-2 w-full">
          <SearchForm customClasses="border-stroke-dark" />
        </div>
        <div className="flex space-x-2">
          <ButtonDefault
            label="Export PDF"
            variant="outline"
            customClasses="bg-black text-white"
          />
          <ButtonDefault
            label="Export Excel"
            variant="outline"
            customClasses="bg-black text-white"
          />
          <ButtonDefault
            label="Delete"
            variant="outline"
            customClasses="bg-red-500 text-white"
          />
        </div>
      </div>
      {deviceType === "mobile" && renderMobileView()}
    </>
  );
}
