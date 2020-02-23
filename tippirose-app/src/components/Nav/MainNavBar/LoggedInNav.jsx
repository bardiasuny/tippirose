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
  Avatar
} from "@material-ui/core";
import Button from "../../CustomButtons/Button.js";
import Hidden from "@material-ui/core/Hidden";
import { Link, NavLink, withRouter } from "react-router-dom";

import { logout } from "../../../features/Auth/authAction";

import navbarsStyle from "../../../assets/jss/material-kit-pro-react/views/componentsSections/navbarsStyle.js";
import Header from "components/Header/Header.js";
import HeaderLinks from "components/Header/HeaderLinks.js";

const actions = {
  logout
};

const mapState = state => ({
  displayName: state.firebase.profile.displayName,
  admin: state.firebase.profile.role === "admin",
  vip: state.firebase.profile.level && state.firebase.profile.level === "vip"
});

const style = {
  navWrapper: {
    display: "flex"
  },
  navItem: {
    padding: "7px 20px",
    fontSize: "14px",
    display: "flex",
    flexDirection: "colomn",
    alignItems: "center"
  },
  navAvatar: {
    fontSize: "12px",
    display: "flex",
    flexDirection: "colomn",
    alignItems: "center"
  },
  list: {
    width: 250
  }
};

const useStyles = makeStyles(style);

function LoggedInNav({ logout, history, displayName, admin, vip }) {
  const classes = useStyles();
  const [drower, setDrower] = useState(false);
  const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);
  useEffect(() => {});
  return (
    <Fragment>
      <Header
        brand="TIPPIROSE"
        changeColorOnScroll="dark"
        links={
          <HeaderLinks
            dropdownHoverColor="dark"
            logout={logout}
            displayName={displayName}
            admin={admin}
            history={history}
            navAvatar={classes.navAvatar}
            vip={vip}
          />
          // <div className={classes.navWrapper + " mainNav-desktop"}>
          //   <NavLink exact to="/">
          //     <div class={classes.navItem}>
          //       <p className="white">
          //         <i class="fas fa-home pv1"></i> Home
          //       </p>
          //     </div>
          //   </NavLink>

          //   <NavLink to="/shop/category/shirt">
          //     <div class={classes.navItem}>
          //       <p className="white">
          //         <i className="far fa-address-card pv2"></i>Shop
          //       </p>
          //     </div>
          //   </NavLink>
          //   <div className={classes.navItem}>
          //     <p className="white">
          //       <i class="far fa-address-book pv2"></i>
          //       Contact
          //     </p>
          //   </div>
          //   {admin && (
          //     <NavLink to={admin && "/admin"}>
          //       <div class={classes.navItem}>
          //         <p className="white">{admin && "Admin"}</p>
          //       </div>
          //     </NavLink>
          //   )}

          //   <div>
          //     <CustomDropdown
          //       left
          //       caret={true}
          //       hoverColor="dark"
          //       dropdownHeader="Dropdown Header"
          //       buttonText={
          //         <div className={classes.navAvatar}>
          //           <span className="white">{displayName && displayName}</span>
          //           <Avatar className="mainColorBg mv2">
          //             <h4>
          //               {displayName && displayName.match(/\b(\w)/g).join("")}
          //             </h4>
          //           </Avatar>
          //         </div>
          //       }
          //       buttonProps={{
          //         className: "",

          //         color: "transparent"
          //       }}
          //       dropdownList={[
          //         "Me",
          //         <p onClick={() => logout(history)}>Sign Out </p>
          //       ]}
          //     />
          //   </div>
          //   <div>
          //     <Button color="transparent">
          //       <p className="white">
          //         <ShoppingCart /> 0 items
          //       </p>
          //     </Button>
          //   </div>
          // </div>
        }
        fixed
        color="transparent"
        changeColorOnScroll={{
          height: 100,
          color: "rose"
        }}
      />
      {/* <div className="mainNav-mobile">
        
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
                <Button color="white" round onClick={() => logout(history)}>
                  <ExitToAppIcon />
                  <h3>LOGOUT</h3>
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
      </div> */}
    </Fragment>
  );
}

export default connect(mapState, actions)(withRouter(LoggedInNav));
