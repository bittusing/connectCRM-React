import React from "react";

interface InputGroupProps {
  customClasses?: string;
  label?: string;
  name?: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  value?: string | number;
  readOnly?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputGroup: React.FC<InputGroupProps> = ({
  customClasses,
  label,
  name,
  type,
  placeholder,
  disabled = false,
  required,
  value,
  onChange,
  readOnly = false,
}) => {
  return (
    <>
      <div className={customClasses}>
        {label && (
          <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
            {label}
            {required && <span className="text-red"> *</span>}
          </label>
        )}
        <input
          type={type}
          id={name}
          name={name}
          disabled={disabled}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
          readOnly={readOnly}
          className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition placeholder:text-dark-6 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary dark:disabled:bg-dark"
        />
      </div>
    </>
  );
};

export default InputGroup;
