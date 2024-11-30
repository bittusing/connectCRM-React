import React, { useState, useRef, useEffect } from "react";
import { Button, Table, Input, Spin, message, Tooltip } from "antd";
import {
  DeleteFilled,
  DeleteOutlined,
  EditFilled,
  UploadOutlined,
} from "@ant-design/icons";
import FileUploadFillType from "@/components/FormElements/FileUpload/FileUploadFillType";
import ButtonDefault from "@/components/Buttons/ButtonDefault";
import CustomAntdTable from "@/components/Tables/CustomAntdTable";
import InputGroup from "@/components/FormElements/InputGroup";
import GetLocation from "@/utils/GetLocation";
import useGetLocation from "@/hooks/useGetLocation";
import AlertError from "@/components/Alerts/AlertError";
import { FaMapMarkedAlt } from "react-icons/fa";
interface Location {
  latitude: number;
  longitude: number;
}
interface FileData {
  key: string;
  serial: number;
  file: string;
  fileName: string;
  location: Location | null;
  created: string;
}

const AttachmentTab: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState<FileData[]>([]);
  const [getLocationToggle, setGetLocationToggle] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const {
    error,
    location: locationValue,
    loading,
  } = useGetLocation({
    getLocationToggle,
    setGetLocationToggle,
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
      setGetLocationToggle(true);
    }
  };

  const handleFileNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFileName(event.target.value);
  };

  const handleUpload = () => {
    if (selectedFile) {
      const newFile: FileData = {
        key: Date.now().toString(),
        serial: uploadedFiles.length + 1,
        file: selectedFile.name,
        fileName: fileName || selectedFile.name,
        location: locationValue, // You might want to get this dynamically
        created: new Date().toLocaleString(),
      };
      setUploadedFiles([...uploadedFiles, newFile]);
      setSelectedFile(null);
      setFileName("");
      setGetLocationToggle(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  useEffect(() => {
    if (!error) return;
    message.error(error, 3);
  }, [error]);

  const columns = [
    { title: "Serial", dataIndex: "serial", key: "serial" },
    { title: "File", dataIndex: "file", key: "file" },
    { title: "File Name", dataIndex: "fileName", key: "fileName" },
    {
      title: "Location",
      dataIndex: "location",
      key: "location",
      render: (value: Location) => (
        <span>
          {value
            ? `${value?.latitude}, ${value?.longitude}`
            : "No location available."}
        </span>
      ),
    },
    { title: "Created", dataIndex: "created", key: "created" },
    {
      title: "Action",
      dataIndex: "location",
      key: "action",
      render: (record: Location) => (
        <div className="flex items-center gap-2">
          <a
            href={`https://www.google.com/maps?q=${record?.latitude},${record?.longitude}`}
            target="_blank"
          >
            <Tooltip title="Click to Reveal location on Google Maps.">
              <Button
                icon={
                  <FaMapMarkedAlt className="text-xl text-blue-light dark:text-blue-light-2" />
                }
                size="middle"
                className="dark:text-white"
              />
            </Tooltip>
          </a>
          <Tooltip title="Edit this record.">
            <Button
              icon={<EditFilled className="text-xl text-green" />}
              size="middle"
              className="dark:text-white"
            />
          </Tooltip>
          <Tooltip title="Delete this record.">
            <Button
              icon={<DeleteFilled className="text-xl text-red-500" />}
              size="middle"
              className="dark:text-white"
            />
          </Tooltip>
        </div>
      ),
    },
  ];

  return (
    <div className="rounded-lg bg-white dark:bg-transparent dark:text-white">
      <div className="mb-6">
        <div className="mb-4 flex w-full items-center border-b-2 border-solid border-gray py-2">
          <span className="w-[220px] text-lg font-medium">Attach file </span>
        </div>
        <div className="flex w-full flex-col items-center space-x-4">
          <div className="flex w-full flex-col items-center gap-3 sm:flex-row">
            <div className="w-full">
              <FileUploadFillType
                onChange={handleFileChange}
                ref={fileInputRef}
                id="fileInput"
                required={true}
              />
            </div>
            {loading ? (
              <div className="flex w-full items-center justify-center gap-4">
                <Spin />
                Fetching location...
              </div>
            ) : (
              // <div className="flex w-full items-center gap-4">
              <InputGroup
                placeholder="Upload file to fetch your current location."
                customClasses="w-full"
                value={
                  locationValue
                    ? `${locationValue?.latitude}, ${locationValue?.longitude}`
                    : "Upload file to fetch your current location."
                }
                readOnly
              />

              // </div>
            )}
            <InputGroup
              placeholder="Enter File Name"
              value={fileName}
              onChange={handleFileNameChange}
              customClasses="w-full"
            />
            <div className="flex gap-3">
              <ButtonDefault
                mode="link"
                disabled={!locationValue}
                label="View on Map"
                link={`https://www.google.com/maps?q=${locationValue?.latitude},${locationValue?.longitude}`}
                target="_blank"
              />
              <ButtonDefault
                onClick={handleUpload}
                disabled={!selectedFile}
                label="Upload"
                variant="primary"
              />
            </div>
          </div>
        </div>
      </div>

      <CustomAntdTable
        columns={columns}
        dataSource={uploadedFiles}
        pagination={false}
        className="w-full"
      />
    </div>
  );
};

export default AttachmentTab;
