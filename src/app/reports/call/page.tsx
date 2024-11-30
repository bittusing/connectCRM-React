import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import metadataStatic from "@/utils/metadataStatic";
import CallReport from "@/components/Pages/Reports/CallReport";
export const metadata: Metadata = metadataStatic;

const CallReportPage = () => {
  return (
    <DefaultLayout>
      <div className="mx-auto max-w-7xl">
        <Breadcrumb pageName="Call report" />
        <CallReport />{" "}
      </div>
    </DefaultLayout>
  );
};

export default CallReportPage;
