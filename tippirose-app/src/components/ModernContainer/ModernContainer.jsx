import React, { Fragment } from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Parallax from "../Parallax/Parallax.js";
import { Box, Button } from "@material-ui/core";

const styles = {
  positionWrapper: {
    marginTop: "-45px",
    width: "90%",
    backgroundColor: "#fff",

    paddingBottom: 35,
    margin: "0 auto"
  },
  position: {
    position: "relative",
    marginLeft: "auto",
    marginRight: "auto",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 30,
    boxShadow: "0px 5px 10px #4637378c"
  },
  header: {
    height: 600,
    width: "100%",
    overflow: "hidden"
  },
  headerTitle: {
    color: "white",
    fontSize: "500%",
    fontWeight: 900
  },
  centerTitleContent: {
    width: "100%",
    position: "absolute",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  navComponent: {
    width: "80%",
    position: "absolute",
    top: 10,
    display: "flex",
    justifyContent: "flex-end",
    zIndex: 10000
  }
};

const useStyles = makeStyles(styles);

export default function ModernContainer(props) {
  const classes = useStyles();
  const {
    children,
    className,
    title,
    subTitle,
    picMoveUp,
    height,
    img,
    navComponent,
    filter,
    ...rest
  } = props;
  return (
    <Fragment>
      <div style={{ height: height, width: "100%", overflow: "hidden" }}>
        <Parallax filter image={img} />

        {/* Header NAV */}

        {/* <div className="center_component">
          <div className={classes.navComponent}>{navComponent}</div>
        </div> */}

        {/* Header TEXT */}

        <div
          className={classes.centerTitleContent}
          style={{ top: height / 2 - 50 }}
        >
          <h1 className={classes.headerTitle}>{title}</h1>
          <h3 className="white">{subTitle} </h3>
        </div>
      </div>
      <div className={classes.positionWrapper}>{children}</div>
    </Fragment>
  );
}

ModernContainer.defaultProps = {
  className: "",
  height: 500,
  img: "",
  title: "",
  subTitle: "",
  picMoveUp: 0,
  navComponent: ""
};

ModernContainer.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  height: PropTypes.number,
  img: PropTypes.string,
  text: PropTypes.string,
  subTitle: PropTypes.string,
  picMoveUp: PropTypes.number,
  navComponent: PropTypes.node
};
