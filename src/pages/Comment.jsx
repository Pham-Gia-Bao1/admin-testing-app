import Column from "../components/column";
import { useState, useEffect } from "react";
import { Button } from "antd";
const Comment = () => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      const token = localStorage.getItem('__token__');
      console.log('Token:', token); // Log token để kiểm tra

      if (!token) {
        console.error('No token found');
        return;
      }

      try {
        const res = await fetch('http://127.0.0.1:8000/api/admin/comments', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        console.log('HTTP Status:', res.status); // Log HTTP status

        if (!res.ok) {
          throw new Error(`Network response was not ok. Status: ${res.status}`);
        }

        const data = await res.json();
        console.log(data);
        setComments(data);
      } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
      }
    };

    fetchComments();
  }, []);
  const columns = [
    {
      title: 'Booking ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Note',
      dataIndex: 'note',
      key: 'note',
    },
    {
      title: 'Created At',
      dataIndex: 'created_at',
      key: 'created_at',
      render: (text) => new Date(text).toLocaleString(),
    },
    {
      title: 'Updated At',
      dataIndex: 'updated_at',
      key: 'updated_at',
      render: (text) => new Date(text).toLocaleString(),
    },
  ];
  return (
    <div>
      {comments.length > 0 ? (
        comments.map((comment,index) => <div key={index}>{comment.content}</div>)
      ) : (
        <p>No comments available.</p>
      )}
    </div>
  );
};

export default Comment;
