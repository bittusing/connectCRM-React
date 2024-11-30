import React, { useState } from "react";
import InputGroup from "@/components/FormElements/InputGroup";
import SelectGroupOne from "@/components/FormElements/SelectGroup/SelectGroupOne";
import ButtonDefault from "../../Buttons/ButtonDefault";

const countryOptions = [
  {
    value: "India",
    label: "India",
  },
  {
    value: "Thailand",
    label: "Thailand",
  },
];

// Mock options for the lead source dropdown
const stateOptions = [
  {
    value: "Haryana",
    label: "Haryana",
  },
  {
    value: "Uttar Pradesh",
    label: "Uttar Pradesh",
  },
  {
    value: "Delhi",
    label: "Delhi",
  },
  {
    value: "Maharashtra",
    label: "Maharashtra",
  },
];

const AdditionalInformation: React.FC = () => {
  const [formData, setFormData] = useState({
    country: "India",
    address: "",
    state: "Maharashtra",
    pincode: "412207",
    city: "pune",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

  const handleSubmit = () => {
    console.log("Form data:", formData);
    // Here you would typically send the data to your backend
  };
  return (
    <div className="rounded-lg bg-white dark:bg-gray-dark dark:text-white">
         <div className="flex w-full items-center border-b-2 border-solid border-gray py-2">
            <span className="w-[220px] text-lg font-medium">Address </span>
          </div>
      <div className="mb-8 flex flex-col sm:flex-row w-full justify-between gap-4 sm:gap-8">
        <div className="flex w-full flex-col gap-4 pt-3 border-r-0 pr-0 sm:border-r-2 sm:pr-8 text-dark dark:text-white">
          {/* left Fields  */}
         
          <SelectGroupOne
            label="Country"
            options={countryOptions}
            setSelectedOption={(value) => handleSelectChange("country", value)}
          />
          <InputGroup
            label="Full address"
            name="address"
            type="text"
            value={formData.address}
            onChange={handleInputChange}
          />
          <SelectGroupOne
            label="State"
            options={stateOptions}
            setSelectedOption={(value) => handleSelectChange("state", value)}
          />
        </div>
        {/* Right Fields  */}
        <div className="flex w-full flex-col pt-3 gap-4">
          <InputGroup
            label="City"
            name="city"
            type="text"
            value={formData.city}
            onChange={handleInputChange}
          />
          <InputGroup
            label="Pincode"
            name="pincode"
            type="text"
            value={formData.pincode}
            onChange={handleInputChange}
          />
        </div>
      </div>
      <div className="flex w-full justify-center ">
        <ButtonDefault
          onClick={handleSubmit}
          label="Submit"
          variant="primary"
        />
      </div>
    </div>
  );
};

export default AdditionalInformation;
