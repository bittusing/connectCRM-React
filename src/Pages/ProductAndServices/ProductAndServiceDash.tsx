"use client";

import React, { useState } from "react";
import DynamicDataManagement from "../../components/DynamicDataManagement/DynamicDataManagement";

interface ProductService {
  key: string;
  sn: number;
  productName: string;
  price: number;
  setupFee: number;
}

const dataInitial: ProductService[] = [
  { key: "1", sn: 1, productName: "Bhutani", price: 0, setupFee: 100 },
  { key: "2", sn: 2, productName: "Godrej", price: 0, setupFee: 10 },
  { key: "3", sn: 3, productName: "Whiteline", price: 0, setupFee: 100 },
  { key: "4", sn: 4, productName: "Fairfox", price: 0, setupFee: 100 },
  { key: "5", sn: 5, productName: "Noida extn", price: 0, setupFee: 100 },
  { key: "6", sn: 6, productName: "Farm House Jewer", price: 0, setupFee: 100 },
  { key: "7", sn: 7, productName: "Goa", price: 0, setupFee: 100 },
  {
    key: "8",
    sn: 8,
    productName: "Dholera Cyber city",
    price: 0,
    setupFee: 100,
  },
  { key: "9", sn: 9, productName: "DDA sec 22", price: 0, setupFee: 100 },
  { key: "10", sn: 10, productName: "Smart world", price: 555, setupFee: 100 },
  { key: "11", sn: 11, productName: "DLF Gurugram", price: 0, setupFee: 100 },
];

const ProductAndServiceDash = () => {
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
      minWidth: 104,
      render: (price: number) => `Rs. ${price}`,
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price: number) => `Rs. ${price}`,
    },
  ];

  const [data, setData] = useState(dataInitial);

  const handleAdd = (newItem: any) => {
    setData([
      ...data,
      { ...newItem, key: data.length.toString, sn: data.length },
    ]);
  };

  const handleEdit = (key: any, updatedItem: any) => {
    setData(
      data.map((item) => (item.key === key ? { ...updatedItem, key } : item)),
    );
  };

  const handleDelete = (key: string) => {
    setData(data.filter((item) => item.key !== key));
  };

  const handleUpdate = (key: string, status: boolean) => {
    setData(
      data.map((item) =>
        item.key === key ? { ...item, onDashboard: !status } : item,
      ),
    );
  };

  return (
    <DynamicDataManagement
      title="Product and Service"
      fields={fields}
      columns={columns}
      data={data}
      onAdd={handleAdd}
      onEdit={handleEdit}
      onDelete={handleDelete}
      onUpdate={handleUpdate}
      customClasses="p-6 shadow-md dark:bg-gray-800"
    />
  );
};

export default ProductAndServiceDash;
