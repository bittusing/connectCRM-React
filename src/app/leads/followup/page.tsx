import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import metadataStatic from "@/utils/metadataStatic";
import FollowupLeads from "@/components/Pages/Leads/FollowupLeads";

export const metadata: Metadata = metadataStatic;

const FollowupLeadsPage = () => {
  return (
    <DefaultLayout>
      <div className="mx-auto max-w-7xl">
        <Breadcrumb pageName="Follow-Up leads" />
        <FollowupLeads/>
     </div>
    </DefaultLayout>
  );
};

export default FollowupLeadsPage;
