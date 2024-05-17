import React, { useState, useEffect } from "react";
import { Button, Table } from "antd";
import { EditFilled, DeleteFilled, EyeFilled, PlusOutlined } from "@ant-design/icons";

const Post = ({ apiEndpoint = "https://jsonplaceholder.typicode.com/posts", onDelete, onUpdate, onView }) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    fetchData();
  }, [apiEndpoint]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch(apiEndpoint);
      const postData = await response.json();
      setData(postData);

      // Generate columns dynamically based on the keys of the first data item
      const firstItemKeys = Object.keys(postData[0]);
      const generatedColumns = firstItemKeys.map((key) => ({
        title: key,
        dataIndex: key,
        key: key,
        width: "10%", // Set column width to 10% of table width
      }));

      // Add action buttons column
      generatedColumns.push({
        title: 'Action',
        key: 'action',
        width: "10%", // Set column width to 10% of table width
        render: (text, record) => (
          <span style={{
             
          }}>
            <Button type="primary" onClick={() => handleUpdate(record)}>
              <EditFilled />
            </Button>
            <Button type="primary" danger onClick={() => handleDelete(record)}>
              <DeleteFilled />
            </Button>
            <Button type="default" onClick={() => handleView(record)}>
              <EyeFilled />
            </Button>
          </span>
        ),
      });

      setColumns(generatedColumns);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (record) => {
    console.log("Delete record:", record);
    if (onDelete) {
      onDelete(record);
    }
  };

  const handleUpdate = (record) => {
    console.log("Update record:", record);
    if (onUpdate) {
      onUpdate(record);
    }
  };

  const handleView = (record) => {
    console.log("View record:", record);
    if (onView) {
      onView(record);
    }
  };

  const onSelectChange = (newSelectedRowKeys) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const hasSelected = selectedRowKeys.length > 0;

  const rowClassName = (record, index) => {
    return index % 2 === 0 ? "even-row" : "odd-row"; // Apply different class names for even and odd rows
  };

  return (
    <div style={{ overflowX: 'auto' }}>
      <div
        style={{
          marginBottom: 16,
        }}
      >
        <Button
          type="primary"
          onClick={fetchData}
          disabled={loading}
          loading={loading}
        >
          Reload
        </Button>
        <span
          style={{
            marginLeft: 8,
          }}
        >
          {hasSelected ? `Selected ${selectedRowKeys.length} items` : ""}
        </span>
      </div>
      <Table
        scroll={{ x: true }}
        columns={columns}
        dataSource={data}
        loading={loading}
        rowClassName={rowClassName} // Apply custom row class names
      />
    </div>
  );
};

export default Post;
