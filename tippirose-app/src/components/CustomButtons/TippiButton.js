import React, { Fragment } from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

const styles = {
  standard: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: 300,
    backgroundColor: "blueviolet",
    color: "white",
    textTransform: "uppercase",
    cursor: "pointer",
    margin: 10,
    border: "none",
  },
  price: {
    fontSize: 25,
    paddingLeft: 10,
  },
  disabled: {
    backgroundColor: "#5c5c5c",
    color: "white",
  },
  priceDiscounted: {
    textDecoration: "line-through",
  },
};

const useStyles = makeStyles(styles);

export default function TippiButton(props) {
  const classes = useStyles();
  const {
    children,
    className,
    title,
    height,
    type,
    navComponent,
    filter,
    price,
    disabled,
    onClick,
    discounted,
    backgroundColor,
    ...rest
  } = props;

  let buttonStyle = styles.standard;

  if (disabled) {
    buttonStyle = {
      ...styles.standard,
      ...styles.disabled,
      backgroundColor: backgroundColor,
    };
  }
  return (
    <button
      style={{ ...buttonStyle, height }}
      onClick={onClick}
      className={!disabled ? `tippi_button_standard` : ""}
    >
      {children}
      {!!price && (
        <>
          {!discounted ? (
            <span style={styles.price}>£ {price}</span>
          ) : (
            <>
              <span style={styles.price}>£ {price}</span>
              <span className="priceDiscounted">£ {discounted}</span>
            </>
          )}
        </>
      )}
    </button>
  );
}

TippiButton.defaultProps = {
  className: "",
  height: 50,
  title: "",
};

TippiButton.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  height: PropTypes.number,
  img: PropTypes.string,
  text: PropTypes.string,
  subTitle: PropTypes.string,
  picMoveUp: PropTypes.number,
  navComponent: PropTypes.node,
};
