import { Action } from "@remix-run/router";
import React, { FC } from "react";
import { Navigate } from "react-router-dom";

const AuthLayout : FC = () => {
  if (!Action) {}
  return <Navigate to={"/login"} replace />
}
export default AuthLayout