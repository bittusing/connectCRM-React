import React from "react";
import InputGroup from "../../FormElements/InputGroup";
import SelectGroupOne from "../../FormElements/SelectGroup/SelectGroupOne";
import { leadStatus, lostReasonOptions } from "../../../utils/Constants/UsefullJSON";

export default function LeadStatusUI({
  handleInputChange,
  handleSelectChange,
  formData,
}: any) {
  const renderHiddenField = (fieldName: string) => {
    switch (fieldName) {
      case "Won":
        return (
          <InputGroup
            label="Won amount"
            name="wonAmount"
            type="number"
            value={formData.wonAmount}
            onChange={handleInputChange}
            required
          />
        );
      case "Lost":
        return (
          <SelectGroupOne
            label="Lost Reason"
            required
            options={lostReasonOptions}
            setSelectedOption={(value) =>
              handleSelectChange("lostReason", value)
            }
          />
        );
      default:
        return null;
    }
  };
  return (
    <>
      <SelectGroupOne
        label="Lead status"
        options={leadStatus}
        setSelectedOption={(value) => handleSelectChange("status", value)}
      />
      {renderHiddenField(formData?.status)}
    </>
  );
}
