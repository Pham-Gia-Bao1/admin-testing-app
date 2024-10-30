import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Button, Modal } from "antd";
import "../assets/styles/booking.css";
import { API_URL, fetchAPI } from "../utils/helpers";
import backupImage from "../assets/images/face-3.jpg";

const Booking = () => {
  const [bookings, setBookings] = useState([]);
  const [userInfoVisible, setUserInfoVisible] = useState(false);
  const [expertInfoVisible, setExpertInfoVisible] = useState(false);
  const [detailsVisible, setDetailsVisible] = useState(false); // New state for details modal
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const END_POINT = `${API_URL}/bookingRooms`;
    fetchBookingRooms(END_POINT);
  }, []);

  const fetchBookingRooms = async (END_POINT) => {
    try {
      const response = await fetch(END_POINT);
      const data = await response.json();
      setBookings(data);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch booking data:", error);
    }
  };

  const handleUserInfoClick = (record) => {
    setSelectedBooking(record);
    setUserInfoVisible(true);
  };

  const handleExpertInfoClick = (record) => {
    setSelectedBooking(record);
    setExpertInfoVisible(true);
  };

  const handleDetailsClick = (record) => { // New handler for details button
    setSelectedBooking(record);
    setDetailsVisible(true);
  };

  const columns = [
    {
      title: "Booking ID",
      dataIndex: "id",
      key: "id",
      className: "booking-id-column",
    },
    {
      title: "Guest ID",
      dataIndex: "guest_id",
      key: "guest_id",
      className: "guest-id-column",
    },
    {
      title: "Room ID",
      dataIndex: "room_id",
      key: "room_id",
      className: "room-id-column",
    },
    {
      title: "Check-in Date",
      dataIndex: "check_in_date",
      key: "check_in_date",
      render: (text) => new Date(text).toLocaleString(),
    },
    {
      title: "Check-out Date",
      dataIndex: "check_out_date",
      key: "check_out_date",
      render: (text) => new Date(text).toLocaleString(),
    },
    {
      title: "Total Price",
      dataIndex: "total_price",
      key: "total_price",
      className: "total-price-column",
      render: (price) => `$${parseFloat(price).toFixed(2)}`,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      className: "status-column",
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <Button onClick={() => handleDetailsClick(record)}>View Details</Button>
      ),
    },
  ];

  return (
    <div style={{ overflowX: "auto" }}>
      <h1>Bookings</h1>
      <Table
        loading={loading}
        dataSource={bookings}
        columns={columns}
        rowKey="id"
      />

      {/* Booking Details Modal */}
      <Modal
        title="Booking Details"
        visible={detailsVisible}
        onCancel={() => setDetailsVisible(false)}
        footer={null}
      >
        {selectedBooking && (
          <div>
            <p>Booking ID: {selectedBooking.id}</p>
            <p>Guest Name: {selectedBooking.guest_name}</p>
            <p>Room ID: {selectedBooking.room_id}</p>
            <p>Check-in Date: {new Date(selectedBooking.check_in_date).toLocaleString()}</p>
            <p>Check-out Date: {new Date(selectedBooking.check_out_date).toLocaleString()}</p>
            <p>Total Price: ${parseFloat(selectedBooking.total_price).toFixed(2)}</p>
            <p>Status: {selectedBooking.status}</p>
            <p>Payment Status: {selectedBooking.payment_status ? "Paid" : "Unpaid"}</p>
          </div>
        )}
      </Modal>

      {/* User Info Modal */}
      <Modal
        title="User Information"
        visible={userInfoVisible}
        onCancel={() => setUserInfoVisible(false)}
        footer={null}
      >
        {selectedBooking && selectedBooking.user && (
          <div>
            <img
              src={selectedBooking.user.profile_picture ?? backupImage}
              alt=""
            />
            <p>Name: {selectedBooking.user.name}</p>
            <p>Email: {selectedBooking.user.email}</p>
            <p>Address: {selectedBooking.user.address}</p>
            <p>Phone Number: {selectedBooking.user.phone_number}</p>
          </div>
        )}
      </Modal>

      {/* Expert Info Modal */}
      <Modal
        title="Expert Information"
        visible={expertInfoVisible}
        onCancel={() => setExpertInfoVisible(false)}
        footer={null}
      >
        {selectedBooking &&
          selectedBooking.calendar &&
          selectedBooking.calendar.expert_detail &&
          selectedBooking.calendar.expert_detail.user && (
            <div>
              <img
                src={
                  selectedBooking.calendar.expert_detail.user.profile_picture ??
                  backupImage
                }
                alt=""
              />
              <p>Name: {selectedBooking.calendar.expert_detail.user.name}</p>
              <p>Email: {selectedBooking.calendar.expert_detail.user.email}</p>
              <p>
                Experience: {selectedBooking.calendar.expert_detail.experience}
              </p>
              <p>
                Average Rating:{" "}
                {selectedBooking.calendar.expert_detail.average_rating}
              </p>
              <p>
                Start Time:{" "}
                {new Date(selectedBooking.calendar.start_time).toLocaleString()}
              </p>
              <p>
                End Time:{" "}
                {new Date(selectedBooking.calendar.end_time).toLocaleString()}
              </p>
              <p>Price: ${selectedBooking.calendar.price}</p>
              <p>Description: {selectedBooking.calendar.describe}</p>
            </div>
          )}
      </Modal>
    </div>
  );
};

export default Booking;
