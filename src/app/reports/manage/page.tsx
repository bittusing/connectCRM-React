import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import metadataStatic from "@/utils/metadataStatic";
import ManageReports from "@/components/Pages/Reports/ManageReports";

export const metadata: Metadata = metadataStatic;

const ManageReportPage = () => {
  return (
    <DefaultLayout>
      <div className="mx-auto max-w-7xl">
        <Breadcrumb pageName="Manage report" />
        <ManageReports />
      </div>
    </DefaultLayout>
  );
};

export default ManageReportPage;
