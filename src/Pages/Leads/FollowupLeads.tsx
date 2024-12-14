import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { Button } from "antd";
import { EditOutlined } from "@ant-design/icons";
import CustomAntdTable from "../../components/Tables/CustomAntdTable";
import CheckboxTwo from "../../components/FormElements/Checkboxes/CheckboxTwo";
import LeadsTableHeader from "./LeadsTableHeader";
import { API } from "../../api";
import { END_POINT } from "../../api/UrlProvider";
import { debounce } from "lodash";

interface Lead {
  key: string;
  name: string;
  number: string;
  leadSource: string;
  agent: string;
  followUpDate: string;
}

interface APILead {
  _id: string;
  firstName: string;
  lastName: string;
  contactNumber: string;
  leadSource: { name: string } | null;
  assignedAgent: { name: string } | null;
  followUpDate: string;
}

const FollowupLeads = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(false);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });

  const transformLeadData = (apiLeads: APILead[]): Lead[] => {
    return apiLeads.map((lead) => ({
      key: lead._id,
      name: `${lead.firstName} ${lead.lastName}`.trim(),
      number: lead.contactNumber,
      leadSource: lead.leadSource?.name || "-",
      agent: lead.assignedAgent?.name || "-",
      followUpDate: new Date(lead.followUpDate).toLocaleTimeString(),
    }));
  };

  const fetchLeads = async () => {
    try {
      setLoading(true);
      const params = {
        page: pagination.current,
        limit: pagination.pageSize,
        ...(debouncedSearchTerm && { search: debouncedSearchTerm }),
        type: 'followup' // Add type parameter to get only followup leads
      };

      const { data, error, options } = await API.getAuthAPI(
        END_POINT.LEADS_FOLLOWUP_DATA,
        true,
        params
      );

      if (error) return;

      const transformedLeads = transformLeadData(data);
      setLeads(transformedLeads);
      setPagination({
        ...pagination,
        total: options.pagination.total,
      });
    } catch (error: any) {
      console.error(error.message || "Failed to fetch followup leads");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, [pagination.current, pagination.pageSize, debouncedSearchTerm]);

  const handleTableChange = (page: number, pageSize: number) => {
    setPagination({
      ...pagination,
      current: page,
      pageSize: pageSize,
    });
  };

  const debouncedSearch = useCallback(
    debounce((value: string) => {
      setDebouncedSearchTerm(value);
      setPagination({ ...pagination, current: 1 });
    }, 500),
    []
  );

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    debouncedSearch(value);
  };

  // Handle select all checkbox
  const handleSelectAll = ({ isChecked }: { isChecked: boolean }) => {
    if (isChecked) {
      const visibleKeys = leads.map(lead => lead.key);
      setSelectedRowKeys(prevSelected => {
        const uniqueKeys = new Set([...prevSelected, ...visibleKeys]);
        return Array.from(uniqueKeys);
      });
    } else {
      const visibleKeys = new Set(leads.map(lead => lead.key));
      setSelectedRowKeys(prevSelected => 
        prevSelected.filter(key => !visibleKeys.has(key))
      );
    }
  };

  const areAllVisibleRowsSelected = () => {
    if (leads.length === 0) return false;
    return leads.every(lead => selectedRowKeys.includes(lead.key));
  };

  const columns = [
    {
      title: (
        <div>
          <CheckboxTwo
            id="selectAllFollowupLeads"
            onChange={handleSelectAll}
            checked={areAllVisibleRowsSelected()}
          />
        </div>
      ),
      dataIndex: "key",
      key: "checkbox",
      render: (key: string) => (
        <div>
          <CheckboxTwo
            id={key}
            onChange={({ value: checkboxValue, isChecked }) =>
              rowSelection({ value: checkboxValue, isChecked })
            }
            checked={selectedRowKeys.includes(key)}
          />
        </div>
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Number",
      dataIndex: "number",
      key: "number",
    },
    {
      title: "Lead Source",
      dataIndex: "leadSource",
      key: "leadSource",
      minWidth: 123,
    },
    {
      title: "Agent",
      dataIndex: "agent",
      key: "agent",
    },
    {
      title: "Follow-Up Date",
      dataIndex: "followUpDate",
      key: "followUpDate",
      minWidth: 143,
    },
    {
      title: "Action",
      key: "action",
      render: (record: { key: string }) => (
        <div className="flex space-x-2">
          <Link to={`/leads/${record.key}`}>
            <Button icon={<EditOutlined />} className="bg-primary text-white" />
          </Link>
          <Button icon="C" className="bg-green text-sm text-white" />
        </div>
      ),
    },
  ];

  const rowSelection = ({
    value,
    isChecked,
  }: {
    value: string;
    isChecked: boolean;
  }) => {
    if (isChecked) {
      setSelectedRowKeys(prev => [...prev, value]);
    } else {
      setSelectedRowKeys(prev => prev.filter(key => key !== value));
    }
  };

  useEffect(() => {
    console.log('Selected rows:', selectedRowKeys);
  }, [selectedRowKeys]);

  return (
    <div className="space-y-4">
      <LeadsTableHeader
        handleSearch={handleSearch}
        searchTerm={searchTerm}
        selectedCount={selectedRowKeys.length}
      />

      <CustomAntdTable
        columns={columns}
        dataSource={leads}
        pagination={{
          current: pagination.current,
          pageSize: pagination.pageSize,
          total: pagination.total,
          onChange: handleTableChange,
          pageSizeOptions: ["10", "20", "50", "100"],
          showSizeChanger: true,
        }}
        isLoading={loading}
      />
    </div>
  );
};

export default FollowupLeads;