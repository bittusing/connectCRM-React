import { useState } from "react";
import DynamicDataManagement from "../../../components/DynamicDataManagement/DynamicDataManagement";

const dataInitial: {
  key: string;
  reason: string;
}[] = [
  { key: crypto.randomUUID(), reason: "Not Interested " },
  { key: crypto.randomUUID(), reason: "No Team " },
  { key: crypto.randomUUID(), reason: "Not Business " },
];

export default function LostReasonFieldsCRM() {
  const fields = [
    {
      name: "reason",
      label: "Lost reason name",
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
      title: "Lost reasons",
      dataIndex: "reason",
      key: "reason",
    },
  ];
  const [data, setData] = useState(dataInitial);

  const handleAdd = (newItem: any) => {
    setData([...data, { ...newItem, key: crypto.randomUUID() }]);
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
      title="Lost Reasons List"
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
