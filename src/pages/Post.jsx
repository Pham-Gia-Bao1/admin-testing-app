import React, { useState, useEffect } from "react";
import { Button, Table } from "antd";
import { EditFilled, DeleteFilled, EyeFilled, PlusOutlined } from "@ant-design/icons";

const Post = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch("https://jsonplaceholder.typicode.com/posts");
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
          <span>
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
    // Handle delete logic here
  };

  const handleUpdate = (record) => {
    console.log("Update record:", record);
    // Handle update logic here
  };

  const handleView = (record) => {
    console.log("View record:", record);
    // Handle view logic here
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
    <div>
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
        rowSelection={rowSelection}
        columns={columns}
        dataSource={data}
        loading={loading}
        rowClassName={rowClassName} // Apply custom row class names
      />
    </div>
  );
};

export default Post;
