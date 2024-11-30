import React, { useState } from "react";
import InputGroup from "@/components/FormElements/InputGroup";
import SelectGroupOne from "@/components/FormElements/SelectGroup/SelectGroupOne";
import ButtonDefault from "../../components/Buttons/ButtonDefault";

const serviceOptions = [
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
  {
    value: "Fairfox",
    label: "Fairfox",
  },
];

const AllDetailsFields: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: "dfdsf",
    emailId: "tinnting@gmail.com",
    companyName: "",
    website: "",
    service: "Fairfox",
    contactNo: "3432423424",
    alternativeNo: "",
    position: "",
    leadSource: "Just Dial",
    leadCost: "",
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

  // Mock options for the lead source dropdown
  const leadSourceOptions = [
    { value: "Just Dial", label: "Just Dial" },
    { value: "Website", label: "Website" },
    { value: "Referral", label: "Referral" },
    { value: "Other", label: "Other" },
  ];
  return (
    <div className="rounded-lg bg-white dark:bg-gray-dark dark:text-white">
      <div className="mb-8 flex flex-col sm:flex-row w-full justify-between gap-4 sm:gap-8">
        <div className="flex w-full flex-col gap-4 sm:border-r-2 sm:pr-8 border-r-0 pr-0 text-dark dark:text-white">
          {/* left Fields  */}
          <InputGroup
            label="Full Name"
            name="fullName"
            type="text"
            value={formData.fullName}
            onChange={handleInputChange}
          />
          <InputGroup
            label="Company Name"
            name="companyName"
            type="text"
            value={formData.companyName}
            onChange={handleInputChange}
          />
          <SelectGroupOne
            label="Service"
            options={serviceOptions}
            setSelectedOption={(value) => handleSelectChange("service", value)}
          />
          <InputGroup
            label="Alternative No"
            name="alternativeNo"
            type="tel"
            value={formData.alternativeNo}
            onChange={handleInputChange}
          />
          <SelectGroupOne
            label="Lead Source"
            options={leadSourceOptions}
            setSelectedOption={(value) =>
              handleSelectChange("leadSource", value)
            }
          />
        </div>
        {/* Right Fields  */}
        <div className="flex w-full flex-col gap-4">
          <InputGroup
            label="Email Id"
            name="emailId"
            type="email"
            value={formData.emailId}
            onChange={handleInputChange}
          />
          <InputGroup
            label="Website"
            name="website"
            type="text"
            value={formData.website}
            onChange={handleInputChange}
          />
          <InputGroup
            label="Contact No"
            name="contactNo"
            type="tel"
            value={formData.contactNo}
            onChange={handleInputChange}
          />
          <InputGroup
            label="Position"
            name="position"
            type="text"
            value={formData.position}
            onChange={handleInputChange}
          />
          <InputGroup
            label="Lead Cost"
            name="leadCost"
            type="text"
            value={formData.leadCost}
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

export default AllDetailsFields;
