import { useState, useEffect } from "react";
import DynamicDataManagement from "../../components/DynamicDataManagement/DynamicDataManagement";
import { API } from "../../api";
import { END_POINT } from "../../api/UrlProvider";
import { toast } from "react-toastify";

interface ProductService {
  key: string;
  sn: number;
  productName: string;
  price: number;
  setupFee: number;
}
const fields = [
  {
    name: "productName",
    label: "Product & Service Name",
    type: "text",
  },
  { name: "setupFee", label: "Setup fee", type: "number" },
  { name: "price", label: "Price", type: "number" },
];

const columns = [
  {
    title: "S.N.",
    dataIndex: "sn",
    key: "sn",
  },
  {
    title: "Product Name",
    dataIndex: "productName",
    key: "productName",
    minWidth: 150,
  },
  {
    title: "Setup Fee",
    dataIndex: "setupFee",
    key: "setupFee",
    minWidth: 120,
    render: (price: number) => `Rs. ${price}`,
  },
  {
    title: "Price",
    dataIndex: "price",
    key: "price",
    render: (price: number) => `Rs. ${price}`,
    minWidth: 120,
  },
  {
    title: "Orders",
    dataIndex: "order",
    key: "order",
    render: (order: number) => `${order}`,
  },
];

const ProductAndServiceDash = () => {
  const [data, setData] = useState<ProductService[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchProductServices = async () => {
    try {
      setIsLoading(true);
      const { data: response } = await API.getAuthAPI(
        END_POINT.PRODUCT_SERVICE,
        true
      );

      if (response) {
        // Transform the API response to match your interface
        const transformedData: ProductService[] = response.map(
          (item: any, index: number) => ({
            key: item._id,
            sn: index + 1,
            productName: item.name || "",
            price: item.price || 0,
            setupFee: item.setupFee || 0,
            deleted: false,
            isActive: true,
            order: 2,
          })
        );
        setData(transformedData);
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to fetch product services");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProductServices();
  }, []);

  const handleAdd = async (newItem: any) => {
    try {
      setIsLoading(true);
      const payload = {
        name: newItem.productName,
        price: Number(newItem.price),
        setupFee: Number(newItem.setupFee),
      };

      const { message, error } = await API.postAuthAPI(
        payload,
        END_POINT.PRODUCT_SERVICE,
        true
      );

      if (error) return;

      toast.success("Product service added successfully!");
      fetchProductServices(); // Refresh the list
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = async (key: string, updatedItem: any) => {
    try {
      setIsLoading(true);

      const payload = {
        name: updatedItem.productName,
        price: Number(updatedItem.price),
        setupFee: Number(updatedItem.setupFee),
        deleted: updatedItem.delete,
        // isActive: updatedItem.isActive,
      };

      const { data, message, error } = await API.updateAuthAPI(
        payload,
        key,
        END_POINT.PRODUCT_SERVICE,
        true
      );
      if (!data || error) return;

      toast.success("Product service updated successfully!");
      fetchProductServices(); // Refresh the list
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (key: string) => {
    try {
      const { error } = await API.DeleteAuthAPI(
        key,
        END_POINT.PRODUCT_SERVICE,
        true
      );

      if (error) return;

      toast.success("Product service deleted successfully!");
      fetchProductServices(); // Refresh the list
    } catch (error: any) {
      toast.error(error.message || "Failed to delete product service");
    }
  };

  const handleUpdate = async (key: string, status: boolean) => {
    try {
      setIsLoading(true);

      const payload = { isActive: !status };
      const { error } = await API.updateAuthAPI(
        payload,
        key,
        END_POINT.PRODUCT_SERVICE,
        true
      );
      if (error) return;
      // toast.success("Status updated successfully!");
      fetchProductServices(); // Refresh the list
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-7xl">
      <DynamicDataManagement
        title="Product and Service"
        fields={fields}
        columns={columns}
        data={data}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onUpdate={handleUpdate}
        isLoading={isLoading}
        customClasses="p-6 shadow-md dark:bg-gray-800"
      />
    </div>
  );
};

export default ProductAndServiceDash;
