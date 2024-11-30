import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import metadataStatic from "@/utils/metadataStatic";
import AllLeads from "@/components/Pages/Leads/AllLeads";

export const metadata: Metadata = metadataStatic;

const AllLeadsPage = () => {
  return (
    <DefaultLayout>
      <div className="mx-auto max-w-7xl">
        <Breadcrumb pageName="All leads" />
        <AllLeads/>
      </div>
    </DefaultLayout>
  );
};

export default AllLeadsPage;
