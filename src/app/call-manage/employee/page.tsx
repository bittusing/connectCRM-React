import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import metadataStatic from "@/utils/metadataStatic";
import EmployeeList from "@/components/Pages/CallManage/EmployeeList";

export const metadata: Metadata = metadataStatic;

const EmployeeListPage = () => {
  return (
    <DefaultLayout>
      <div className="mx-auto max-w-7xl">
        <Breadcrumb pageName="Employee List" />
        <EmployeeList />
      </div>
    </DefaultLayout>
  );
};

export default EmployeeListPage;
