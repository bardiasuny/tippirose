import React, { Fragment, useState, useEffect } from "react";
import PropTypes from "prop-types";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
const style = {};

const useStyles = makeStyles(style);

function LogoNav() {
  const classes = useStyles();
  return (
    <Fragment>
      <Link to="/">
        <h4 className="white">TIPPIROSE</h4>
      </Link>
    </Fragment>
  );
}
export default LogoNav;
