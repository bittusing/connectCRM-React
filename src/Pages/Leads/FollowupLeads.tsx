import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { Button, Tooltip } from "antd";
import {
  EditFilled,
} from "@ant-design/icons";
import CustomAntdTable from "../../components/Tables/CustomAntdTable";
import CheckboxTwo from "../../components/FormElements/Checkboxes/CheckboxTwo";
import LeadsTableHeader from "./LeadsTableHeader";
import { API } from "../../api";
import { END_POINT } from "../../api/UrlProvider";
import { debounce } from "lodash";
import { toast } from "react-toastify";
import QuickEditModal from "../../components/Modals/QuickEdit";

interface Lead {
  key: string;
  name: string;
  number: string;
  leadSource: string;
  agent: string;
  followUpDate: any;
  statusData: any;
  leadWonAmount: number;
  addCalender: boolean;
}

interface APILead {
  _id: string;
  firstName: string;
  lastName: string;
  contactNumber: string;
  leadSource: { name: string } | null;
  assignedAgent: { name: string } | null;
  followUpDate: any;
  leadStatus: any;
  leadWonAmount: number;
  addCalender: boolean;
}

const isWithinNext24Hours = (date: Date): boolean => {
  const now = new Date();
  const future = new Date(now.getTime() + 24 * 60 * 60 * 1000);
  return date > now && date <= future;
};

const isWithinPast24Hours = (date: Date): boolean => {
  const now = new Date();
  const past = new Date(now.getTime() - 48 * 60 * 60 * 1000);
  return date < now && date >= past;
};

const getRowClassName = (record: Lead): string => {
  const followUpDate = new Date(record.followUpDate);

  if (isWithinNext24Hours(followUpDate)) {
    return "upcoming-followup pulse-green";
  }
  if (isWithinPast24Hours(followUpDate)) {
    return "missed-followup pulse-red";
  }
  return "";
};

