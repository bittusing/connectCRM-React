import { EMPLOYEE_PERFORMANCE } from "../../types/employeePerformance";
import DefaultSelectOption from "../SelectOption/DefaultSelectOption";

const employeeData: EMPLOYEE_PERFORMANCE[] = [
  {
    avatar: "/images/user/user-01.png",
    name: "Devid Heilo",
    callDuration: "3h 50m 4s",
    revenues: "5,768",
    closeDeals: 5,
    openDeals: 10,
    failDeals: 3,
    conversion: 50,
    assignedLeads: 20,
    active: true,
  },
  {
    avatar: "/images/user/user-06.png",
    name: "Jubin Jack",
    callDuration: "1h 50m 4s",
    revenues: "3,768",
    closeDeals: 2,
    openDeals: 7,
    failDeals: 6,
    conversion: 25.679,
    assignedLeads: 22,
    active: true,
  },
  {
    avatar: "/images/user/user-04.png",
    name: "Wilium Smith",
    callDuration: "2h 50m 4s",
    revenues: "3,768",
    closeDeals: 3,
    openDeals: 8,
    failDeals: 5,
    conversion: 33.333,
    assignedLeads: 25,
    active: true,
  },
  {
    avatar: "/images/user/user-05.png",
    name: "Henry Deco",
    callDuration: "6h 2m 4s",
    revenues: "9,768",
    closeDeals: 8,
    openDeals: 15,
    failDeals: 3,
    conversion: 80.456,
    assignedLeads: 30,
    active: false,
  },
  {
    avatar: "/images/user/user-02.png",
    name: "Leonard Thompson",
    callDuration: "4h 50m 4s",
    revenues: "7,768",
    closeDeals: 6,
    openDeals: 12,
    failDeals: 4,
    assignedLeads: 28,
    conversion: 70.707,
    active: null,
  },
];

