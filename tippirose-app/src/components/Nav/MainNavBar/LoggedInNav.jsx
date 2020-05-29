import React, { Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";

import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";

import PropTypes from "prop-types";

import CustomDropdown from "../../../components/CustomDropdown/CustomDropdown.js";

// @ICONS
import MenuIcon from "@material-ui/icons/Menu";
import MailIcon from "@material-ui/icons/Mail";
import InboxIcon from "@material-ui/icons/Inbox";
import MenuOpenIcon from "@material-ui/icons/MenuOpen";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import FaceIcon from "@material-ui/icons/Face";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import ShoppingCart from "@material-ui/icons/ShoppingCart";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Avatar,
} from "@material-ui/core";
import Button from "../../CustomButtons/Button.js";
import Hidden from "@material-ui/core/Hidden";
import { Link, NavLink, withRouter } from "react-router-dom";

import { logout } from "../../../features/Auth/authAction";

import navbarsStyle from "../../../assets/jss/material-kit-pro-react/views/componentsSections/navbarsStyle.js";
import Header from "components/Header/Header.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import COLOUR from "utils/COLOUR.js";

const actions = {
  logout,
};

const mapState = (state) => ({
  displayName: state.firebase.profile.displayName,
  admin: state.firebase.profile.role === "admin",
  vip: state.firebase.profile.level && state.firebase.profile.level === "vip",
});

const style = {
  navWrapper: {
    display: "flex",
  },
  navItem: {
    padding: "7px 20px",
    marginLeft: "10px",
    fontSize: "18px",
    display: "flex",
    flexDirection: "colomn",
    alignItems: "center",
    color: "white",
  },
  navAvatar: {
    fontSize: "12px",
    display: "flex",
    flexDirection: "colomn",
    alignItems: "center",
    color: "white",
  },
  navAvatarText: {
    padding: "0px 0px 0 15px",
    marginLeft: "10px",
    fontSize: "16px",
    display: "flex",
    flexDirection: "colomn",
    alignItems: "center",
    color: "white",
  },
  list: {
    width: 250,
  },
  menuItemWrapper: {
    display: "flex",
    alignItems: "center",
    flexDirection: "colomn",
    justifyContent: "space-between",
  },
};

const useStyles = makeStyles(style);

function LoggedInNav({ logout, history, displayName, admin, vip, page }) {
  const classes = useStyles();
  const [drower, setDrower] = useState(false);
  const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);
  useEffect(() => {});
  return (
    <Fragment>
      {admin && (
        <div className={classes.menuItemWrapper}>
          <NavLink to="/admin" className={classes.navItem}>
            Admin
          </NavLink>
          <NavLink to="/tshirt-builder" className={classes.navItem}>
            Builder
          </NavLink>
          <div className={classes.navAvatar}>
            <NavLink className={classes.navAvatarText}>
              {displayName && displayName}
            </NavLink>
            <Avatar className={classes.navItem}>
              {displayName && displayName.match(/\b(\w)/g).join("")}
            </Avatar>
          </div>
        </div>
      )}
    </Fragment>
  );
}

export default connect(mapState, actions)(withRouter(LoggedInNav));
