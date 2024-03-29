import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PrivateRoutes() {
  const { currentUser } = useSelector((state) => state.user.user);
  return currentUser ? <Outlet /> : <Navigate to="/sign-in" />;
}
