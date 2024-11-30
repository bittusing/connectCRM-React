import React, { useState } from "react";
import { Button, Input } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import CustomAntdTable from "../../../components/Tables/CustomAntdTable";
import ButtonDefault from "../../../components/Buttons/ButtonDefault";
import SelectGroupOne from "../../../components/FormElements/SelectGroup/SelectGroupOne";
import InputGroup from "../../../components/FormElements/InputGroup";

interface User {
  key: string;
  sNo: number;
  userName: string;
  email: string;
  mobile: string;
  roll: string;
  assignTeamLeader: string;
}

export default function DepartmentSetting() {
  const [formData, setFormData] = useState({
    userName: "",
    email: "admin@gmail.com",
    mobile: "",
    password: "•••••••",
    status: "",
    userType: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSelectChange = (name: string, value: string | number) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAdd = () => {
    console.log("Adding new user:", formData);
    // Implement your add user logic here
  };

  const columns = [
    {
      title: "S.No.",
      dataIndex: "sNo",
      key: "sNo",
      sorter: (a: User, b: User) => a.sNo - b.sNo,
    },
    {
      title: "User Name",
      dataIndex: "userName",
      key: "userName",
      sorter: (a: User, b: User) => a.userName.localeCompare(b.userName),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Mobile",
      dataIndex: "mobile",
      key: "mobile",
    },
    {
      title: "Roll",
      dataIndex: "roll",
      key: "roll",
    },
    {
      title: "Assign TeamLeader",
      dataIndex: "assignTeamLeader",
      key: "assignTeamLeader",
    },
    {
      title: "Action",
      dataIndex: "key",
      key: "action",
      render: (key: string) => (
        <span>
          <Button
            icon={<DeleteOutlined />}
            className="mr-2 bg-red-500 text-white"
            onClick={() => handleDelete(key)}
          />
          <Button
            icon={<EditOutlined />}
            className="bg-primary text-white"
            onClick={() => handleEdit(key)}
          />
        </span>
      ),
    },
  ];

  const data: User[] = [
    {
      key: "1",
      sNo: 1,
      userName: "Admin",
      email: "admin@gmail.com",
      mobile: "9565465665",
      roll: "admin",
      assignTeamLeader: "",
    },
    {
      key: "2",
      sNo: 2,
      userName: "juhi",
      email: "juhi@gmail.com",
      mobile: "1232131321",
      roll: "TeamLeader",
      assignTeamLeader: "chirag",
    },
    {
      key: "3",
      sNo: 3,
      userName: "riya",
      email: "riya@gmail.com",
      mobile: "2342342342",
      roll: "user",
      assignTeamLeader: "juhi",
    },
    {
      key: "4",
      sNo: 4,
      userName: "chirag",
      email: "chirag@gmail.com",
      mobile: "1111111111",
      roll: "GroupLeader",
      assignTeamLeader: "juhi",
    },
    {
      key: "5",
      sNo: 5,
      userName: "Anu",
      email: "anu@gmail.com",
      mobile: "2423423423",
      roll: "TeamLeader",
      assignTeamLeader: "chirag",
    },
  ];

  const handleDelete = (key: string) => {
    console.log("Delete user with key:", key);
    // Implement delete logic
  };

  const handleEdit = (key: string) => {
    console.log("Edit user with key:", key);
    // Implement edit logic
  };
  return (
    <div className="w-full">
      <div className="mb-4 grid grid-cols-4 gap-4">
        <InputGroup
          label=""
          name="userName"
          type="text"
          placeholder="User Name"
          value={formData.userName}
          onChange={handleInputChange}
        />
        <Input
          placeholder="admin@gmail.com"
          value={formData.email}
          disabled
          className="bg-blue-50 dark:bg-gray-700"
        />
        <InputGroup
          label=""
          name="mobile"
          type="text"
          placeholder="Mobile"
          value={formData.mobile}
          onChange={handleInputChange}
        />
        <Input
          placeholder="•••••••"
          value={formData.password}
          disabled
          className="bg-blue-50 dark:bg-gray-700"
        />
      </div>

      <div className="mb-4 grid grid-cols-3 gap-4">
        <SelectGroupOne
          label=""
          options={[
            { value: "active", label: "Active" },
            { value: "inactive", label: "Inactive" },
          ]}
          setSelectedOption={(value) => handleSelectChange("status", value)}
        />
        <SelectGroupOne
          label=""
          options={[
            { value: "admin", label: "Admin" },
            { value: "user", label: "User" },
          ]}
          setSelectedOption={(value) => handleSelectChange("userType", value)}
        />
        <ButtonDefault
          label="Add"
          onClick={handleAdd}
        />
      </div>

      <CustomAntdTable
        columns={columns}
        dataSource={data}
        pagination={false}
        className="w-full"
      />
    </div>
  );
}
