import React, { Fragment, useState, useEffect } from "react";
import PropTypes from "prop-types";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

import InfoArea from "../../../components/InfoArea/InfoArea.js";

//ICONS
import InfoIcon from "@material-ui/icons/Info";

const style = {};

const useStyles = makeStyles(style);

function AboutTippi() {
  const classes = useStyles();
  return (
    <Fragment>
      <InfoArea
        description="The French lettering company Letraset manufactured a set of dry-transfer sheets which included the lorem ipsum filler text in a variety of fonts, sizes, and layouts. These sheets of lettering could be."
        icon={InfoIcon}
        iconColor="primary"
      />
    </Fragment>
  );
}
export default AboutTippi;
