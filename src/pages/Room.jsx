import React, { useState, useEffect } from "react";
import { Table, Button, Popconfirm, message, Avatar, Modal, Select, Radio } from "antd";
import "../assets/styles/booking.css";
import { API_URL, headerAPI } from "../utils/helpers";

const { Option } = Select;

const RoomList = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [sortOption, setSortOption] = useState("name_asc");
  const [filterOption, setFilterOption] = useState("all");

  useEffect(() => {
      const token = localStorage.getItem("__token__");
    fetchRooms(token);
  }, []);

  const fetchRooms = async (token) => {
    try {
      const response = await fetch(`${API_URL}/rooms`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setRooms(data.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching rooms:", error);
    }
  };

  const handleDeleteRoom = async (record) => {
    try {
      const response = await fetch(`${API_URL}/rooms/${record.id}`, {
        method: "DELETE",
        headers: headerAPI(),
      });
      const data = await response.json();
      if (data.success) {
        setRooms((prevRooms) =>
          prevRooms.filter((room) => room.id !== record.id)
        );
        message.success("Room deleted successfully");
      }
    } catch (error) {
      console.error("Error deleting room:", error);
      message.error("Failed to delete room");
    }
  };

  const handleViewRoom = (room) => {
    setSelectedRoom(room);
    setIsModalVisible(true);
  };

  const handleSortChange = (value) => {
    setSortOption(value);

    // Copy the original rooms data to avoid mutating state directly
    let sortedRooms = [...rooms];

    switch (value) {
      case "name_asc":
        sortedRooms.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name_desc":
        sortedRooms.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "price_low":
        sortedRooms.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
        break;
      case "price_high":
        sortedRooms.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
        break;
      case "capacity_low":
        sortedRooms.sort((a, b) => a.maxCapacity - b.maxCapacity);
        break;
      case "capacity_high":
        sortedRooms.sort((a, b) => b.maxCapacity - a.maxCapacity);
        break;
      default:
        break;
    }

    setRooms(sortedRooms); // Update the state with the sorted rooms
  };
  const handleFilterChange = (e) => {
    const filterValue = e.target.value;
    setFilterOption(filterValue);

    let filteredRooms;

    if (filterValue === "no_discount") {
      filteredRooms = rooms.filter((room) => parseFloat(room.price) === 0);
    } else if (filterValue === "with_discount") {
      filteredRooms = rooms.filter((room) => parseFloat(room.discount) > 0);
    }

    setRooms(filteredRooms); // Cập nhật state với danh sách đã lọc

    if (filterValue === 'all') {
      const token = localStorage.getItem("__token__");
      fetchRooms(token); // Lấy lại danh sách phòng khi chọn "all"
    }
  };



  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (image) => <Avatar size={60} src={image} alt="Room Image" />,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      render: (description) =>
        description.length > 30 ? `${description.substring(0, 30)}...` : description,
    },
    {
      title: "Regular Price",
      dataIndex: "regularPrice",
      key: "regularPrice",
      render: (price) => `$${price}`,
    },
    {
      title: "Discount Price",
      dataIndex: "price",
      key: "price",
      render: (price) => `$${price}`,
    },
    {
      title: "Max Capacity",
      dataIndex: "maxCapacity",
      key: "maxCapacity",
    },
    {
      title: "Room Type",
      dataIndex: "room_type",
      key: "room_type",
    },
    {
      title: "Rating",
      dataIndex: "star_rating",
      key: "star_rating",
      render: (rating) => `${rating} / 5`,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <span style={{ color: status === "available" ? "green" : "red" }}>
          {status === "available" ? "Available" : "Unavailable"}
        </span>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (record) => (
        <div style={{ display: "flex", gap: "10px" }}>
          <Button type="primary" onClick={() => handleViewRoom(record)}>View</Button>
        </div>
      ),
    },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <h1>Room List</h1>

      <div style={{ marginBottom: "20px", display: "flex", gap: "10px" }}>
        <Select
          value={sortOption}
          onChange={handleSortChange}
          style={{ width: 200 }}
          placeholder="Sort Rooms"
        >
          <Option value="name_asc">Sort by name (A-Z)</Option>
          <Option value="name_desc">Sort by name (Z-A)</Option>
          <Option value="price_low">Sort by price (low first)</Option>
          <Option value="price_high">Sort by price (high first)</Option>
          <Option value="capacity_low">Sort by capacity (low first)</Option>
          <Option value="capacity_high">Sort by capacity (high first)</Option>
        </Select>

        <Radio.Group value={filterOption} onChange={handleFilterChange}>
          <Radio.Button value="all">All</Radio.Button>
          <Radio.Button value="no_discount">No discount</Radio.Button>
          <Radio.Button value="with_discount">With discount</Radio.Button>
        </Radio.Group>
      </div>

      <Table
        dataSource={rooms}
        columns={columns}
        rowKey="id"
        loading={loading}
      />

      <Modal
        title="Room Details"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={[
          <Button key="close" onClick={() => setIsModalVisible(false)}>
            Close
          </Button>,
        ]}
      >
        {selectedRoom && (
          <div>
            <img src={selectedRoom.image} alt="Room Image" />
            <p><strong>ID:</strong> {selectedRoom.id}</p>
            <p><strong>Name:</strong> {selectedRoom.name}</p>
            <p><strong>Description:</strong> {selectedRoom.description}</p>
            <p><strong>Regular Price:</strong> ${selectedRoom.regularPrice}</p>
            <p><strong>Discount Price:</strong> ${selectedRoom.price}</p>
            <p><strong>Max Capacity:</strong> {selectedRoom.maxCapacity}</p>
            <p><strong>Room Type:</strong> {selectedRoom.room_type}</p>
            <p><strong>Rating:</strong> {selectedRoom.star_rating} / 5</p>
            <p style={{ color: selectedRoom.status === 'Unavailable' ? 'red' : 'black' }}>
              <strong>Status:</strong> {selectedRoom.status}
            </p>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default RoomList;