const EmployeePerformance = () => {
  const getConversionColor = (conversionRate: number): string => {
    if (conversionRate < 30) {
      return "text-red";
    } else if (conversionRate >= 30 && conversionRate < 65) {
      return "text-orange";
    } else {
      return "text-green";
    }
  };

  return (
    <div className="rounded-lg bg-white px-4 pb-4 pt-5 shadow-1 dark:bg-gray-dark dark:shadow-card sm:px-7.5 sm:pt-7.5">
      {/* Header */}
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h4 className="text-xl font-bold text-dark dark:text-white sm:text-body-2xlg">
          Employee performance
        </h4>
        <div className="flex items-center gap-2.5">
          <p className="text-sm font-medium uppercase text-dark dark:text-dark-6 sm:text-base">
            Short by:
          </p>
          <DefaultSelectOption options={["Monthly", "Yearly"]} />
        </div>
      </div>

      {/* Employee Cards - Mobile View */}
      <div className="block sm:hidden">
        {employeeData?.map((employee, key) => (
          <div
            key={key}
            className={`p-4 ${
              key === employeeData.length - 1
                ? ""
                : "border-b border-stroke dark:border-dark-3"
            }`}
          >
            {/* Employee Header */}
            <div className="mb-3 flex items-center gap-3">
              <div className="relative flex-shrink-0">
                <img
                  src={employee.avatar}
                  alt={employee.name}
                  width={48}
                  height={48}
                />
                <span
                  className={`absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full border-2 border-white dark:border-dark-2 ${
                    employee.active === true
                      ? "bg-green"
                      : employee.active === false
                        ? `bg-red-light`
                        : "bg-orange-light"
                  }`}
                ></span>
              </div>
              <p className="font-medium text-dark dark:text-white">
                {employee.name}
              </p>
            </div>

            {/* Employee Stats Grid */}
            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col">
                <span className="text-xs uppercase text-gray-500">
                  Assigned leads
                </span>
                <span className="font-medium text-dark dark:text-white">
                  {employee.assignedLeads}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs uppercase text-gray-500">
                  Call Duration
                </span>
                <span className="font-medium text-dark dark:text-white">
                  {employee.callDuration}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs uppercase text-gray-500">Closed</span>
                <span className="font-medium text-dark dark:text-white">
                  {employee.closeDeals}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs uppercase text-gray-500">Open</span>
                <span className="font-medium text-dark dark:text-white">
                  {employee.openDeals}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs uppercase text-gray-500">Failed</span>
                <span className="font-medium text-dark dark:text-white">
                  {employee.failDeals}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs uppercase text-gray-500">Revenue</span>
                <span className="font-medium text-green-light-1">
                  ${employee.revenues}
                </span>
              </div>
              <div className="col-span-2 flex flex-col">
                <span className="text-xs uppercase text-gray-500">
                  Conversion
                </span>
                <span
                  className={`font-medium ${getConversionColor(employee.conversion)}`}
                >
                  {employee.conversion?.toFixed(2)}%
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop Table View */}
      <div className="hidden sm:block">
        <div className="grid grid-cols-9">
          <div className="col-span-2 px-2 pb-3.5 text-center">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Agent
            </h5>
          </div>
          <div className="px-2 pb-3.5 text-center">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Assigned leads
            </h5>
          </div>
          <div className="px-2 pb-3.5 text-center">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Call Duration
            </h5>
          </div>
          <div className="px-2 pb-3.5 text-center">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Closed
            </h5>
          </div>
          <div className="px-2 pb-3.5 text-center">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Open
            </h5>
          </div>
          <div className="px-2 pb-3.5 text-center">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Failed
            </h5>
          </div>
          <div className="px-2 pb-3.5 text-center">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Revenue
            </h5>
          </div>
          <div className="px-2 pb-3.5 text-center">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Conversion
            </h5>
          </div>
        </div>

        {employeeData?.map((employee, key) => (
          <div
            className={`grid grid-cols-9 ${
              key === employeeData.length - 1
                ? ""
                : "border-b border-stroke dark:border-dark-3"
            }`}
            key={key}
          >
            <div className="col-span-2 flex items-center gap-3.5 px-2 py-4">
              <div className="relative flex-shrink-0">
                <img
                  src={employee.avatar}
                  alt={employee.name}
                  width={48}
                  height={48}
                />
                <span
                  className={`absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full border-2 border-white dark:border-dark-2 ${
                    employee.active === true
                      ? "bg-green"
                      : employee.active === false
                        ? `bg-red-light`
                        : "bg-orange-light"
                  }`}
                ></span>
              </div>
              <p className="font-medium text-dark dark:text-white">
                {employee.name}
              </p>
            </div>

            <div className="flex items-center justify-center px-2 py-4">
              <p className="font-medium text-dark dark:text-white">
                {employee.assignedLeads}
              </p>
            </div>
            <div className="flex items-center justify-center px-2 py-4">
              <p className="font-medium text-dark dark:text-white">
                {employee.callDuration}
              </p>
            </div>
            <div className="flex items-center justify-center px-2 py-4">
              <p className="font-medium text-dark dark:text-white">
                {employee.closeDeals}
              </p>
            </div>
            <div className="flex items-center justify-center px-2 py-4">
              <p className="font-medium text-dark dark:text-white">
                {employee.openDeals}
              </p>
            </div>
            <div className="flex items-center justify-center px-2 py-4">
              <p className="font-medium text-dark dark:text-white">
                {employee.failDeals}
              </p>
            </div>
            <div className="flex items-center justify-center px-2 py-4">
              <p className="font-medium text-green-light-1">
                ${employee.revenues}
              </p>
            </div>
            <div className="flex items-center justify-center px-2 py-4">
              <p
                className={`font-medium ${getConversionColor(employee.conversion)}`}
              >
                {employee.conversion?.toFixed(2)}%
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmployeePerformance;
