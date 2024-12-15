import React, { useState } from "react";
import { Button, Input, Switch } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import CustomAntdTable from "../../../components/Tables/CustomAntdTable";
import ButtonDefault from "../../../components/Buttons/ButtonDefault";
import SelectGroupOne from "../../../components/FormElements/SelectGroup/SelectGroupOne";
import InputGroup from "../../../components/FormElements/InputGroup";
import { postAuthAPI } from "../../../api";
import { END_POINT } from "../../../api/UrlProvider";
import SwitcherTwo from "../../../components/FormElements/Switchers/SwitcherTwo";
import Heading from "../../../components/CommonUI/Heading";

interface User {
  key: string;
  sNo: number;
  userName: string;
  email: string;
  mobile: string;
  roll: string;
  assignTeamLeader: string;
}

interface FormData {
  userName: string;
  email: string;
  mobile: string;
  password: string;
  isActive: string;
  userType: string;
}

export default function DepartmentSetting() {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    userName: "",
    email: "",
    mobile: "",
    password: "",
    isActive: "active",
    userType: "",
  });

  const validateForm = () => {
    if (!formData.userName.trim()) {
      toast.error("Please enter user name");
      return false;
    }
    if (!formData.email.trim()) {
      toast.error("Please enter email");
      return false;
    }
    if (!formData.mobile.trim()) {
      toast.error("Please enter mobile number");
      return false;
    }
    if (!formData.password.trim()) {
      toast.error("Please enter password");
      return false;
    }
    if (!formData.userType) {
      toast.error("Please select user type");
      return false;
    }
    return true;
  };

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

  const handleAdd = async () => {
    if (!validateForm()) return;

    try {
      setIsLoading(true);
      // Format the payload according to the API requirements
      const payload = {
        name: formData.userName,
        email: formData.email,
        phone: formData.mobile,
        password: formData.password,
        role: formData.userType,
      };

      const { data, error } = await postAuthAPI(
        payload,
        END_POINT.USER_REGISTER,
        true
      );

      if (error && !data) throw Error(error);

      console.log({ data });

      toast.success("User registered successfully!");

      // Reset form
      setFormData({
        userName: "",
        email: "",
        mobile: "",
        password: "",
        isActive: "active",
        userType: "",
      });

      // Refresh table data here if needed
      // fetchUsers(); TODO
    } catch (error: any) {
      toast.error(error.message || "Failed to register user");
    } finally {
      setIsLoading(false);
    }
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
        <div className="flex justify-start items-center gap-2 ">
          {/* <Button
            icon={<DeleteOutlined />}
            className="mr-2 bg-red-500 text-white"
            onClick={() => handleDelete(key)}
          /> */}
          {/* <Switch defaultChecked /> */}
          <SwitcherTwo id={key} />
          <Button
            icon={<EditOutlined />}
            className="bg-primary text-white"
            onClick={() => handleEdit(key)}
          />
        </div>
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
      <Heading title="Manage Your Department" />

      <div className="mb-4 grid grid-cols-4 gap-4">
        <InputGroup
          label=""
          name="userName"
          type="text"
          placeholder="User Name"
          value={formData.userName}
          onChange={handleInputChange}
        />
        <InputGroup
          label=""
          name="email"
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleInputChange}
        />
        <InputGroup
          label=""
          name="mobile"
          type="text"
          placeholder="Mobile"
          value={formData.mobile}
          onChange={handleInputChange}
        />
        <InputGroup
          label=""
          name="password"
          type="text"
          placeholder="Password"
          value={formData.password}
          onChange={handleInputChange}
        />
      </div>

      <div className="mb-4 grid grid-cols-3 gap-4">
        <SelectGroupOne
          label=""
          options={[
            { value: "active", label: "Active" },
            { value: "inactive", label: "Inactive" },
          ]}
          selectedOption={formData.isActive}
          setSelectedOption={(value) => handleSelectChange("isActive", value)}
        />
        <SelectGroupOne
          label=""
          options={[
            { value: "Team Admin", label: "Team Admin" },
            { value: "User", label: "User" },
          ]}
          selectedOption={formData.userType}
          setSelectedOption={(value) => handleSelectChange("userType", value)}
        />
        <ButtonDefault
          label={isLoading ? "Adding..." : "Add"}
          onClick={handleAdd}
          disabled={isLoading}
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
