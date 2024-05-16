import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/DashBoard";
import Contact from "./pages/Contact";

import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Comment from "./pages/Comment";
import User from "./pages/User";
import Expert from "./pages/Expert";

import LayoutAdmin from "./components/layout";
import Post from "./pages/Post";

export default function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LayoutAdmin main={<Dashboard />} />} />
          <Route
            path="/dashboard"
            element={<LayoutAdmin main={<Dashboard />} />}
          />
          <Route path="/posts" element={<LayoutAdmin main={<Post />} />} />
          <Route
            path="/comments"
            element={<LayoutAdmin main={<Comment />} />}
          />
          <Route path="/user" element={<LayoutAdmin main={<User />} />} />
          <Route path="/expert" element={<LayoutAdmin main={<Expert />} />} />
          <Route path="/contact" element={<LayoutAdmin main={<Contact />} />} />
          <Route path="/signin" element={<LayoutAdmin main={<SignIn />} />} />
          <Route path="/signup" element={<LayoutAdmin main={<SignUp />} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
