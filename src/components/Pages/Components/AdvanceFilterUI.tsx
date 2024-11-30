import React, { useState } from "react";
import SelectGroupOne from "@/components/FormElements/SelectGroup/SelectGroupOne";
import DateTimePicker from "@/components/FormElements/DatePicker/DateTimePicker";
import ButtonDefault from "@/components/Buttons/ButtonDefault";
import { leadStatus } from "@/utils/Constants/UsefullJSON";

const AdvanceFilterUI: React.FC = () => {
  const [status, setStatus] = useState<string | number>("");
  const [agent, setAgent] = useState<string | number>("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleStatusChange = (value: string | number) => {
    setStatus(value);
  };

  const handleAgentChange = (value: string | number) => {
    setAgent(value);
  };

  const handleStartDateChange = (selectedDates: Date[], dateStr: string) => {
    setStartDate(dateStr);
  };

  const handleEndDateChange = (selectedDates: Date[], dateStr: string) => {
    setEndDate(dateStr);
  };

  const handleSubmit = () => {
    console.log("Submitting with:", { status, agent, startDate, endDate });
    // Implement your submit logic here
  };

  const handleRefresh = () => {
    console.log("Refreshing data");
    // Implement your refresh logic here
  };

  // Mock options for status and agent dropdowns

  const agentOptions = [
    { value: "agent1", label: "Agent 1" },
    { value: "agent2", label: "Agent 2" },
    { value: "agent3", label: "Agent 3" },
  ];

  return (
    <div className="rounded-lg bg-white p-6 mb-4 shadow-md dark:bg-gray-800">
      <div className="mb-4 grid sm:grid-cols-4 grid-cols-2 gap-4">
        <SelectGroupOne
          label=""
          options={leadStatus}
          setSelectedOption={handleStatusChange}
        />
        <SelectGroupOne
          label=""
          options={agentOptions}
          setSelectedOption={handleAgentChange}
        />
        <DateTimePicker label="" onChange={handleStartDateChange} />
        <DateTimePicker label="" onChange={handleEndDateChange} />
      </div>
      <div className="w-full flex justify-center gap-4">
        <ButtonDefault
          label="Submit"
          onClick={handleSubmit}
          variant="primary"
          customClasses="bg-blue-500 text-white w-full"
        />
        <ButtonDefault
          label="Refresh"
          onClick={handleRefresh}
          variant="secondary"
          customClasses="bg-black text-white w-full"
        />
      </div>
    </div>
  );
};

export default AdvanceFilterUI;
