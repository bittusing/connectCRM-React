import { useState, useEffect } from "react";
import {
  FaHandshake,
  FaBriefcase,
  FaUsers,
  FaUserPlus,
  FaUserSecret,
  FaCalendarCheck,
} from "react-icons/fa";
import { FaMoneyBill1Wave } from "react-icons/fa6";

import { MdEventRepeat } from "react-icons/md";
import { HiTrendingUp, HiTrendingDown } from "react-icons/hi";
import DonutCharts from "../Charts/DonutChart";
import ChartTwo from "../Charts/ChartTwo";
import TargetStats from "../TargetStats/TargetStats";
import EmployeePerformance from "../Tables/EmployeePerformance";
import CalendarBox from "../CalenderBox/CalenderBox";
import ChartOne from "../Charts/ChartOne";
import DataStatsOne from "../DataStats/DataStatsOne";
import StatusStats from "../StatusStats/StatusStats";
import DollarIcon from "../Assets/Icons/DashBoardIcons/DollarIcon";
import { API } from "../../api";
import { toast } from "react-toastify";
import MiniLoader from "../CommonUI/Loader/MiniLoader";
// import EmployeeCallPerformance from "../Tables/EmployeeCallPerformance";

interface DashboardMetrics {
  topMetrics: Array<{
    value: number;
    change: string;
    title: string;
    color: string;
    webroute: string;
    deeplink: string;
  }>;
  activityMetrics: Array<{
    title: string;
    color: string;
    value: number;
    currentDate: string;
    nextDate: string;
    leadStatus: string;
    route: string;
  }>;
  performanceMetrics: {
    yearlySales: {
      value: string;
      count: number;
      percentage: number;
      title: string;
      color: string;
    };
    monthlySales: {
      value: string;
      count: number;
      percentage: number;
      title: string;
      color: string;
    };
    missOpportunity: {
      value: string;
      count: number;
      percentage: number;
      title: string;
      color: string;
    };
    leadSourceOverview: {
      total: number;
      sources: Array<any>;
    };
  };
}

const Overview: React.FC = () => {
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchDashboardMetrics = async () => {
    try {
      const response = await API.getAuthAPI("dashboard/metrics", true);
      if (response.error) throw new Error(response.error);
      setMetrics(response.data);
    } catch (error: any) {
      toast.error(error.message || "Failed to fetch dashboard metrics");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardMetrics();
  }, []);

  // Transform topMetrics for DataStatsOne
  const totalStats =
    metrics?.topMetrics.map((metric) => ({
      icon: getIconForMetric(metric.title),
      color: metric.color,
      title: metric.title,
      value: metric.value.toString(),
      growthRate: parseFloat(metric.change),
    })) || [];

  // Transform activityMetrics for StatusStats
  const statusStats =
    metrics?.activityMetrics.map((metric) => ({
      icon: getIconForStatus(metric.title),
      color: metric.color,
      title: metric.title,
      value: metric.value,
      nextValue: 0, // You might want to calculate this based on your needs
      growthRate: 0, // Calculate if needed
    })) || [];

  // Transform performanceMetrics for TargetStats
  const targetStats = [
    {
      icon: <HiTrendingUp />,
      color: metrics?.performanceMetrics.yearlySales.color || "#3FD97F",
      title: metrics?.performanceMetrics.yearlySales.title || "Yearly Sales",
      value: metrics?.performanceMetrics.yearlySales.value || "0",
      salesValue: metrics?.performanceMetrics.yearlySales.count || 0,
      growthRate: metrics?.performanceMetrics.yearlySales.percentage || 0,
      positiveSentiment: true,
      targetSalesValue: 60,
    },
    {
      icon: <FaMoneyBill1Wave />,
      color: metrics?.performanceMetrics.monthlySales.color || "#18BFFF",
      title: metrics?.performanceMetrics.monthlySales.title || "Monthly Sales",
      value: metrics?.performanceMetrics.monthlySales.value || "0",
      salesValue: metrics?.performanceMetrics.monthlySales.count || 0,
      growthRate: metrics?.performanceMetrics.monthlySales.percentage || 0,
      positiveSentiment: true,
      targetSalesValue: 5,
    },
    {
      icon: <HiTrendingDown />,
      color: metrics?.performanceMetrics.missOpportunity.color || "#FF9C55",
      title:
        metrics?.performanceMetrics.missOpportunity.title || "Miss Opportunity",
      value: metrics?.performanceMetrics.missOpportunity.value || "0",
      salesValue: metrics?.performanceMetrics.missOpportunity.count || 0,
      growthRate: metrics?.performanceMetrics.missOpportunity.percentage || 0,
      positiveSentiment: false,
      targetSalesValue: 18,
    },
  ];

  if (loading) {
    return <MiniLoader />;
  }

  return (
    <>
      <div className="flex flex-col gap-4">
        <DataStatsOne dataList={totalStats} />
        <StatusStats dataList={statusStats} />
        <TargetStats dataList={targetStats} />
      </div>

      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-9 2xl:gap-7.5">
        <ChartOne />
        <ChartTwo />
        <DonutCharts />
        <div className="col-span-12 xl:col-span-7">
          <CalendarBox widgetModeOn />
        </div>
        <div className="col-span-12 xl:col-span-12">
          <EmployeePerformance />
        </div>
        {/* <div className="col-span-12 xl:col-span-12">
          <EmployeeCallPerformance />
        </div> */}
      </div>
    </>
  );
};

// Helper function to get appropriate icon based on metric title
const getIconForMetric = (title: string) => {
  switch (title) {
    case "All Leads":
      return <FaUsers />;
    case "All Followup Leads":
      return <FaUserPlus />;
    case "All Imported Leads":
      return <DollarIcon />;
    case "All Outsource Leads":
      return <FaUserSecret />;
    default:
      return <FaUsers />;
  }
};

// Helper function to get appropriate icon based on status title
const getIconForStatus = (title: string) => {
  switch (title) {
    case "Call Back":
      return <FaHandshake />;
    case "Meeting":
      return <FaBriefcase />;
    case "Visit":
      return <MdEventRepeat />;
    case "Re-Visit":
      return <FaCalendarCheck />;
    default:
      return <FaHandshake />;
  }
};

export default Overview;
