import React, { Fragment, useState, useEffect } from "react";
import PropTypes from "prop-types";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { CircularProgress } from "@material-ui/core";

const style = {
  container: {
    height: "100vh",
    width: "100vw",
    position: "fixed",
    zIndex: "100",
    background: "#000000",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  }
};

const useStyles = makeStyles(style);

function Loading() {
  const classes = useStyles();
  return (
    <Fragment>
      <div className={classes.container}>
        <CircularProgress color="primary" />
      </div>
    </Fragment>
  );
}
export default Loading;
