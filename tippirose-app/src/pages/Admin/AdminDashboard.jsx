import React, { Fragment, useState, useEffect } from "react";
import PropTypes from "prop-types";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
const style = {};

const useStyles = makeStyles(style);

function AdminDashboard() {
  const classes = useStyles();
  return (
    <Fragment>
      <h1>AdminDashboard</h1>
    </Fragment>
  );
}
export default AdminDashboard;
