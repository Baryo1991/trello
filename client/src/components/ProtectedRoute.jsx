import { Alert } from "react-bootstrap";
import React from "react";
import { Spinner } from "react-bootstrap";
import { Redirect, Route } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import * as storageKeys from "../constants/storageKeys";
import StorageService from "./storageService";

const ProtectedRoute = ({ component: Component, ...rest }) => {
//   const { user, loading, error } = useAuth();
    const user = StorageService.get(storageKeys.currentUser);

//   if (loading) return <Spinner />;
//   if (error) return <Alert variant="danger">{error}</Alert>;

  return (
    <Route
      {...rest}
      render={() => {
        return user ? <Component /> : <Redirect to={"/login"} />;
      }}
    />
  );
};

export default ProtectedRoute;
