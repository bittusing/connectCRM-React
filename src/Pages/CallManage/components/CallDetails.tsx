import React, { useState } from "react";
import { Input } from "antd";
import type { ColumnsType } from "antd/es/table";
import CustomAntdTable from "../../../components/Tables/CustomAntdTable";

const { Search } = Input;

interface CallDetail {
  key: string;
  srNo: number;
  clientName: string;
  mobileNo: string;
  callDateTime: string;
  duration: string;
  callType: string;
}

const CallDetails: React.FC = () => {
  const [searchText, setSearchText] = useState("");
  const [pageSize, setPageSize] = useState(10);

  const columns: ColumnsType<CallDetail> = [
    {
      title: <span className="min-w-[80px]">Sr. No.</span>,
      dataIndex: "srNo",
      key: "srNo",
      minWidth: 80,
    },
    {
      title: "Client Name",
      dataIndex: "clientName",
      key: "clientName",
    },
    {
      title: "Mobile No.",
      dataIndex: "mobileNo",
      key: "mobileNo",
    },
    {
      title: <span className="min-w-[144px]">Call Date Time</span>,
      dataIndex: "callDateTime",
      key: "callDateTime",
      minWidth: 144,
    },
    {
      title: <span className="min-w-[103px]">Duration</span>,
      dataIndex: "duration",
      key: "duration",
      minWidth: 103,
    },
    {
      title: "Call Type",
      dataIndex: "callType",
      key: "callType",
      render: (text: string) => (
        <span
          style={{
            color:
              text === "INCOMING"
                ? "#10b981"
                : text === "MISSED"
                  ? "red"
                  : "#3b82f6",
          }}
        >
          {text}
        </span>
      ),
    },
  ];

  const data: CallDetail[] = [
    {
      key: "1",
      srNo: 1,
      clientName: "+911243375000",
      mobileNo: "911243375000",
      callDateTime: "06-Jul-2024 9:58:11 am",
      duration: "0h 0m 30s",
      callType: "MISSED",
    },
    {
      key: "2",
      srNo: 2,
      clientName: "IT Chirag Digital",
      mobileNo: "917982526807",
      callDateTime: "06-Jul-2024 9:32:25 am",
      duration: "0h 0m 30s",
      callType: "INCOMING",
    },
    {
      key: "3",
      srNo: 3,
      clientName: "+911243062071",
      mobileNo: "911243062071",
      callDateTime: "06-Jul-2024 3:45:24 pm",
      duration: "0h 0m 30s",
      callType: "MISSED",
    },
    {
      key: "4",
      srNo: 4,
      clientName: "",
      mobileNo: "917506041706",
      callDateTime: "06-Jul-2024 3:30:37 pm",
      duration: "0h 0m 30s",
      callType: "MISSED",
    },
    {
      key: "5",
      srNo: 5,
      clientName: "",
      mobileNo: "918030248302",
      callDateTime: "06-Jul-2024 3:03:37 pm",
      duration: "0h 0m 30s",
      callType: "MISSED",
    },
    {
      key: "6",
      srNo: 6,
      clientName: "Umesh Yadav 2",
      mobileNo: "919936508089",
      callDateTime: "06-Jul-2024 2:59:00 pm",
      duration: "0h 1m 18s",
      callType: "INCOMING",
    },
    {
      key: "7",
      srNo: 7,
      clientName: "",
      mobileNo: "918424008516",
      callDateTime: "06-Jul-2024 2:52:15 pm",
      duration: "0h 0m 30s",
      callType: "MISSED",
    },
    {
      key: "8",
      srNo: 8,
      clientName: "+911243062072",
      mobileNo: "911243062072",
      callDateTime: "06-Jul-2024 1:30:25 pm",
      duration: "0h 0m 30s",
      callType: "MISSED",
    },
    {
      key: "9",
      srNo: 9,
      clientName: "Juhi Mishra (Developer)",
      mobileNo: "919125896113",
      callDateTime: "06-Jul-2024 1:15:38 pm",
      duration: "0h 0m 21s",
      callType: "MISSED",
    },
    {
      key: "10",
      srNo: 10,
      clientName: "Client Rabinder Ji (Sup...",
      mobileNo: "919599600580",
      callDateTime: "06-Jul-2024 12:26:04 pm",
      duration: "0h 0m 30s",
      callType: "MISSED",
    },
  ];

  const handleSearch = (value: string) => {
    setSearchText(value);
  };

  const filteredData = data.filter((item) =>
    Object.values(item).some((val) =>
      val.toString().toLowerCase().includes(searchText.toLowerCase()),
    ),
  );

  return (
    <div className="dark:bg-gray-800">
      <div className="mb-4 flex justify-end">
        <Search
          placeholder="Search here"
          onSearch={handleSearch}
          style={{ width: 200 }}
          className="h-[51px] dark:text-white"
        />
      </div>
      <CustomAntdTable
        columns={columns}
        dataSource={filteredData}
        pagination={{
          total: filteredData.length,
          showSizeChanger: true,
          showQuickJumper: true,
          showTotal: (total: number, range: any) =>
            `${range[0]}-${range[1]} of ${total} items`,
          pageSize: pageSize,
          pageSizeOptions: ["10", "20", "30", "40", "50"],
          onShowSizeChange: (_current: number, size: number) =>
            setPageSize(size),
        }}
      />
      <style>{`
        .dark .ant-select-selector {
          background-color: #374151 !important;
          color: #fff !important;
        }
        .dark .ant-select-arrow {
          color: #fff;
        }
        .dark .ant-input-search {
          background-color: #374151;
        }
        .dark .ant-input-search input {
          background-color: #374151;
          color: #fff;
        }
        .ant-input-search input {
          height: 51px;
        }
        .ant-input-search .ant-input-search-button {
          height: 51px;
        }
        .dark
          .ant-input-search
          > .ant-input-group
          > .ant-input-group-addon:last-child
          .ant-input-search-button:not(.ant-btn-primary) {
          color: white;
        }
        .dark .ant-input::placeholder {
          color: white;
        }
      `}</style>
    </div>
  );
};

export default CallDetails;
