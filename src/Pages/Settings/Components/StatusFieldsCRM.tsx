import { useState, useEffect } from "react";
import { ColorPicker, Tooltip } from "antd";
import SwitcherTwo from "../../../components/FormElements/Switchers/SwitcherTwo";
import DynamicDataManagement from "../../../components/DynamicDataManagement/DynamicDataManagement";
import { API } from "../../../api";
import { END_POINT } from "../../../api/UrlProvider";
import { toast } from "react-toastify";

interface StatusField {
  key: string;
  status: string;
  display: string;
  onDashboard: boolean;
  color?: string;
  showDashboard?: boolean;
  showFollowUp?: boolean;
  isActive?: boolean;
}

const fields = [
  {
    name: "status",
    label: "Status",
    type: "text",
  },
  {
    name: "color",
    label: "Associated Color",
    type: "color",
  },
];

export default function StatusFieldsCRM() {
  const [data, setData] = useState<StatusField[]>([]);
  const [isLoading, setIsLoading] = useState(true);

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
      title: "Color",
      dataIndex: "color",
      key: "color",
      minWidth: 100,
      render: (key: string, record: StatusField) => {
        console.log(record.color);

        return (
          <Tooltip
            title={`Color "${record.color}" associated with "${record.status}" status field. You can change the color by clicking on edit button.`}
          >
            <ColorPicker value={record.color} />
          </Tooltip>
        );
      },
    },
    {
      title: "Show on dashboard",
      dataIndex: "key",
      key: "key",
      minWidth: 166,
      render: (key: string, record: StatusField) => (
        <Tooltip title="You can toggle the status field that you want to show on your Dashboard.">
          <div className="flex justify-start">
            <SwitcherTwo
              id={key}
              defaultChecked={record.showDashboard}
              onChange={handleDashboardToggle}
            />
          </div>
        </Tooltip>
      ),
    },
    {
      title: "Follow-Up Filter",
      dataIndex: "key",
      key: "key",
      minWidth: 166,
      render: (key: string, record: StatusField) => (
        <Tooltip title="All those fields whose toggle is enabled will not be shown in follow up dashboard.">
          <div className="flex justify-start">
            <SwitcherTwo
              id={key + "followupFilter"}
              defaultChecked={record.showFollowUp}
              onChange={handleFollowUpToggle}
            />
          </div>
        </Tooltip>
      ),
    },
  ];

  const fetchStatusFields = async () => {
    try {
      setIsLoading(true);
      const { data: response, error } = await API.getAuthAPI(
        END_POINT.LEAD_STATUS,
        true
      );

      if (error) return;

      if (response) {
        const transformedData: StatusField[] = response.map((item: any) => ({
          key: item._id,
          status: item.name,
          display: item.displayName,
          onDashboard: item.showDashboard,
          color: item.color,
          showDashboard: item.showDashboard,
          showFollowUp: item.showFollowUp,
          isActive: item.isActive,
        }));
        setData(transformedData);
      }
    } catch (error: any) {
      console.error(error.message || "Failed to fetch status fields");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStatusFields();
  }, []);

  const handleAdd = async (newItem: any) => {
    try {
      setIsLoading(true);
      console.log({ newItem });

      const payload = {
        displayName: newItem.display,
        name: newItem.status,
        color: newItem.color, // Default color
      };

      const { error } = await API.postAuthAPI(
        payload,
        END_POINT.LEAD_STATUS,
        true
      );

      if (error) return;

      toast.success("Status field added successfully!");
      fetchStatusFields();
    } catch (error: any) {
      console.error(error.message || "Failed to add status field");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = async (key: string, updatedItem: any) => {
    try {
      setIsLoading(true);
      const payload = {
        displayName: updatedItem.display,
        name: updatedItem.status,
        color: updatedItem.color || "#0000",
      };

      const { error } = await API.updateAuthAPI(
        payload,
        key,
        END_POINT.LEAD_STATUS,
        true
      );

      if (error) return;

      toast.success("Status field updated successfully!");
      fetchStatusFields();
    } catch (error: any) {
      console.error(error.message || "Failed to update status field");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (key: string) => {
    try {
      setIsLoading(true);
      const { error } = await API.DeleteAuthAPI(
        key,
        END_POINT.LEAD_STATUS,
        true
      );

      if (error) return;

      toast.success("Status field deleted successfully!");
      fetchStatusFields();
    } catch (error: any) {
      console.error(error.message || "Failed to delete status field");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDashboardToggle = async (key: string, currentStatus: boolean) => {
    try {
      const payload = {
        showDashboard: !currentStatus,
      };

      const { error } = await API.updateAuthAPI(
        payload,
        key,
        END_POINT.LEAD_STATUS,
        true
      );

      if (error) return;
      fetchStatusFields();
    } catch (error: any) {
      console.error(error.message || "Failed to update dashboard visibility");
    }
  };

  const handleFollowUpToggle = async (key: string, currentStatus: boolean) => {
    try {
      const payload = {
        showFollowUp: !currentStatus,
      };

      const { error } = await API.updateAuthAPI(
        payload,
        key,
        END_POINT.LEAD_STATUS,
        true
      );

      if (error) return;
      fetchStatusFields();
    } catch (error: any) {
      console.error(error.message || "Failed to update follow-up visibility");
    }
  };

  const handleUpdate = async (key: string, status: boolean) => {
    try {
      setIsLoading(true);
      const payload = {
        isActive: !status,
      };

      const { error } = await API.updateAuthAPI(
        payload,
        key,
        END_POINT.LEAD_STATUS,
        true
      );

      if (error) return;
      fetchStatusFields();
    } catch (error: any) {
      console.error(error.message || "Failed to update status");
    } finally {
      setIsLoading(false);
    }
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
      isLoading={isLoading}
    />
  );
}
