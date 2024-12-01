import React, { useState } from "react";
import { Calendar, Badge, Popover } from "antd";
import type { Dayjs } from "dayjs";
import type { BadgeProps } from "antd";
import dayjs from "dayjs";

interface CalendarEvent {
  type: BadgeProps["status"];
  content: string;
}

const getListData = (value: Dayjs): CalendarEvent[] => {
  const listData: CalendarEvent[] = [];

  // Add more events here
  switch (value.date()) {
    case 1:
      listData.push(
        { type: "warning", content: "Redesign Website" },
        { type: "success", content: "Team Meeting" },
      );
      break;
    case 10:
      listData.push(
        { type: "error", content: "Project Deadline" },
        { type: "warning", content: "Review Meeting" },
      );
      break;
    case 15:
      listData.push(
        { type: "success", content: "Product Launch" },
        { type: "processing", content: "Client Call" },
      );
      break;
    case 20:
      listData.push(
        { type: "warning", content: "Sprint Planning" },
        { type: "error", content: "Reports Due" },
      );
      break;
    case 25:
      listData.push(
        { type: "success", content: "App Design" },
        { type: "warning", content: "QA Testing" },
      );
      break;
  }

  return listData;
};

const EventModal = ({ listData }: { listData: CalendarEvent[] }) => (
  <ul className="events">
    {listData.map((item, index) => (
      <li key={index + (item.type || "calenderEvent")}>
        <Badge status={item.type} text={item.content} />
      </li>
    ))}
  </ul>
);

const CalendarBox: React.FC = () => {
  const [value, setValue] = useState(() => dayjs(new Date()));
  const [selectedValue, setSelectedValue] = useState(() => dayjs("2017-01-25"));

  const onSelect = (newValue: Dayjs) => {
    setValue(newValue);
    setSelectedValue(newValue);
  };

  const onPanelChange = (newValue: Dayjs) => {
    setValue(newValue);
  };

  // Add cell render function to display events
  const dateCellRender = (value: Dayjs) => {
    const listData = getListData(value);
    return (
      <Popover
        content={<EventModal listData={listData} />}
        title={"Event details"}
        trigger={[ "hover"]}
      >
        <ul className="events">
          {listData.map((item, index) => (
            <li key={index + (item.type || "calenderEvent")}>
              <Badge status={item.type} text={item.content} />
            </li>
          ))}
        </ul>
      </Popover>
    );
  };

  return (
    <>
      <Calendar
        value={value}
        onSelect={onSelect}
        onPanelChange={onPanelChange}
        cellRender={(current, info) => {
          if (info.type === "date") return dateCellRender(current);
          return info.originNode;
        }}
      />
      <style>{`
        .dark .ant-picker-calendar.ant-picker-calendar-full .ant-picker-panel {
          background: #122031 !important;
        }

        .dark
          .ant-picker-calendar.ant-picker-calendar-full
          .ant-picker-cell-in-view.ant-picker-cell-selected
          .ant-picker-calendar-date,
        .ant-picker-calendar.ant-picker-calendar-full
          .ant-picker-cell-in-view.ant-picker-cell-selected
          .ant-picker-calendar-date-today {
          background-color: #374151;
        }

        .ant-picker-calendar.ant-picker-calendar-full
          .ant-picker-cell-in-view.ant-picker-cell-selected
          .ant-picker-calendar-date,
        .ant-picker-calendar.ant-picker-calendar-full
          .ant-picker-cell-in-view.ant-picker-cell-selected
          .ant-picker-calendar-date-today {
          background-color: #e6f4ff;
        }

        .ant-picker-calendar {
          background: transparent !important;
        }

        .ant-picker-calendar .ant-picker-content th {
          color: white;
          text-align: center;
        }

        .ant-picker-calendar .ant-picker-content thead {
          background: #5750f1;
          font-size: 18px;
          font-weight: 800;
          font-family: "Satoshi";
          height: 41px;
        }

        .dark .ant-picker-calendar .ant-picker-cell {
          color: rgb(156 163 175);
        }

        .dark .ant-picker-calendar .ant-picker-cell-in-view {
          color: white;
        }

        .dark
          .ant-picker-calendar.ant-picker-calendar-full
          .ant-picker-calendar-date {
          border-color: white;
        }

        .ant-picker-calendar.ant-picker-calendar-full
          .ant-picker-cell-selected
          .ant-picker-calendar-date
          .ant-picker-calendar-date-value,
        .ant-picker-calendar.ant-picker-calendar-full
          .ant-picker-cell-selected:hover
          .ant-picker-calendar-date
          .ant-picker-calendar-date-value,
        .ant-picker-calendar.ant-picker-calendar-full
          .ant-picker-cell-selected
          .ant-picker-calendar-date-today
          .ant-picker-calendar-date-value,
        .ant-picker-calendar.ant-picker-calendar-full
          .ant-picker-cell-selected:hover
          .ant-picker-calendar-date-today
          .ant-picker-calendar-date-value {
          font-size: 24px;
        }

        .ant-picker-calendar.ant-picker-calendar-full
          .ant-picker-cell-selected
          .ant-picker-calendar-date
          .ant-picker-calendar-date-value,
        .ant-picker-calendar.ant-picker-calendar-full
          .ant-picker-cell-selected:hover
          .ant-picker-calendar-date
          .ant-picker-calendar-date-value,
        .ant-picker-calendar.ant-picker-calendar-full
          .ant-picker-cell-selected
          .ant-picker-calendar-date-today
          .ant-picker-calendar-date-value,
        .ant-picker-calendar.ant-picker-calendar-full
          .ant-picker-cell-selected:hover
          .ant-picker-calendar-date-today
          .ant-picker-calendar-date-value {
          color: #3183f6;
          font-size: 26px;
          font-weight: 600;
        }

        .ant-picker-calendar .ant-picker-calendar-header {
          border-radius: 8px;
          background: #5750f1;
          padding: 12px 12px;
        }

        /* Add styles for events */
        .events {
          margin: 0;
          padding: 0;
          list-style: none;
        }

        .events .ant-badge-status {
          width: 100%;
          overflow: hidden;
          font-size: 12px;
          white-space: nowrap;
          text-overflow: ellipsis;
        }

        .events .ant-badge-status-dot {
          display: inline-block;
          margin-right: 4px;
        }

        .events .ant-badge-status-text {
          color: rgba(0, 0, 0, 0.88);
        }

        .dark .events .ant-badge-status-text {
          color: rgba(255, 255, 255, 0.88);
        }

        .ant-picker-calendar-full
          .ant-picker-panel
          .ant-picker-calendar-date-content {
          height: 60px;
          overflow: hidden;
        }

        .dark .ant-popover .ant-popover-inner {
          background: black !important;
          box-shadow:
            0 6px 16px 0 rgb(255 255 255 / 8%),
            0 3px 6px -4px rgb(255 243 243 / 12%),
            0 9px 28px 8px rgb(255 255 255 / 5%);
        }
        .dark .ant-popover .ant-popover-title {
          color: white !important;
        }
      `}</style>
    </>
  );
};

export default CalendarBox;
