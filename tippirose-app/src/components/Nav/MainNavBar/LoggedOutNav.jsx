import React, { Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";

import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";

import PropTypes from "prop-types";

// @ICONS
import MenuIcon from "@material-ui/icons/Menu";
import MailIcon from "@material-ui/icons/Mail";
import InboxIcon from "@material-ui/icons/Inbox";
import MenuOpenIcon from "@material-ui/icons/MenuOpen";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider
} from "@material-ui/core";
import Button from "../../CustomButtons/Button.js";
import Hidden from "@material-ui/core/Hidden";
import { Link, NavLink } from "react-router-dom";

import { openModal, closeModal } from "../../../features/Modals/modalActions";

const actions = {
  openModal
};

const style = {
  navWrapper: {
    display: "flex"
  },
  navItem: {
    padding: "7px 20px",
    fontSize: "14px"
  },
  list: {
    width: 250
  }
};

const useStyles = makeStyles(style);

function LoggedOutNav({ openModal }) {
  const classes = useStyles();
  const [drower, setDrower] = useState(false);
  const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);
  useEffect(() => {});
  return (
    <Fragment>
      <div className={classes.navWrapper + " mainNav-desktop"}>
        <NavLink exact to="/">
          <div class={classes.navItem}>
            <p className="white">
              <i class="fas fa-home pv1"></i> Home
            </p>
          </div>
        </NavLink>

        <NavLink to="/shop/category/shirt">
          <div class={classes.navItem}>
            <p className="white">
              <i className="far fa-address-card pv2"></i>About
            </p>
          </div>
        </NavLink>
        <div className={classes.navItem}>
          <p className="white">
            <i class="far fa-address-book pv2"></i>
            Contact
          </p>
        </div>
        <div>
          <p
            className={classes.navItem + " white link"}
            round
            onClick={() => openModal("SignUpModal")}
          >
            Singup
          </p>
        </div>
        <div>
          <Button
            size="sm"
            color="primary"
            round
            onClick={() => openModal("LoginModal")}
          >
            <ExitToAppIcon />
            <h3>LOG IN</h3>
          </Button>
        </div>
      </div>
      <div className="mainNav-mobile">
        {/* HAMBURGER MENU */}
        <div className={classes.navWrapper}>
          <div
            class={classes.navItem}
            onClick={() => (drower ? setDrower(false) : setDrower(true))}
          >
            <h1 className="white">
              {drower ? (
                <MenuOpenIcon fontSize="large" />
              ) : (
                <MenuIcon fontSize="large" />
              )}
            </h1>
          </div>
        </div>
        <Hidden mdUp>
          <SwipeableDrawer
            open={drower}
            onClose={() => setDrower(false)}
            disableBackdropTransition={!iOS}
            disableDiscovery={iOS}
          >
            <div
              onClick={() => setDrower(false)}
              style={{
                padding: "20px 0 0 20px",
                display: "flex",
                alignItems: "center"
              }}
              className="mainColor link subP"
            >
              <ArrowBackIosIcon />
              <span style={{ margin: -5 }}>CLOSE</span>
            </div>
            <div
              className={classes.list}
              role="presentation"
              style={{ width: "100vw" }}
            >
              <div
                className="center_component"
                style={{ flexDirection: "column" }}
              >
                <h4>TIPPIROSE</h4>
                <Button
                  color="white"
                  round
                  onClick={() => openModal("LoginModal")}
                >
                  <ExitToAppIcon />
                  <h3>LOG IN</h3>
                </Button>
              </div>
              <List>
                {["Inbox", "Starred", "Send email", "Drafts"].map(
                  (text, index) => (
                    <ListItem button key={text}>
                      <ListItemIcon>
                        {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                      </ListItemIcon>
                      <ListItemText primary={text} />
                    </ListItem>
                  )
                )}
              </List>
              <Divider />
              <div style={{ background: "#9c27b0", height: "100%" }}>
                <List>
                  {["All mail", "Trash", "Spam"].map((text, index) => (
                    <ListItem button key={text}>
                      <ListItemIcon className="white">
                        <p className="white">
                          {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                        </p>
                      </ListItemIcon>
                      <ListItemText className="white" primary={text} />
                    </ListItem>
                  ))}
                </List>
              </div>
            </div>
          </SwipeableDrawer>
        </Hidden>
      </div>
    </Fragment>
  );
}

export default connect(null, actions)(LoggedOutNav);
