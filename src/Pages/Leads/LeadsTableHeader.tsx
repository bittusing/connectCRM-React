import { useState } from "react";
import SelectGroupOne from "../../components/FormElements/SelectGroup/SelectGroupOne";
import ButtonDefault from "../../components/Buttons/ButtonDefault";
import { SearchOutlined } from "@ant-design/icons";
import AdvanceFilterUI from "../Components/AdvanceFilterUI";
import useScreenHook from "../../hooks/useScreenHook";
import SearchForm from "../../components/Header/SearchForm";
import { getStoredAgents, getStoredStatus } from "../../api/commonAPI";

export default function LeadsTableHeader({ handleSearch, searchTerm }: any) {
  const statusList = getStoredStatus(true);
  const agentList = getStoredAgents(true);
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
  const [isAdvanceFilterEnable, setIsAdvanceFilterEnable] = useState(false);

  const handleSelectChange = (
    name: string,
    value: string | number | string[] | number[]
  ) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const renderMobileView = () => {
    return (
      <>
        <div className="mb-3 flex flex-row gap-2">
          <div className="w-full">
            <SearchForm
              customClasses="border-stroke-dark"
              onSearch={handleSearch}
              searchTerm={searchTerm}
              placeholder="Search leads..."
            />
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
        <div className="mb-4 flex justify-center gap-2">
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
      <div className="mb-4 hidden justify-between sm:flex">
        <div className="hidden flex-col items-center justify-center gap-3 rounded-md border border-stroke bg-white p-3 shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card sm:flex min-w-[530px]">
          <span className="text-base font-medium text-dark dark:text-white">
            Bulk Action on selected rows
          </span>
          <div className="flex gap-2 w-full">
            <SelectGroupOne
              options={statusList}
              placeholder="Select Status"
              setSelectedOption={(value) => handleSelectChange("status", value)}
              wrapperClasses="w-full"
            />
            <SelectGroupOne
              options={agentList}
              placeholder="Select Employee"
              setSelectedOption={(value) => handleSelectChange("agents", value)}
              wrapperClasses="w-full"
            />
            <ButtonDefault label="Submit" variant="primary" />
          </div>
        </div>
        <div className="hidden flex-col gap-2 sm:flex">
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
              link="/import"
              label="↓ Import"
              variant="outline"
            />
            <ButtonDefault
              mode="link"
              link="/leads/add"
              label="+ Add Lead"
              variant="outline"
            />
          </div>
        </div>
      </div>
      {isAdvanceFilterEnable && deviceType !== "mobile" && <AdvanceFilterUI />}
      <div className="mb-4 hidden justify-between sm:flex">
        <div className="w-full">
          <SearchForm
            customClasses="border-stroke-dark"
            onSearch={handleSearch}
            searchTerm={searchTerm}
            placeholder="Search leads..."
          />
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
