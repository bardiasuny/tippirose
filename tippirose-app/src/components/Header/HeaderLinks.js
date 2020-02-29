/* eslint-disable */
import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// react components for routing our app without refresh
import { Link, NavLink } from "react-router-dom";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Icon from "@material-ui/core/Icon";

// @material-ui/icons
import Apps from "@material-ui/icons/Apps";
import ShoppingCart from "@material-ui/icons/ShoppingCart";
import Favorite from "@material-ui/icons/Favorite"

import ViewDay from "@material-ui/icons/ViewDay";
import Dns from "@material-ui/icons/Dns";
import Build from "@material-ui/icons/Build";
import ListIcon from "@material-ui/icons/List";

import ViewCarousel from "@material-ui/icons/ViewCarousel";
import AccountBalance from "@material-ui/icons/AccountBalance";
import ArtTrack from "@material-ui/icons/ArtTrack";

import Layers from "@material-ui/icons/Layers";
import ShoppingBasket from "@material-ui/icons/ShoppingBasket";
import LineStyle from "@material-ui/icons/LineStyle";

// core components
import CustomDropdown from "components/CustomDropdown/CustomDropdown.js";
import Button from "components/CustomButtons/Button.js";

import styles from "assets/jss/material-kit-pro-react/components/headerLinksStyle.js";
import { Avatar } from "@material-ui/core";

const useStyles = makeStyles(styles);

export default function HeaderLinks(props) {
  const easeInOutQuad = (t, b, c, d) => {
    t /= d / 2;
    if (t < 1) return (c / 2) * t * t + b;
    t--;
    return (-c / 2) * (t * (t - 2) - 1) + b;
  };

  const smoothScroll = (e, target) => {
    if (window.location.pathname === "/sections") {
      var isMobile = navigator.userAgent.match(
        /(iPad)|(iPhone)|(iPod)|(android)|(webOS)/i
      );
      if (isMobile) {
        // if we are on mobile device the scroll into view will be managed by the browser
      } else {
        e.preventDefault();
        var targetScroll = document.getElementById(target);
        scrollGo(document.documentElement, targetScroll.offsetTop, 1250);
      }
    }
  };
  const scrollGo = (element, to, duration) => {
    var start = element.scrollTop,
      change = to - start,
      currentTime = 0,
      increment = 20;

    var animateScroll = function () {
      currentTime += increment;
      var val = easeInOutQuad(currentTime, start, change, duration);
      element.scrollTop = val;
      if (currentTime < duration) {
        setTimeout(animateScroll, increment);
      }
    };
    animateScroll();
  };
  var onClickSections = {};

  const { dropdownHoverColor, admin, vip, displayName, history, logout, navAvatar } = props;
  const classes = useStyles();
  return (
    <List className={classes.list + " " + classes.mlAuto}>
      <ListItem className={classes.listItem}>
        <CustomDropdown
          noLiPadding
          navDropdown
          hoverColor={dropdownHoverColor}
          buttonText="Categories"
          buttonProps={{
            className: classes.navLink,
            color: "transparent"
          }}
          buttonIcon={Apps}
          dropdownList={[
            <NavLink to="/shop/accessories" className={classes.dropdownLink}>
              <LineStyle className={classes.dropdownIcons} /> Accessories
            </NavLink>,
            <NavLink to="/shop/clothing" className={classes.dropdownLink}>
              <Layers className={classes.dropdownIcons} />
              Clothing
            </NavLink>,
            <NavLink to="/shop/fabric" className={classes.dropdownLink}>
              <Icon className={classes.dropdownIcons}>content_paste</Icon>
              Fabric
            </NavLink>
          ]}
        />
      </ListItem>
      {admin && <ListItem className={classes.listItem}>
        <CustomDropdown
          noLiPadding
          navDropdown
          hoverColor={dropdownHoverColor}
          buttonText="Admin"
          buttonProps={{
            className: classes.navLink,
            color: "transparent"
          }}
          buttonIcon={ViewDay}
          dropdownList={[
            <Link
              to="/admin"
              className={classes.dropdownLink}

            >
              <Dns className={classes.dropdownIcons} /> Dashboard
            </Link>,
            <Link
              to="/admin/products"
              className={classes.dropdownLink}

            >
              <Build className={classes.dropdownIcons} /> Products
            </Link>,
            <Link
              to="/admin/add-product"
              className={classes.dropdownLink}

            >
              <ListIcon className={classes.dropdownIcons} /> Add Products
            </Link>

          ]}
        />
      </ListItem>}
      {vip && <ListItem className={classes.listItem}>
        <CustomDropdown
          noLiPadding
          navDropdown
          hoverColor={dropdownHoverColor}
          buttonText="VIP"
          buttonProps={{
            className: classes.navLink,
            color: "transparent"
          }}
          buttonIcon={Apps}
          dropdownList={[
            <NavLink to="/account/vip" className={classes.dropdownLink}>
              VIP Dashboard
            </NavLink>,
            <NavLink to="/account/vip/my-products" className={classes.dropdownLink}>
              My Products
          </NavLink>,
            <NavLink to="/account/vip/profiles" className={classes.dropdownLink}>
              My Profiles
        </NavLink>

          ]}
        />
      </ListItem>}
      <ListItem className={classes.listItem}>
        <CustomDropdown
          noLiPadding
          navDropdown
          hoverColor={dropdownHoverColor}
          buttonText={
            <div className={navAvatar}>
              <span >{displayName && displayName}</span>
              <Avatar className="mainColorBg mv2">
                <h4>
                  {displayName && displayName.match(/\b(\w)/g).join("")}
                </h4>
              </Avatar>
            </div>
          }
          buttonProps={{
            className: classes.navLink,
            color: "transparent"
          }}
          buttonIcon={ViewCarousel}
          dropdownList={[
            <Link to="/about-us" className={classes.dropdownLink}>
              <AccountBalance className={classes.dropdownIcons} /> About Us
            </Link>,
            <div onClick={() => logout(history)} className={classes.dropdownLink}>
              <ArtTrack className={classes.dropdownIcons} /> Logout
            </div>,
            <Link onClick={() => logout(history)} className={classes.dropdownLink}>
              <ArtTrack className={classes.dropdownIcons} /> Logout
          </Link>,

          ]}
        />
      </ListItem>

      <ListItem className={classes.listItem}>

        <Link to="/shop/favourites">

          <Button
            justIcon
            simple
            color="rose"

          >
            <Favorite />
          </Button>
        </Link>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Button

          color="transparent"
          target="_blank"
          className={classes.navButton}
          round
        >
          <ShoppingCart className={classes.icons} /> 0
        </Button>
      </ListItem>
    </List>
  );
}

HeaderLinks.defaultProps = {
  hoverColor: "primary"
};

HeaderLinks.propTypes = {
  dropdownHoverColor: PropTypes.oneOf([
    "dark",
    "primary",
    "info",
    "success",
    "warning",
    "danger",
    "rose"
  ])
};
