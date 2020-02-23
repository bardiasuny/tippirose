import React, { Fragment, useState, useEffect } from "react";
import PropTypes from "prop-types";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import {
  getProductWithCat,
  getProductImagesWithCat,
  unMountReducers
} from "../Admin/Product/productActions";
import ProductDetailInside from "features/Products/ProductDetailInside";
import { Backdrop, CircularProgress } from "@material-ui/core";

const actions = {
  getProductWithCat,
  getProductImagesWithCat,
  unMountReducers
};

const mapState = state => ({
  product: state.product.product,
  allImages: state.product.img,
  loading: state.async.loading,
  isAdmin: state.firebase.profile.role === "admin"
});

const style = {};

const useStyles = makeStyles(style);

function ProductDetail({
  match,
  getProductWithCat,
  getProductImagesWithCat,
  allImages,
  product,
  loading,
  unMountReducers,
  isAdmin
}) {
  const classes = useStyles();

  useEffect(() => {
    const category = match.params.category;
    const id = match.params.id;
    const getProductWc = async () => {
      await getProductWithCat(category, id);
      await getProductImagesWithCat(category, id);
    };
    getProductWc();
  }, []);

  if (loading)
    return (
      <div style={{ minHeight: "100vh" }}>
        <Backdrop open={loading} style={{ zIndex: 10 }}>
          <CircularProgress />
        </Backdrop>
      </div>
    );
  return (
    <Fragment>
      <ProductDetailInside
        allImages={allImages}
        product={product}
        isAdmin={isAdmin}
      />
    </Fragment>
  );
}
export default connect(mapState, actions)(withRouter(ProductDetail));
