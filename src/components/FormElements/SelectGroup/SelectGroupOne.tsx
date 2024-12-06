import { useEffect, useState } from "react";

interface Option {
  value: string | number;
  label: string;
}

interface OptionGroup {
  label: string;
  options: Option[];
}

interface SelectProps {
  customClasses?: string;
  wrapperClasses?: string;
  label?: string;
  required?: boolean;
  disabled?: boolean;
  options: (Option | OptionGroup)[];
  setSelectedOption?: (value: string) => void;
  selectedOption?: string;
  placeholder?: string;
  isGrouped?: boolean;
}

const SelectGroupOne = ({
  customClasses,
  wrapperClasses,
  label,
  required,
  disabled,
  options,
  setSelectedOption = () => {},
  selectedOption = "",
  placeholder = "",
  isGrouped = false,
}: SelectProps) => {
  const [selectedOptionLocal, setSelectedOptionLocal] = useState<string>(selectedOption);
  const [isOptionSelected, setIsOptionSelected] = useState<boolean>(false);

  const changeTextColor = () => {
    setIsOptionSelected(true);
  };

  useEffect(() => {
    setSelectedOption(selectedOptionLocal);
  }, [selectedOptionLocal]);

  // Helper function to check if an option is a group
  const isOptionGroup = (option: Option | OptionGroup): option is OptionGroup => {
    return 'options' in option;
  };  

  return (
    <div className={`w-full ${wrapperClasses}`}>
      {label && (
        <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
          {label}
          {required && <span className="text-red"> *</span>}
        </label>
      )}

      <div className="relative z-20 bg-transparent dark:bg-dark-2">
        <select
          value={selectedOptionLocal}
          required={required}
          disabled={disabled}
          onChange={(e) => {
            setSelectedOptionLocal(e.target.value);
            changeTextColor();
          }}
          className={`relative z-20 w-full appearance-none rounded-[7px] border border-stroke bg-transparent px-5.5 py-3 outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 dark:border-dark-3 dark:bg-dark-2 dark:focus:border-primary dark:disabled:bg-dark ${
            isOptionSelected ? "text-dark dark:text-white" : "text-gray-5"
          } ${customClasses}`}
        >
          {placeholder && (
            <option value="" disabled hidden>
              {placeholder}
            </option>
          )}
          
          {isGrouped ? (
            // Render grouped options
            options.map((group, groupIndex) => {
              if (isOptionGroup(group)) {
                return (
                  <optgroup 
                    key={`group-${groupIndex}`} 
                    label={group.label}
                    className="font-medium bg-gray-100 dark:bg-dark-3"
                  >
                    {group.options.map((option) => (
                      <option
                        key={option.value}
                        value={option.value}
                        className="bg-white dark:bg-dark-2 py-2"
                      >
                        {option.label}
                      </option>
                    ))}
                  </optgroup>
                );
              }
              return null;
            })
          ) : (
            // Render flat options
            options.map((option) => {
              if (!isOptionGroup(option)) {
                return (
                  <option
                    key={option.value}
                    value={option.value}
                    className="py-2"
                  >
                    {option.label}
                  </option>
                );
              }
              return null;
            })
          )}
        </select>

        <span className="absolute right-4 top-1/2 z-30 -translate-y-1/2">
          <svg
            className="fill-current"
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8.99922 12.8249C8.83047 12.8249 8.68984 12.7687 8.54922 12.6562L2.08047 6.2999C1.82734 6.04678 1.82734 5.65303 2.08047 5.3999C2.33359 5.14678 2.72734 5.14678 2.98047 5.3999L8.99922 11.278L15.018 5.34365C15.2711 5.09053 15.6648 5.09053 15.918 5.34365C16.1711 5.59678 16.1711 5.99053 15.918 6.24365L9.44922 12.5999C9.30859 12.7405 9.16797 12.8249 8.99922 12.8249Z"
              fill=""
            />
          </svg>
        </span>
      </div>
    </div>
  );
};

export default SelectGroupOne;