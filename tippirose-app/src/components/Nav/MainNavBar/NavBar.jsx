import React, { Fragment, useState, useEffect } from "react";
import PropTypes from "prop-types";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// PAGES
import LoggedOutNav from "./LoggedOutNav";
import LogoNav from "../../Branding/LogoNav";
import LoggedInNav from "./LoggedInNav";
import { connect } from "react-redux";

const mapState = state => ({
  auth: state.firebase.auth
});

const style = {
  mainNavWrapper: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between"
  }
};

const useStyles = makeStyles(style);

function NavBar({ auth }) {
  const classes = useStyles();
  const authenticated = !auth.isEmpty && auth.isLoaded;
  return (
    <div>
      <div className={classes.mainNavWrapper}>
        {!authenticated && (
          <div className={classes.navLogo}>
            <LogoNav />
          </div>
        )}
        {authenticated ? <LoggedInNav /> : <LoggedOutNav />}
      </div>
    </div>
  );
}
export default connect(mapState)(NavBar);
