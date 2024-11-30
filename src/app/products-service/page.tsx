import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import metadataStatic from "@/utils/metadataStatic";
import ProductAndServiceDash from "@/components/Pages/ProductAndServices/ProductAndServiceDash";

export const metadata: Metadata = metadataStatic;

const ProductAndServicesPage = () => {
  return (
    <DefaultLayout>
      <div className="mx-auto max-w-7xl">
        {/* <Breadcrumb pageName="Product and Services" /> */}
        <ProductAndServiceDash/>
      </div>
    </DefaultLayout>
  );
};

export default ProductAndServicesPage;
