import { Table, Button } from "antd";
import {
  EyeOutlined,
  DeleteOutlined,
  DownloadOutlined,
} from "@ant-design/icons";
import MiniLoader from "../CommonUI/Loader/MiniLoader";

const columnsLocal = [
  {
    title: "Package",
    dataIndex: "package",
    key: "package",
    render: ({ text, record }: any) => (
      <div>
        <div className="text-white dark:text-white">{text}</div>
        <div className="text-gray-400 dark:text-gray-400">${record?.price}</div>
      </div>
    ),
  },
  {
    title: "Invoice date",
    dataIndex: "invoiceDate",
    key: "invoiceDate",
    className: "text-dark dark:text-white",
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (status: any) => {
      let color = "text-green-500";
      if (status === "Unpaid") color = "text-red-500";
      if (status === "Pending") color = "text-yellow-500";
      return <span className={`${color}`}>{status}</span>;
    },
  },
  {
    title: "Actions",
    key: "actions",
    render: () => (
      <div className="flex space-x-2">
        <Button
          icon={<EyeOutlined />}
          className="text-gray-400 hover:text-white"
        />
        <Button
          icon={<DeleteOutlined />}
          className="text-gray-400 hover:text-white"
        />
        <Button
          icon={<DownloadOutlined />}
          className="text-gray-400 hover:text-white"
        />
      </div>
    ),
  },
];

const dataLocal = [
  {
    key: "1",
    package: "Free package",
    price: 0,
    invoiceDate: "Jan 13,2023",
    status: "Paid",
  },
  {
    key: "2",
    package: "Standard Package",
    price: 59,
    invoiceDate: "Jan 13,2023",
    status: "Paid",
  },
  {
    key: "3",
    package: "Business Package",
    price: 99,
    invoiceDate: "Jan 13,2023",
    status: "Unpaid",
  },
  {
    key: "4",
    package: "Standard Package",
    price: 59,
    invoiceDate: "Jan 13,2023",
    status: "Pending",
  },
];

const CustomAntdTable = ({
  columns,
  dataSource,
  pagination = false,
  isLoading = false,
}: any) => {
  return (
    <div>
      {false ? (
        <MiniLoader />
      ) : (
        <Table
          columns={columns || columnsLocal}
          dataSource={dataSource || dataLocal}
          pagination={pagination}
          loading={isLoading}
          className="w-full bg-white dark:bg-transparent overflow-auto"
          bordered
        />
      )}
      <style>{`
        .dark .ant-table {
          background: transparent !important;
          color: white;
        }
        .dark .ant-table-thead > tr > th {
          background: #374151 !important;
          // background: #1e2837 !important;
          color: white !important;
          border-bottom: 1px solid #2d3748;
        }
        .dark .ant-table-tbody > tr > td {
          border-bottom: 1px solid #2d3748;
        }
        .dark .ant-table-tbody > tr:hover > td {
          background: #2d3748 !important;
        }
        .dark .ant-table {
          background: #0f172a !important;
        }
        .dark .ant-table-thead > tr > th {
          background: #374151 !important;
          // background: #1e2837 !important;
        }
        .dark .ant-table-tbody > tr > td {
          background: #0f172a !important;
        }
        .dark .ant-table-tbody > tr:hover > td {
          background: #1e2837 important;
        }
        .dark
          .ant-table-wrapper
          .ant-table-thead
          > tr
          > th:not(:last-child):not(.ant-table-selection-column):not(
            .ant-table-row-expand-icon-cell
          ):not([colspan])::before,
        .ant-table-wrapper
          .ant-table-thead
          > tr
          > td:not(:last-child):not(.ant-table-selection-column):not(
            .ant-table-row-expand-icon-cell
          ):not([colspan])::before {
          background: transparent;
        }
        .dark .ant-pagination .ant-pagination-total-text {
          color: white;
        }
        .dark
          .ant-pagination
          .ant-pagination-disabled
          .ant-pagination-item-link,
        .ant-pagination
          .ant-pagination-disabled:hover
          .ant-pagination-item-link {
          color: #9ca3af;
        }
        .dark .ant-pagination .ant-pagination-item-active {
          background-color: #374151;
          border-color: grey;
        }
        .dark .ant-pagination .ant-pagination-item-active a {
          color: white;
        }
        .dark
          .ant-select-outlined:not(.ant-select-customize-input)
          .ant-select-selector {
          border: 1px solid grey;
        }
      `}</style>
    </div>
  );
};

export default CustomAntdTable;
