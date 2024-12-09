import React, { useEffect, useMemo, useState } from "react";
import SelectGroupOne from "../../components/FormElements/SelectGroup/SelectGroupOne";
import CallDetails from "./components/CallDetails";
import AnalysisReport from "./components/AnalysisReport";
import Summary from "./components/Summary";
import TabPanel from "../../components/TabPanel/TabPanel";
import ButtonDefault from "../../components/Buttons/ButtonDefault";
import DateTimePicker from "../../components/FormElements/DatePicker/DateTimePicker";
import { getStoredAgents } from "../../api/commonAPI";
import { API } from "../../api";
import { END_POINT } from "../../api/UrlProvider";
import { toast } from "react-toastify";
import dayjs from "dayjs";

interface CallReport {
  summary: {
    callType: Array<{
      calltype: string;
      calls: number;
      duration: string;
    }>;
    stats: {
      missCall: number;
      notConnectedCall: number;
      connectedCalls: number;
      rejected: number;
      workingHours: string;
    };
  };
  graphdata: Array<{
    key: number;
    value: number;
    svg: { fill: string };
    title: string;
  }>;
  analysis: {
    mobileCallAnalysis: {
      topCaller: {
        number: string;
        totalCalls: number;
      };
    };
    totalCallDurationAnalysis: {
      longestDuration: {
        duration: string;
        callTo: string;
        callTime: string;
      };
    };
    averageCallDurationAnalysis: {
      perCall: string;
      totalCalls: number;
      perDay: string;
      totalDays: number;
    };
  };
  employeeList: Array<{
    employeeId: string;
    userId: string;
    user: string;
    email: string;
    phone: string;
    role: string;
    highestCalls: number;
    totalDuration: string;
    averageCallDuration: string;
    callDetails: {
      incoming: number;
      outgoing: number;
      missed: number;
      rejected: number;
      unknown: number;
    };
  }>;
}

const fromDateInitial = new Date(
  new Date().setMonth(new Date().getMonth() - 1)
);

const EmployeeReport: React.FC = () => {
  const [employee, setEmployee] = useState<any[]>([]);
  const [selectedEmployee, setSelectedEmployee] = useState<{
    value: string;
    label: string;
  } | null>(null);
  const [fromDate, setFromDate] = useState(fromDateInitial?.toISOString());
  const [toDate, setToDate] = useState(new Date()?.toISOString());
  const [reportData, setReportData] = useState<CallReport | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const employeeList = useMemo(() => getStoredAgents() || [], []);

  useEffect(() => {
    if (!employeeList.length) return;
    const obj = employeeList.map((item) => ({
      value: item._id,
      label: item.name,
    }));
    setEmployee(obj);
    setSelectedEmployee(obj[0]);
    fetchReportData(true, obj[0].value);
  }, [employeeList]);

  const fetchReportData = async (
    initialRender = false,
    initialEmployee = 0
  ) => {
    try {
      setIsLoading(true);
      const payload = initialRender
        ? {
            userId: initialEmployee,
            startDate: new Date(new Date().setMonth(new Date().getMonth() - 1)),
            endDate: new Date(),
          }
        : {
            userId: selectedEmployee?.value,
            startDate: fromDate,
            endDate: toDate,
          };

      const { data, error } = await API.postAuthAPI(
        payload,
        END_POINT.EMPLOYEE_REPORT,
        true
      );

      if (error) throw new Error(error);

      setReportData(data);
    } catch (error: any) {
      toast.error(error.message || "Failed to fetch report data");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmployeeChange = (value: string) => {
    const obj: any[] = employee.filter((item) => item.value === value);
    setSelectedEmployee(obj[0]);
  };

  const handleFromDateChange = (_selectedDates: Date[], dateStr: string) => {
    setFromDate(dateStr);
  };

  const handleToDateChange = (_selectedDates: Date[], dateStr: string) => {
    setToDate(dateStr);
  };

  const handleApply = () => {
    if (!selectedEmployee) {
      toast.error("Please select an employee");
      return;
    }
    fetchReportData();
  };

  const tabsData = [
    {
      tabName: "Summary",
      component: <Summary data={reportData?.summary} isLoading={isLoading} />,
    },
    {
      tabName: "Analysis",
      component: (
        <AnalysisReport data={reportData?.analysis} isLoading={isLoading} />
      ),
    },
    {
      tabName: "Call Details",
      component: <CallDetails />,
    },
  ];

  return (
    <div className="rounded-lg bg-white p-6 shadow-md dark:bg-gray-800">
      <h2 className="text-xl text-center font-semibold text-dark dark:text-white sm:text-2xl">
        {selectedEmployee?.label}'s Report
      </h2>
      <hr className="my-4"/>
      <div className="mb-6 flex flex-wrap items-end gap-4">
        <div className="w-full lg:w-1/4">
          <SelectGroupOne
            label="Select Employee"
            placeholder="Select Employee"
            options={employee}
            selectedOption={selectedEmployee?.value}
            setSelectedOption={handleEmployeeChange}
          />
        </div>
        <div className="w-full lg:w-1/4">
          <DateTimePicker
            label="From Date"
            onChange={handleFromDateChange}
            defaultValue={fromDate}
          />
        </div>
        <div className="w-full lg:w-1/4">
          <DateTimePicker
            label="To Date"
            onChange={handleToDateChange}
            defaultValue={toDate}
          />
        </div>
        <ButtonDefault
          label={isLoading ? "Loading..." : "Apply"}
          onClick={handleApply}
          customClasses="min-w-[130px]"
          disabled={isLoading || !selectedEmployee}
        />
      </div>

      <TabPanel
        tabsData={tabsData}
        type="line"
        tabPosition="top"
        defaultActiveKey="1"
      />
    </div>
  );
};

export default EmployeeReport;
