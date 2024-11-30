import React from "react";
import { statusStatsType } from "@/types/statusStats";
import { DoubleRightOutlined } from "@ant-design/icons";

interface DataStatsProps {
  dataList: statusStatsType[];
}
const StatusStats: React.FC<DataStatsProps> = ({ dataList }) => {
  return (
    <>
      <div className="flex w-full gap-4 overflow-auto">
        {dataList.map((item, index) => (
          <div
            key={index}
            className="flex w-full min-w-[268px] items-center gap-4 rounded-[10px] bg-white p-4 shadow-1 dark:bg-gray-dark sm:block sm:gap-0 sm:p-6"
          >
            <div
              className="flex min-h-11 min-w-11 items-center justify-center rounded-full text-2xl text-white sm:max-h-14.5 sm:min-h-14.5 sm:min-w-14.5 sm:max-w-14.5"
              style={{ backgroundColor: item.color }}
            >
              {item.icon}
            </div>

            <div className="mt-0 flex items-end justify-between gap-2 sm:mt-6 sm:gap-0 w-full">
              <div className="w-full">
                <div className="mb-1.5 flex items-center justify-between text-heading-6 font-bold text-dark dark:text-white">
                  <h4 className=" font-medium">{item.value}</h4>
                  <h4 className=" font-medium">
                    <DoubleRightOutlined />{" "}
                  </h4>
                  <h4 className=" font-medium">{item.nextValue}</h4>
                </div>
                <span className="text-body-sm  font-medium"> {item.title}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default StatusStats;
