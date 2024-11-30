import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import metadataStatic from "@/utils/metadataStatic";
import ApiIntegeration from "@/components/Pages/ApiIntegeration/ApiIntegeration";

export const metadata: Metadata = metadataStatic;

const ApiIntegerationPage = () => {
  return (
    <DefaultLayout>
      <div className="mx-auto max-w-7xl">
        <Breadcrumb pageName="Api integeration" />
        <ApiIntegeration/>
      </div>
    </DefaultLayout>
  );
};

export default ApiIntegerationPage;
