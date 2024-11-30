import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import metadataStatic from "@/utils/metadataStatic";
import ImportLeads from "@/components/Pages/Leads/ImportLeads";

export const metadata: Metadata = metadataStatic;

const Import = () => {
  return (
    <DefaultLayout>
      <div className="mx-auto max-w-7xl">
        <Breadcrumb pageName="Import leads" />
        <ImportLeads/>
      </div>
    </DefaultLayout>
  );
};

export default Import;
