import React, { Fragment, useState, useEffect } from "react";
import PropTypes from "prop-types";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

import LinksItems from "./LinksItems";

const style = {};

const useStyles = makeStyles(style);

function LinksDisplaySection({ profileState, profileLinkState }) {
  const classes = useStyles();
  return (
    <Fragment>
      <div
        className="manage_links_display_wrapper"
        style={{ background: profileState.bgColor }}
      >
        <div
          className="links_display_tippi_branding"
          style={{ background: profileState.bgColor }}
        >
          <p style={{ color: `${profileState.textColor}` }}>TIIPIROSE</p>
        </div>
        <div
          style={{
            width: "100%"
          }}
          className="center_component flex_column"
        >
          <div className="center_component">
            <div className="vip_show_header">
              <div>
                {profileState.img ? (
                  <img src="" alt="profile pic" />
                ) : (
                  <div className="vip_show_no_avatar">B</div>
                )}
              </div>
              <div
                className="ph2 center_component"
                style={{ color: `${profileState.textColor}` }}
              >
                {/* {product.userName.toUpperCase()} */}
              </div>
            </div>
          </div>
          <Fragment>
            <LinksItems links={profileLinkState} />
          </Fragment>
        </div>
      </div>
    </Fragment>
  );
}
export default LinksDisplaySection;
