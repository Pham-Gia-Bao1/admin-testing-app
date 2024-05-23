import { useEffect, useState } from "react";
import { Button, Modal, Table } from "antd";
import axios from "axios";
import { fetchAPIUserExpert } from "../utils/helpers";

const Expert = () => {
  const [experts, setExperts] = useState([]);
  const [userInfoVisible, setUserInfoVisible] = useState(false);
  const [selectedExpert, setSelectedExpert] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const END_POINT = "http://127.0.0.1:8000/api/admin/experts";
      await fetchAPIUserExpert(END_POINT, setExperts);
      setLoading(false);
    };

    fetchData();
  }, []);

  const handleUserInfoClick = (user) => {
    setSelectedExpert(user.expert);
    setUserInfoVisible(true);
  };

  const handleUpdateExpert = async (expert) => {
    try {
      const END_POINT = `http://127.0.0.1:8000/api/admin/experts/${expert.id}`;
      const updatedData = {
        status: 1,
      };
      const token = localStorage.getItem("__token__");
      console.log(token);
      const headers = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      };
      const result = await axios.put(END_POINT, updatedData, { headers });
      console.log("Updated expert:", result.data);

      // Update the state with the updated expert data
      const updatedExperts = experts.map((ex) =>
        ex.id === expert.id ? { ...ex, ...result.data } : ex
      );
      setExperts(updatedExperts);
    } catch (error) {
      console.error("Error updating expert:", error);
    }
  };

  const handleDeleteExpert = (expert) => {
    // Your delete logic here
  };

  const columns = [
    {
      title: "STT",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Phone Number",
      dataIndex: "phone_number",
      key: "phone_number",
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Actions",
      key: "actions",
      render: (record) => (
        <>
          <Button onClick={() => handleUserInfoClick(record)}>View</Button>
          <Button onClick={() => handleUpdateExpert(record)}>Update</Button>
          <Button danger onClick={() => handleDeleteExpert(record)}>Delete</Button>
        </>
      ),
    },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <h1>Expert List</h1>
      <Table
        scroll={{ x: true }}
        dataSource={experts}
        columns={columns}
        rowKey="id"
        loading={loading}
      />
      <Modal
        title="Expert Information"
        visible={userInfoVisible}
        onCancel={() => setUserInfoVisible(false)}
        footer={null}
      >
        {selectedExpert && (
          <div>
            <p>STT: {selectedExpert.user_id}</p>
            <p>Experience: {selectedExpert.experience}</p>
            <p>Certificate</p>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "start",
                alignItems: "center",
                gap: "10px",
                backgroundColor: "red",
              }}
            >
              <img
                style={{
                  width: "100%",
                }}
                src={selectedExpert.certificate}
                alt=""
              />
            </div>
            <p>Rating: {selectedExpert.average_rating}</p>
            <p>Create at: {selectedExpert.created_at}</p>
            <p>Update at: {selectedExpert.updated_at}</p>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Expert;
