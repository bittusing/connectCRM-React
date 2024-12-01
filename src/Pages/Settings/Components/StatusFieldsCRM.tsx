import { useState } from "react";
import { Tooltip } from "antd";
import SwitcherTwo from "../../../components/FormElements/Switchers/SwitcherTwo";
import DynamicDataManagement from "../../../components/DynamicDataManagement/DynamicDataManagement";

const dataInitial: {
  key: string;
  status: string;
  display: string | number;
  onDashboard: boolean;
}[] = [
  {
    key: crypto.randomUUID(),
    status: "Call Back",
    display: "Call Back",
    onDashboard: true,
  },
  {
    key: crypto.randomUUID(),
    status: "Call Back Re-Visit",
    display: "Call Back Re-Visit",
    onDashboard: true,
  },
  {
    key: crypto.randomUUID(),
    status: "Call Back-Visit",
    display: "Call Back-Visit",
    onDashboard: true,
  },
];

export default function StatusFieldsCRM() {
  const fields = [
    {
      name: "display",
      label: "display status",
      type: "text",
    },
    {
      name: "status",
      label: "Status",
      type: "text",
    },
  ];

  const columns = [
    {
      title: "S.No",
      dataIndex: "index",
      key: "index",
      render: (_text: any, _record: any, index: number) => index + 1,
    },
    {
      title: "Status name",
      dataIndex: "status",
      key: "status",
      minWidth: 120,
    },
    {
      title: "Show on dashboard",
      dataIndex: "key",
      key: "key",
      minWidth: 166,
      render: (key: string, _record: any, _index: number) => {
        return (
          <Tooltip title="You can toggle the status field that you want to show on your Dashboard.">
            <div className="flex justify-start">
              <SwitcherTwo id={key} />
            </div>
          </Tooltip>
        );
      },
    },
    {
      title: "Follow-Up Filter",
      dataIndex: "key",
      key: "key",
      minWidth: 166,
      render: (key: string, _record: any, _index: number) => {
        return (
          <Tooltip title="All those fields whose toggle is enabled will not be shown in follow up dashboard.">
            <div className="flex justify-start">
              <SwitcherTwo id={key + "followupFilter"} />
            </div>
          </Tooltip>
        );
      },
    },
  ];
  const [data, setData] = useState(dataInitial);

  const handleAdd = (newItem: any) => {
    setData([...data, { ...newItem, key: crypto.randomUUID() }]);
  };

  const handleEdit = (key: any, updatedItem: any) => {
    setData(
      data.map((item) => (item.key === key ? { ...updatedItem, key } : item))
    );
  };

  const handleDelete = (key: string) => {
    setData(data.filter((item) => item.key !== key));
  };

  const handleUpdate = (key: string, status: boolean) => {
    setData(
      data.map((item) =>
        item.key === key ? { ...item, onDashboard: !status } : item
      )
    );
  };
  return (
    <DynamicDataManagement
      title="Lead Status List"
      fields={fields}
      columns={columns}
      data={data}
      onAdd={handleAdd}
      onEdit={handleEdit}
      onDelete={handleDelete}
      onUpdate={handleUpdate}
    />
  );
}
