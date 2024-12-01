import { useState } from "react";
import SelectGroupOne from "../../components/FormElements/SelectGroup/SelectGroupOne";
import DateTimePicker from "../../components/FormElements/DatePicker/DateTimePicker";
import ButtonDefault from "../../components/Buttons/ButtonDefault";
import CallDetails from "../CallManage/components/CallDetails";

export default function CallReport() {
  const [employee, setEmployee] = useState("Admin");
  const [fromDate, setFromDate] = useState("01/05/2024");
  const [toDate, setToDate] = useState("17/10/2024");

  const handleEmployeeChange = (value: string) => {
    setEmployee(value);
  };

  const handleFromDateChange = (_selectedDates: Date[], dateStr: string) => {
    setFromDate(dateStr);
  };

  const handleToDateChange = (_selectedDates: Date[], dateStr: string) => {
    setToDate(dateStr);
  };

  const handleApply = () => {
    console.log("Applying filters:", { employee, fromDate, toDate });
    // Implement filter logic here
  };
  return (
    <div className="rounded-lg bg-white p-6 shadow-md dark:bg-gray-800">
      {/* <h2 className="mb-6 text-2xl font-semibold text-dark dark:text-white">
        Call Reports
      </h2> */}

      <div className="mb-6 flex flex-wrap items-end gap-4">
        <div className="w-full lg:w-1/4">
          <SelectGroupOne
            label="Select Employee"
            options={[{ value: "Admin", label: "Admin" }]}
            setSelectedOption={handleEmployeeChange}
          />
        </div>
        <div className="w-full lg:w-1/4">
          <DateTimePicker label="From Date" onChange={handleFromDateChange} />
        </div>
        <div className="w-full lg:w-1/4">
          <DateTimePicker label="To Date" onChange={handleToDateChange} />
        </div>
        <ButtonDefault
          label="Apply"
          onClick={handleApply}
          customClasses="min-w-[130px]"
        />
      </div>

      <CallDetails />
    </div>
  );
}
