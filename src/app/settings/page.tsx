import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import metadataStatic from "@/utils/metadataStatic";
import Settings from "@/components/Pages/Settings/Settings";

export const metadata: Metadata = metadataStatic;

const SettingsPage = () => {
  return (
    <DefaultLayout>
      <div className="mx-auto max-w-7xl">
        <Breadcrumb pageName="Settings" />
        <Settings />{" "}
      </div>
    </DefaultLayout>
  );
};

export default SettingsPage;
