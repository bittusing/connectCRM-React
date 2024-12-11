import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import ButtonDefault from "../../../components/Buttons/ButtonDefault";
import InputGroup from "../../../components/FormElements/InputGroup";
import SelectGroupOne from "../../../components/FormElements/SelectGroup/SelectGroupOne";
import { API } from "../../../api";
import { getStoredCountries } from "../../../api/commonAPI";

interface FormData {
  companyName: string;
  companyAddress: string;
  contactPerson: string;
  pincode: string;
  emailId: string;
  city: string;
  contactNo: string;
  state: string;
  websiteName: string;
  country: string;
  companyPanNo: string;
  companyGstNo: string;
}

interface StateOption {
  value: string;
  label: string;
}

const GeneralSetting: React.FC = () => {
  const countryOptions = getStoredCountries(true);
  const [stateOptions, setStateOptions] = useState<StateOption[]>([]);
  const [isLoadingStates, setIsLoadingStates] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    companyName: "Itinfo Technologies Pvt Ltd",
    companyAddress: "VR-1, City Centre, SCO 83,",
    contactPerson: "Anurag Katoch",
    pincode: "122001",
    emailId: "anurag.katoch@gmail.com",
    city: "Gurugram",
    contactNo: "9876394628",
    state: "HR",
    websiteName: "www.itinfotechnologies.com",
    country: "IN",
    companyPanNo: "",
    companyGstNo: "",
  });

  const fetchStates = async (countryCode: string) => {
    try {
      setIsLoadingStates(true);
      const response = await API.getAuthAPI(
        `locations/states/${countryCode}`,
        true
      );

      if (response.error) throw new Error(response.error);

      const states = response.data.map(
        (state: { name: string; _id: string }) => ({
          value: state._id,
          label: state.name,
        })
      );

      setStateOptions(states);
    } catch (error: any) {
      toast.error(error.message || "Failed to fetch states");
      setStateOptions([]);
    } finally {
      setIsLoadingStates(false);
    }
  };

  useEffect(() => {
    if (formData.country) {
      fetchStates(formData.country);
    }
  }, [formData.country]);

  const validateForm = () => {
    const errors: string[] = [];

    if (!formData.companyName.trim()) errors.push("Company name is required");
    if (!formData.companyAddress.trim())
      errors.push("Company address is required");
    if (!formData.contactPerson.trim())
      errors.push("Contact person is required");
    if (!formData.emailId.trim()) errors.push("Email is required");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.emailId)) {
      errors.push("Please enter a valid email address");
    }
    if (!formData.contactNo.trim()) errors.push("Contact number is required");
    if (!/^\d{10}$/.test(formData.contactNo)) {
      errors.push("Contact number must be 10 digits");
    }
    if (!formData.pincode.trim()) errors.push("Pincode is required");
    if (!/^\d{6}$/.test(formData.pincode)) {
      errors.push("Pincode must be 6 digits");
    }
    if (
      formData.companyPanNo &&
      !/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(formData.companyPanNo)
    ) {
      errors.push("Please enter a valid PAN number");
    }
    if (
      formData.companyGstNo &&
      !/^\d{2}[A-Z]{5}\d{4}[A-Z]{1}\d[Z]{1}[A-Z\d]{1}$/.test(
        formData.companyGstNo
      )
    ) {
      errors.push("Please enter a valid GST number");
    }

    if (errors.length > 0) {
      errors.forEach((error) => toast.error(error));
      return false;
    }
    return true;
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "country" ? { state: "" } : {}),
    }));
  };

  const handleSubmit = async () => {
    try {
      if (!validateForm()) return;

      setIsSubmitting(true);
      // Add your API call here
      console.log("Submitting company information:", formData);
      toast.success("Settings updated successfully");
    } catch (error: any) {
      toast.error(error.message || "Failed to update settings");
    } finally {
      setIsSubmitting(false);
    }
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
          required
        />
        <InputGroup
          label="Company Address"
          name="companyAddress"
          type="text"
          value={formData.companyAddress}
          onChange={handleInputChange}
          required
        />
        <InputGroup
          label="Contact Person"
          name="contactPerson"
          type="text"
          value={formData.contactPerson}
          onChange={handleInputChange}
          required
        />
        <InputGroup
          label="Pincode"
          name="pincode"
          type="text"
          value={formData.pincode}
          onChange={handleInputChange}
          maxLength={6}
          pattern="\d*"
          required
        />
        <InputGroup
          label="Email ID"
          name="emailId"
          type="email"
          value={formData.emailId}
          onChange={handleInputChange}
          required
        />
        <InputGroup
          label="City"
          name="city"
          type="text"
          value={formData.city}
          onChange={handleInputChange}
          required
        />
        <SelectGroupOne
          label="Country"
          options={countryOptions}
          selectedOption={formData.country}
          setSelectedOption={(value) => handleSelectChange("country", value)}
          required
        />
        <SelectGroupOne
          label="State"
          options={stateOptions}
          selectedOption={formData.state}
          setSelectedOption={(value) => handleSelectChange("state", value)}
          required
          // isLoading={isLoadingStates}
        />
        <InputGroup
          label="Contact No."
          name="contactNo"
          type="tel"
          value={formData.contactNo}
          onChange={handleInputChange}
          maxLength={10}
          pattern="\d*"
          required
        />
        <InputGroup
          label="Website Name"
          name="websiteName"
          type="text"
          value={formData.websiteName}
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
          label={isSubmitting ? "Updating..." : "Submit"}
          onClick={handleSubmit}
          variant="primary"
          customClasses="bg-black text-white px-8 py-2"
          disabled={isSubmitting}
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
