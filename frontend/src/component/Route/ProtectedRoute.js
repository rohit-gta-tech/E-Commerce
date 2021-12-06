import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import Loader from "../layout/Loader/Loader";

const ProtectedRoute = ({ isAdmin }) => {
  const { isAuthenticated, loading, user } = useSelector((state) => state.user);

  return (
    <Fragment>
      {(loading === undefined || loading === true) && <Loader />}
      {loading === false && !isAuthenticated && <Navigate to='/login' />}
      {loading === false && isAuthenticated && !isAdmin && <Outlet />}
      {loading === false && isAuthenticated && isAdmin && user.role !== 'admin' && <Navigate to='login' />}
      {loading === false && isAuthenticated && isAdmin && user.role === 'admin' && <Outlet />}
    </Fragment>
  )
};

export default ProtectedRoute;