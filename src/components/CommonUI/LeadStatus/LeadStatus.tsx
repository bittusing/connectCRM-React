import InputGroup from "../../FormElements/InputGroup";
import SelectGroupOne from "../../FormElements/SelectGroup/SelectGroupOne";
import { getStoredStatus } from "../../../api/commonAPI";
import { useEffect, useState } from "react";

export default function LeadStatusUI({
  handleInputChange,
  handleSelectChange = () => {},
  formData,
  defaultValue,
  statusFieldName = "status",
}: any) {
  const leadStatusList = getStoredStatus(true);
  const leadStatusListRaw = getStoredStatus();
  const lostReasonList = getStoredStatus(true);
  const [statusIds, setStatusIds] = useState({
    lostStatusId: "",
    wonStatusId: "",
  });

  const findLostWonStatusId = () => {
    const statusId = leadStatusListRaw.find((status) => status.lossStatus);
    const wonStatusId = leadStatusListRaw.find((status) => status.wonStatus);
    setStatusIds({
      lostStatusId: statusId?._id,
      wonStatusId: wonStatusId?._id,
    });
  };

  const renderHiddenField = (fieldName: any) => {
    if (fieldName === statusIds.wonStatusId) {
      return (
        <InputGroup
          label="Won amount in INR"
          name="wonAmount"
          type="number"
          value={formData.wonAmount}
          onChange={handleInputChange}
          required
        />
      );
    } else if (fieldName === statusIds.lostStatusId) {
      return (
        <SelectGroupOne
          label="Lost Reason"
          required
          options={lostReasonList}
          setSelectedOption={(value) => handleSelectChange("lostReason", value)}
        />
      );
    }
  };

  useEffect(() => {
    findLostWonStatusId();
  }, []);
  return (
    <>
      <SelectGroupOne
        label="Lead status"
        options={leadStatusList}
        // setSelectedOption={(value) => handleSelectChange(value)}
        setSelectedOption={(value) =>
          handleSelectChange(statusFieldName, value)
        }
        selectedOption={defaultValue}
      />
      {renderHiddenField(formData?.status)}
    </>
  );
}
