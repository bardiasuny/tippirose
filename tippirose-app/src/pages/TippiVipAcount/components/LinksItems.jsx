import React, { Fragment, useState, useEffect } from "react";
import PropTypes from "prop-types";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
const style = {};

const useStyles = makeStyles(style);

function LinksItems({ links }) {
  const classes = useStyles();
  return (
    <Fragment>
      {links &&
        links.map(link => (
          <Fragment key={link.id}>
            {link.visible && (
              <div
                style={{
                  background: `${link.bgColor}`
                }}
                className="vip_show_Links"
              >
                <a href={link.link} target="_blank">
                  {link.brand && (
                    <img
                      src={`/assets/linkLogo/${link.brand}.svg`}
                      style={{
                        width: 30,
                        position: "absolute",
                        left: 10
                      }}
                    />
                  )}
                  <p style={{ color: `${link.textColor}` }}>{link.name}</p>
                </a>
              </div>
            )}
          </Fragment>
        ))}
    </Fragment>
  );
}
export default LinksItems;
