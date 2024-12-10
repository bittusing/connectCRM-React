import InputGroup from "../../FormElements/InputGroup";
import SelectGroupOne from "../../FormElements/SelectGroup/SelectGroupOne";
import {
  leadStatus,
  lostReasonOptions,
} from "../../../utils/Constants/UsefullJSON";
import { getStoredStatus } from "../../../api/commonAPI";

export default function LeadStatusUI({
  handleInputChange,
  handleSelectChange=()=>{},
  formData,
  defaultValue,
}: any) {
  const leadStatusList = getStoredStatus(true);
  const lostReasonList = getStoredStatus(true);
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
        options={leadStatusList}
        // setSelectedOption={(value) => handleSelectChange(value)}
        setSelectedOption={(value) => handleSelectChange("status", value)}
        selectedOption={defaultValue}
      />
      {renderHiddenField(formData?.status)}
    </>
  );
}
