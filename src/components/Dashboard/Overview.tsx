import {
  FaUserSecret,
  FaUserPlus,
  FaUsers,
  FaCalendarCheck,
  FaBriefcase,
} from "react-icons/fa";
import { FaHandshake, FaMoneyBill1Wave } from "react-icons/fa6";
import { MdEventRepeat } from "react-icons/md";
import { HiTrendingUp, HiTrendingDown } from "react-icons/hi";

// import ChartOne from "@/components/Charts/ChartOne";
// import DataStatsOne from "@/components/DataStats/DataStatsOne";
// import StatusStats from "@/components/StatusStats/StatusStats";

import { dataStats } from "../../types/dataStats";
import { statusStatsType } from "../../types/statusStats";
import { targetStatsType } from "../../types/targetStats";
import DonutCharts from "../Charts/DonutChart";
import ChartTwo from "../Charts/ChartTwo";
// import ChatCard from "../Chat/ChatCard";
// import TableOne from "../Tables/TableOne";
// import MapOne from "../Maps/MapOne";
import DollarIcon from "../Assets/Icons/DashBoardIcons/DollarIcon";
import TargetStats from "../TargetStats/TargetStats";
import EmployeePerformance from "../Tables/EmployeePerformance";
import CalendarBox from "../CalenderBox/CalenderBox";
import ChartOne from "../Charts/ChartOne";
import DataStatsOne from "../DataStats/DataStatsOne";
import StatusStats from "../StatusStats/StatusStats";

const StatusStatsData: statusStatsType[] = [
  {
    icon: <FaHandshake />,
    color: "#3FD97F",
    title: "Meeting",
    value: 4,
    nextValue: 1,
    growthRate: 0.43,
  },
  {
    icon: <FaBriefcase />,
    color: "#18BFFF",
    title: "Visits",
    value: 3,
    nextValue: 2,
    growthRate: -0.95,
  },
  {
    icon: <MdEventRepeat />,
    color: "#FF9C55",
    title: "Re-Visits",
    value: 4,
    nextValue: 2,
    growthRate: 4.35,
  },
  {
    icon: <FaCalendarCheck />,
    color: "#8155FF",
    title: "Schedule visit",
    value: 5,
    nextValue: 10,
    growthRate: 2.59,
  },
];
const totalStats: dataStats[] = [
  {
    icon: <FaUsers />,
    color: "#3FD97F",
    title: "All Leads",
    value: "3.456K",
    growthRate: 0.43,
  },
  {
    icon: <FaUserPlus />,
    color: "#18BFFF",
    title: "Total Follow Up Leads",
    value: "3.465",
    growthRate: -0.95,
  },
  {
    icon: <DollarIcon />,
    color: "#FF9C55",
    title: "Total Profit",
    value: "$42.2K",
    growthRate: 4.35,
  },
  {
    icon: <FaUserSecret />,
    color: "#8155FF",
    title: "Total Agents",
    value: "2.450",
    growthRate: 2.59,
  },
];
const targetStatsData: targetStatsType[] = [
  {
    icon: <HiTrendingUp />,
    color: "#3FD97F",
    title: "Yearly Sales",
    value: "3.456K",
    salesValue: 45,
    growthRate: 0.43,
    positiveSentiment: true,
    targetSalesValue: 60,
  },
  {
    icon: <FaMoneyBill1Wave />,
    color: "#18BFFF",
    title: "Monthly Sales",
    value: "3.465",
    salesValue: 2,
    growthRate: -0.95,
    positiveSentiment: true,
    targetSalesValue: 5,
  },
  {
    icon: <HiTrendingDown />,
    color: "#FF9C55",
    title: "Miss Opportunity",
    value: "$42.2K",
    salesValue: 15,
    growthRate: 4.35,
    positiveSentiment: false,
    targetSalesValue: 18,
  },
];

const Overview: React.FC = () => {
  return (
    <>
      <div className="flex flex-col gap-4">
        <DataStatsOne dataList={totalStats} />
        <StatusStats dataList={StatusStatsData} />
        <TargetStats dataList={targetStatsData} />
      </div>

      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-9 2xl:gap-7.5">
        <ChartOne />
        <ChartTwo />
        <DonutCharts />
        <div className="col-span-12 xl:col-span-7">
          <CalendarBox />
        </div>
        <div className="col-span-12 xl:col-span-12">
          <EmployeePerformance />
        </div>
        {/* <ChatCard />
        <MapOne /> */}
      </div>
    </>
  );
};

export default Overview;
