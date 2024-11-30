import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import React from "react";
import Overview from "@/components/Dashboard/Overview";
import metadataStatic from "@/utils/metadataStatic";

export const metadata: Metadata = metadataStatic;

export default function Home() {
  return (
    <>
      <DefaultLayout>
        <Overview />
      </DefaultLayout>
    </>
  );
}
