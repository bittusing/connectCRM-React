import InputGroup from "../../components/FormElements/InputGroup";
import SelectGroupOne from "../../components/FormElements/SelectGroup/SelectGroupOne";

export default function AdditionalLeadDetails() {
  return (
    <div className="flex w-full flex-col gap-4.5 xl:flex-row">
      <div className=" flex w-full flex-col justify-between gap-3.5 xl:w-1/2">
        <div className="w-full">
          <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
            Full address
          </label>
          <textarea
            rows={5}
            placeholder="Enter lead's full address"
            className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5 py-3 text-dark outline-none transition placeholder:text-dark-6 focus:border-primary active:border-primary disabled:cursor-default dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
          ></textarea>
        </div>

        <SelectGroupOne
          label={"Country"}
          options={[
            {
              label: "UK",
              value: "UK",
            },
            {
              label: "United States",
              value: "United States",
            },
            {
              label: "Canada",
              value: "Canada",
            },
          ]}
        />
        <SelectGroupOne
          label={"State"}
          options={[
            {
              label: "England",
              value: "England",
            },
            {
              label: "California",
              value: "California",
            },
            {
              label: "Texas",
              value: "Texas",
            },
            {
              label: "Florida",
              value: "Florida",
            },
          ]}
        />

        <InputGroup name="City" label="City" type="text" placeholder="Enter lead's City" />
      </div>
      <div className="flex w-full flex-col justify-between gap-3.5 xl:w-1/2">
        <InputGroup
          label="Website"
          type="text"
          name="Website"
          placeholder="Enter lead's website URL"
        />
        <InputGroup
          label="Company name"
          type="text"
          name="CompanyName"
          placeholder="Enter lead's company name"
        />
        <InputGroup
          label="Lead cost"
          type="email"
          name="LeadCost"
          placeholder="Enter lead acquisition cost "
        />
        <InputGroup
          label="Alternate phone"
          type="tel"
          name="AlternatePhone"
          placeholder="Enter lead's alternate phone"
        />
        <InputGroup
          label="Pin Code"
          name="PinCode"
          type="number"
          placeholder="Enter lead's pin code"
        />
      </div>
    </div>
  );
}
