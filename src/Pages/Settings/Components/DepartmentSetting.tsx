import React, { useState, useEffect } from "react";
import { Button } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import CustomAntdTable from "../../../components/Tables/CustomAntdTable";
import ButtonDefault from "../../../components/Buttons/ButtonDefault";
import SelectGroupOne from "../../../components/FormElements/SelectGroup/SelectGroupOne";
import InputGroup from "../../../components/FormElements/InputGroup";
import { API } from "../../../api";
import { END_POINT } from "../../../api/UrlProvider";
import SwitcherTwo from "../../../components/FormElements/Switchers/SwitcherTwo";
import Heading from "../../../components/CommonUI/Heading";

interface ApiUser {
  _id: string;
  name: string;
  email: string;
  role: string;
  phone: string;
  isActive: boolean;
  deleted: boolean;
  createdAt: string;
}

interface User {
  key: string;
  sNo: number;
  userName: string;
  email: string;
  mobile: string;
  roll: string;
  assignTeamLeader: string;
  isActive: boolean;
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
  const [tableLoading, setTableLoading] = useState(false);
  const [tableData, setTableData] = useState<User[]>([]);

  const [formData, setFormData] = useState<FormData>({
    userName: "",
    email: "",
    mobile: "",
    password: "",
    isActive: "active",
    userType: "",
  });

  const fetchUsers = async () => {
    try {
      setTableLoading(true);
      const { data, error } = await API.getAuthAPI(END_POINT.USERS, true);

      if (error) throw new Error(error);

      if (data) {
        const transformedData: User[] = data.map(
          (user: ApiUser, index: number) => ({
            key: user._id,
            sNo: index + 1,
            userName: user.name,
            email: user.email,
            mobile: user.phone,
            roll: user.role,
            assignTeamLeader: "",
            isActive: user.isActive,
          })
        );
        setTableData(transformedData);
      }
    } catch (error: any) {
      console.error(error.message || "Failed to fetch users");
    } finally {
      setTableLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

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

      const payload = {
        name: formData.userName,
        email: formData.email,
        phone: formData.mobile,
        password: formData.password,
        role: formData.userType,
      };

      const { data, error } = await API.postAuthAPI(
        payload,
        END_POINT.USER_REGISTER,
        true
      );

      if (error && !data) throw Error(error);

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

      // Refresh users list
      fetchUsers();
    } catch (error: any) {
      console.error(error.message || "Failed to register user");
    } finally {
      setIsLoading(false);
    }
  };

  const handleStatusChange = async (id: string, status: boolean) => {
    try {
      const { error } = await API.updateAuthAPI(
        { isActive: status },
        id,
        END_POINT.USERS,
        true
      );

      if (error) throw new Error(error);

      toast.success(
        `User ${status ? "activated" : "deactivated"} successfully`
      );
      fetchUsers();
    } catch (error: any) {
      console.error(error.message || "Failed to update user status");
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
      title: "Role",
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
      render: (key: string, record: User) => (
        <div className="flex justify-start items-center gap-2">
          <SwitcherTwo
            id={key}
            defaultChecked={record.isActive}
            onChange={(checked: boolean) => handleStatusChange(key, checked)}
          />
          <Button
            icon={<EditOutlined />}
            className="bg-primary text-white"
            onClick={() => handleEdit(key)}
          />
        </div>
      ),
    },
  ];

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
        dataSource={tableData}
        pagination={{
          pageSize: 10,
          showSizeChanger: true,
          showQuickJumper: true,
        }}
        className="w-full"
        loading={tableLoading}
      />
    </div>
  );
}
