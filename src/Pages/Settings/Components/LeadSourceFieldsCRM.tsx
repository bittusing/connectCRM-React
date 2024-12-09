import { useState, useEffect } from "react";
import DynamicDataManagement from "../../../components/DynamicDataManagement/DynamicDataManagement";
import { API } from "../../../api";
import { END_POINT } from "../../../api/UrlProvider";
import { toast } from "react-toastify";

interface LeadSource {
  key: string;
  leadSourceName: string;
  isActive?: boolean;
  deleted?: boolean;
}

const fields = [
  {
    name: "leadSourceName",
    label: "Lead source name",
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
    title: "Lead source name",
    dataIndex: "leadSourceName",
    key: "leadSourceName",
  },
];

export default function LeadSourceFieldsCRM() {
  const [data, setData] = useState<LeadSource[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchLeadSources = async () => {
    try {
      setIsLoading(true);
      const { data: response, error } = await API.getAuthAPI(
        END_POINT.LEAD_SOURCES,
        true
      );

      if (error) return;

      if (response) {
        // Transform API response to match component's data structure
        const transformedData: LeadSource[] = response.map((item: any) => ({
          key: item._id,
          leadSourceName: item.name,
          isActive: item.isActive,
          deleted: item.deleted,
        }));
        setData(transformedData);
      }
    } catch (error: any) {
      console.error(error.message || "Failed to fetch lead sources");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLeadSources();
  }, []);

  const handleAdd = async (newItem: any) => {
    try {
      setIsLoading(true);
      const payload = {
        name: newItem.leadSourceName,
      };

      const { error } = await API.postAuthAPI(
        payload,
        END_POINT.LEAD_SOURCES,
        true
      );

      if (error) return;

      toast.success("Lead source added successfully!");
      fetchLeadSources(); // Refresh the list
    } catch (error: any) {
      console.error(error.message || "Failed to add lead source");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = async (key: string, updatedItem: any) => {
    try {
      setIsLoading(true);
      const payload = {
        name: updatedItem.leadSourceName,
      };

      const { error } = await API.updateAuthAPI(
        payload,
        key,
        END_POINT.LEAD_SOURCES,
        true
      );

      if (error) return;

      toast.success("Lead source updated successfully!");
      fetchLeadSources(); // Refresh the list
    } catch (error: any) {
      console.error(error.message || "Failed to update lead source");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (key: string) => {
    try {
      setIsLoading(true);
      const { error } = await API.DeleteAuthAPI(
        key,
        END_POINT.LEAD_SOURCES,
        true
      );

      if (error) return;

      toast.success("Lead source deleted successfully!");
      fetchLeadSources(); // Refresh the list
    } catch (error: any) {
      console.error(error.message || "Failed to delete lead source");
    } finally {
      setIsLoading(false);
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
        END_POINT.LEAD_SOURCES,
        true
      );

      if (error) return;

      fetchLeadSources(); // Refresh the list
    } catch (error: any) {
      console.error(error.message || "Failed to update status");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DynamicDataManagement
      title="Lead source name"
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
