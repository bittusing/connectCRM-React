import { Metadata } from "next";
import React from "react";
import LeadAction from "@/components/Pages/Leads/LeadAction";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import metadataStatic from "@/utils/metadataStatic";

export const metadata: Metadata = metadataStatic;

const LeadActionPage = () => {

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Lead action" />
      <LeadAction />
    </DefaultLayout>
  );
};

export default LeadActionPage;
