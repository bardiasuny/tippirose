import React, { Fragment, useState, useEffect } from "react";
import PropTypes from "prop-types";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// PAGES
import LoggedOutNav from "./LoggedOutNav";
import LogoNav from "../../Branding/LogoNav";
import LoggedInNav from "./LoggedInNav";
import { connect } from "react-redux";

const mapState = (state) => ({
  auth: state.firebase.auth,
});
const style = {
  mainNavWrapper: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "black",
    height: "70px",
    width: "100%",
  },
  itemsWrapper: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-around",
    height: "100px",
    width: "80%",
  },
  menuItemWrapper: {},
};

const useStyles = makeStyles(style);

function NavBarCostum({ auth, page }) {
  const classes = useStyles();
  const authenticated = !auth.isEmpty && auth.isLoaded;
  return (
    <div>
      <div className={classes.mainNavWrapper}>
        <div className={classes.itemsWrapper}>
          <div className={classes.navLogo}>
            <LogoNav />
          </div>

          <div className={classes.menuItemWrapper}>
            {authenticated ? <LoggedInNav page={page} /> : <LoggedOutNav />}
          </div>
        </div>
      </div>
    </div>
  );
}
export default connect(mapState)(NavBarCostum);
