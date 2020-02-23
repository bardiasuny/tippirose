import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui icons
// core components
import Card from "../../../components/Card/Card.js";
import CardBody from "../../../components/Card/CardBody.js";
import CardHeader from "../../../components/Card/CardHeader.js";
import Button from "../../../components/CustomButtons/Button.js";

import { cardTitle } from "../../../assets/jss/material-kit-pro-react.js";
import { Link } from "react-router-dom";

const style = {
  cardTitle
};

const useStyles = makeStyles(style);

export default function CardHeaderTippi({
  headerTitle,
  title,
  text,
  onClickAction,
  asLink,
  buttonColor,
  buttonText
}) {
  const classes = useStyles();
  return (
    <Card>
      <CardHeader color="warning"> {headerTitle}</CardHeader>
      <CardBody>
        <h2 className={classes.cardTitle + " p2"}> {title}</h2>
        <p> {text}</p>
        <Button
          onClick={onClickAction && onClickAction}
          as={asLink && Link}
          to={asLink && asLink}
          color={buttonColor ? buttonColor : "primary"}
        >
          {buttonText}
        </Button>
      </CardBody>
    </Card>
  );
}

CardHeaderTippi.defaultProps = {
  headerTitle: "",
  title: "",
  text: "",
  onClickAction: "",
  asLink: "",
  buttonColor: "",
  buttonText: ""
};
