import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import metadataStatic from "@/utils/metadataStatic";
import dynamic from 'next/dynamic'
import EmployeeReport from "@/components/Pages/CallManage/EmployeeReport";

const AddLeads = dynamic(() => import('@/components/Pages/Leads/AddLeads'), { ssr: false })
export const metadata: Metadata = metadataStatic;

const EmployeeReportPage = () => {
  return (
    <DefaultLayout>
      <div className="mx-auto max-w-7xl">
        <Breadcrumb pageName="Employee report" />
        <EmployeeReport/>
      </div>
    </DefaultLayout>
  );
};

export default EmployeeReportPage;
