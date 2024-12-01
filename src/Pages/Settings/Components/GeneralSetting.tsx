import React, { useState } from "react";
import ButtonDefault from "../../../components/Buttons/ButtonDefault";
import InputGroup from "../../../components/FormElements/InputGroup";

const GeneralSetting: React.FC = () => {
  const [formData, setFormData] = useState({
    companyName: "Itinfo Technologies Pvt Ltd",
    companyAddress: "VR-1, City Centre, SCO 83,",
    contactPerson: "Anurag Katoch",
    pincode: "122001",
    emailId: "anurag.katoch@gmail.com",
    city: "Gurugram",
    contactNo: "9876394628",
    state: "Haryana",
    websiteName: "www.itinfotechnologies.com",
    country: "India",
    companyPanNo: "",
    companyGstNo: "",
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

  const handleSubmit = () => {
    console.log("Submitting company information:", formData);
    // Implement your submit logic here
  };

  return (
    <div className="mx-auto max-w-6xl rounded-lg">
      <div className="grid grid-cols-2 gap-6">
        <InputGroup
          label="Company Name"
          name="companyName"
          type="text"
          value={formData.companyName}
          onChange={handleInputChange}
        />
        <InputGroup
          label="Company Address"
          name="companyAddress"
          type="text"
          value={formData.companyAddress}
          onChange={handleInputChange}
        />
        <InputGroup
          label="Contact Person"
          name="contactPerson"
          type="text"
          value={formData.contactPerson}
          onChange={handleInputChange}
        />
        <InputGroup
          label="Pincode"
          name="pincode"
          type="text"
          value={formData.pincode}
          onChange={handleInputChange}
        />
        <InputGroup
          label="Email ID"
          name="emailId"
          type="email"
          value={formData.emailId}
          onChange={handleInputChange}
        />
        <InputGroup
          label="City"
          name="city"
          type="text"
          value={formData.city}
          onChange={handleInputChange}
        />
        <InputGroup
          label="Contact No."
          name="contactNo"
          type="tel"
          value={formData.contactNo}
          onChange={handleInputChange}
        />
        <InputGroup
          label="State"
          name="state"
          type="text"
          value={formData.state}
          onChange={handleInputChange}
        />
        <InputGroup
          label="Website Name"
          name="websiteName"
          type="text"
          value={formData.websiteName}
          onChange={handleInputChange}
        />
        <InputGroup
          label="Country"
          name="country"
          type="text"
          value={formData.country}
          onChange={handleInputChange}
        />
        <InputGroup
          label="Company PAN No."
          name="companyPanNo"
          type="text"
          placeholder="PAN Number"
          value={formData.companyPanNo}
          onChange={handleInputChange}
        />
        <InputGroup
          label="Company GST NO"
          name="companyGstNo"
          type="text"
          placeholder="Company GST NO"
          value={formData.companyGstNo}
          onChange={handleInputChange}
        />
      </div>

      <div className="mt-6 flex justify-end">
        <ButtonDefault
          label="Submit"
          onClick={handleSubmit}
          variant="primary"
          customClasses="bg-black text-white px-8 py-2"
        />
      </div>

      <style>{`
        .dark .ant-input {
          background-color: #374151;
          border-color: #4b5563;
          color: #e5e7eb;
        }
        .dark .ant-input::placeholder {
          color: #9ca3af;
        }
        .dark .ant-input:focus {
          border-color: #60a5fa;
          box-shadow: 0 0 0 2px rgba(96, 165, 250, 0.2);
        }
      `}</style>
    </div>
  );
};

export default GeneralSetting;
