import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";
import { getProductsCategoryForCatPage } from "../../pages/Admin/Product/productActions";
import { connect } from "react-redux";
import Ecommerce from "./Ecommerce";
import ModernContainer from "components/ModernContainer/ModernContainer";
const actions = {
  getProductsCategoryForCatPage
};

const mapState = (state, ownProps) => ({
  products: state.firestore.ordered.products
});

const style = {};

const useStyles = makeStyles(style);

function ProductCategory({
  match,
  getProductsCategoryForCatPage,
  products,
  favourites
}) {
  const classes = useStyles();
  useEffect(() => {
    getProductsCategoryForCatPage(match.params.id);
  }, [match.params.id]);
  const headerImage =
    "https://static.zara.net/photos//mkt/spots/ss20-north-campaign-woman/subhome-xmedia-coming-soon//w/1920/landscape_0.jpg?ts=1579720745901";
  return (
    <Fragment>
      <ModernContainer
        img={headerImage}
        height={800}
        title={match.params.id.toUpperCase()}
      ></ModernContainer>
      <Ecommerce
        products={products}
        favourites={favourites}
        getProducts={getProductsCategoryForCatPage}
      />
    </Fragment>
  );
}

export default connect(mapState, actions)(withRouter(ProductCategory));