const FollowupLeads = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(false);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [isQuickEditOpen, setIsQuickEditOpen] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
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
      followUpDate: new Date(lead.followUpDate),
      // followUpDate: new Date(lead.followUpDate).toLocaleString(),
      statusData: lead.leadStatus || {},
      leadWonAmount: lead.leadWonAmount,
      addCalender: lead.addCalender,
    }));
  };

  const fetchLeads = async () => {
    try {
      setLoading(true);
      const params = {
        page: pagination.current,
        limit: pagination.pageSize,
        ...(debouncedSearchTerm && { search: debouncedSearchTerm }),
        type: "followup", // Add type parameter to get only followup leads
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

  const handleQuickUpdate = async (updateData: any) => {
    if (!selectedLead) return;

    try {
      setIsUpdating(true);
      const response = await API.updateAuthAPI(
        updateData,
        selectedLead.key,
        "lead",
        true
      );

      if (response.error) return;
      toast.success("Lead updated successfully");
      setIsQuickEditOpen(false);
      fetchLeads(); // Refresh the leads list
    } catch (error: any) {
      console.error(error.message || "Failed to update lead");
    } finally {
      setIsUpdating(false);
    }
  };

  // Handle select all checkbox
  const handleSelectAll = ({ isChecked }: { isChecked: boolean }) => {
    if (isChecked) {
      const visibleKeys = leads.map((lead) => lead.key);
      setSelectedRowKeys((prevSelected) => {
        const uniqueKeys = new Set([...prevSelected, ...visibleKeys]);
        return Array.from(uniqueKeys);
      });
    } else {
      const visibleKeys = new Set(leads.map((lead) => lead.key));
      setSelectedRowKeys((prevSelected) =>
        prevSelected.filter((key) => !visibleKeys.has(key))
      );
    }
  };

  const areAllVisibleRowsSelected = () => {
    if (leads.length === 0) return false;
    return leads.every((lead) => selectedRowKeys.includes(lead.key));
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
      render: (date: Date) => {
        const formattedDate = date.toLocaleString();
        const isUpcoming = isWithinNext24Hours(date);
        const isMissed = isWithinPast24Hours(date);

        return (
          <div className="flex items-center gap-2">
            <span>{formattedDate}</span>
            {isUpcoming && (
              <span className="px-2 py-0.5 text-xs rounded-full bg-green-100 text-green-800 border border-green-200">
                Due Soon
              </span>
            )}
            {isMissed && (
              <span className="px-2 py-0.5 text-xs rounded-full bg-red-100 text-red-800 border border-red-200">
                Overdue
              </span>
            )}
          </div>
        );
      },
    },
    {
      title: "Action",
      key: "action",
      render: (record: any) => (
        <div className="flex space-x-2">
          <Link to={`/leads/${record.key}`}>
            <Button
              icon={<EditFilled />}
              className="bg-transparent text-primary dark:text-blue-400"
            />
          </Link>
          <Button
            onClick={(e) => {
              e.stopPropagation();
              setSelectedLead(record);
              setIsQuickEditOpen(true);
            }}
            className="bg-primary text-white hover:bg-primary/90"
          >
            Quick Edit
          </Button>
          {record?.statusData?.name && (
            <Tooltip title={`Stands for : ${record?.statusData?.name}`}>
              <Button
                icon={record?.statusData?.name[0]}
                className={`text-sm font-semibold text-white`}
                style={{
                  background: record?.statusData?.color
                    ? record?.statusData?.color
                    : "green",
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedLead(record);
                  setIsQuickEditOpen(true);
                }}
              />
            </Tooltip>
          )}
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
      setSelectedRowKeys((prev) => [...prev, value]);
    } else {
      setSelectedRowKeys((prev) => prev.filter((key) => key !== value));
    }
  };

  useEffect(() => {
    console.log("Selected rows:", selectedRowKeys);
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
        rowClassName={(record: Lead) => {
          if (isWithinNext24Hours(record.followUpDate)) {
            return "bg-green-50 hover:bg-green-100 transition-colors duration-200 animate-in-range";
          }
          if (isWithinPast24Hours(record.followUpDate)) {
            return "bg-red-50 hover:bg-red-100 transition-colors duration-200 animate-in-range";
          }
          return "animate-slide-in";
        }}
        onRow={(record: Lead) => ({
          style: {
            cursor: "pointer",
            transition: "all 0.2s",
          },
        })}
        isLoading={loading}
      />
      {selectedLead && (
        <QuickEditModal
          isOpen={isQuickEditOpen}
          onClose={() => {
            setIsQuickEditOpen(false);
            setSelectedLead(null);
          }}
          onSubmit={handleQuickUpdate}
          initialData={{
            id: selectedLead.key,
            status: selectedLead.statusData?._id || "",
            followUpDate: selectedLead.followUpDate,
            leadWonAmount: selectedLead.leadWonAmount,
            addCalender: selectedLead.addCalender, // You might want to get this from your lead data
          }}
          isLoading={isUpdating}
        />
      )}

      <style>{`
        /* Dark mode styles */
        .dark .bg-green-50 {
          background-color: rgba(16, 185, 129, 0.1) !important;
        }
        .dark .bg-red-50 {
          background-color: rgba(239, 68, 68, 0.1) !important;
        }
        .dark .bg-green-50:hover {
          background-color: rgba(16, 185, 129, 0.15) !important;
        }
        .dark .bg-red-50:hover {
          background-color: rgba(239, 68, 68, 0.15) !important;
        }
        
        /* Animation for rows in range */
        @keyframes softPulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.022); }
          100% { transform: scale(1); }
        }
        
        .animate-in-range {
          animation: softPulse 2s ease-in-out infinite;
          transform-origin: center;
        }
        
        /* Animation for new rows */
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        /* Ensure text remains visible in dark mode */
        .dark .bg-green-50 td,
        .dark .bg-red-50 td {
          color: inherit !important;
        }
        
        .animate-slide-in {
          animation: slideIn 0.4s ease-out forwards;
        }
        
        /* Optional: Add perspective for better 3D effect */
        .ant-table-tbody {
          perspective: 1000px;
        }
        
        /* Ensure smooth transitions */
        .ant-table-tbody > tr {
          transition: background-color 0.3s ease, transform 0.3s ease;
        }
        
        /* Optional: Add hover lift effect */
        .ant-table-tbody > tr:hover {
          transform: translateY(-1px);
          box-shadow: 0 2px 4px rgba(0,0,0,0.05);
        }
      `}</style>
    </div>
  );
};

export default FollowupLeads;
