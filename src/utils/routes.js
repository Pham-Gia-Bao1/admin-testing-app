import Dashboard from "../pages/DashBoard";
import Contact from "../pages/Contact";

import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import Comment from "../pages/Comment";
import User from "../pages/User";
import Expert from "../pages/Expert";

import LayoutAdmin from "../components/layout";
import Post from "../pages/Post";

export const publicRoutes = [
  {
    path: "/login",
    element: SignIn,
    exact: true,
  },
  {
    path: "/",
    element: <LayoutAdmin main={<Dashboard />} />,
    exact: true,
  },
  {
    path: "/dashboard",
    element: <LayoutAdmin main={<Dashboard />} />,
    exact: true,
  },
  {
    path: "/posts",
    element: <LayoutAdmin main={<Post />} />,
    exact: true,
  },
  {
    path: "/comments",
    element: <LayoutAdmin main={<Comment />} />,
    exact: true,
  },
  {
    path: "/user",
    element: <LayoutAdmin main={<User />} />,
    exact: true,
  },
  {
    path: "/expert",
    element: <LayoutAdmin main={<Expert />} />,
    exact: true,
  },
  {
    path: "/contact",
    element: <LayoutAdmin main={<Contact />} />,
    exact: true,
  },
  {
    path: "/signup",
    element: <LayoutAdmin main={<SignUp />} />,
    exact: true,
  },
];

export const privateRoutes = [];
