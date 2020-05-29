import React, { Fragment, useState, useEffect } from "react";
import PropTypes from "prop-types";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
const style = {};

const useStyles = makeStyles(style);

function AdminDashboard() {
  const classes = useStyles();
  return (
    <Fragment>
      <h1>Admin Dashboard</h1>
      <Link to="/admin/plain-product-manager">
        <Button>Plain Product Manager</Button>
      </Link>
    </Fragment>
  );
}
export default AdminDashboard;
