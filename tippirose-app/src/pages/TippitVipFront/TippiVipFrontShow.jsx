import React, { Fragment, useState, useEffect } from "react";
import PropTypes from "prop-types";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { getTippiVipUserProduct } from "./tippiVipActions";
import productReducer from "pages/Admin/Product/productReducer";

const style = {};

const useStyles = makeStyles(style);

const mapState = state => ({});

const actions = {
  getTippiVipUserProduct
};

function TippiVipFrontShow({ getTippiVipUserProduct, match }) {
  const classes = useStyles();
  const [product, setProduct] = useState({});
  useEffect(() => {
    const getShow = async () => {
      setProduct(
        await getTippiVipUserProduct(match.params.uid, match.params.upId)
      );
    };
    getShow();
  }, []);
  console.log(product);
  return (
    <Fragment>
      <div
        style={{
          height: 100,
          width: "100%",
          overflow: "hidden"
        }}
      ></div>
      <div className="center_component flex_column">
        <h1>TippiVipFrontShow</h1>
        <br />
        <br />
        <br />
        <img style={{ width: "300px" }} src={product && product.mainImageUrl} />
        <h2>{product && product.userEmail}</h2>
      </div>
    </Fragment>
  );
}
export default connect(mapState, actions)(withRouter(TippiVipFrontShow));
