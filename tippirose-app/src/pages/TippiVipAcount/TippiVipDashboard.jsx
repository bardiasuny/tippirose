import React, { Fragment, useState, useEffect } from "react";
import PropTypes from "prop-types";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// Actions
import { getTippiVipUserProduct } from "./vipAccountActions";
import { connect } from "react-redux";
const style = {};

const useStyles = makeStyles(style);

const mapState = state => ({
  products: state.product.vipDashboardProducts
});
const actions = {
  getTippiVipUserProduct
};

function TippiVipDashboard({ getTippiVipUserProduct, products }) {
  const classes = useStyles();
  useEffect(() => {
    const getAllproducts = async () => {
      await getTippiVipUserProduct();
    };
    getAllproducts();
  }, []);
  return (
    <Fragment>
      <div
        style={{
          height: 100,
          width: "100%",
          overflow: "hidden",
          background: "black"
        }}
      ></div>
      <h1>VIP Dashboard</h1>
      {products &&
        products.map(product => (
          <h3 key={product.productID}>{product.userName}</h3>
        ))}
    </Fragment>
  );
}
export default connect(mapState, actions)(TippiVipDashboard);
