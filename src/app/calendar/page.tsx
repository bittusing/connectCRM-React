import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
// import CalendarBox from "@/components/CalenderBox";
import CalendarBox from "@/components/CalenderBox/CalenderBox";

import metadataStatic from "@/utils/metadataStatic";

export const metadata: Metadata = metadataStatic;

const CalendarPage = () => {
  return (
    <DefaultLayout>
      <div className="mx-auto max-w-7xl">
        <Breadcrumb pageName="Calendar" />
         <CalendarBox />
      </div>
    </DefaultLayout>
  );
};

export default CalendarPage;
