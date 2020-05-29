import React, { Fragment, useState, useEffect } from "react";
import PropTypes from "prop-types";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

import ModernContainer from "../../components/ModernContainer/ModernContainer";
import NavBar from "../../components/Nav/MainNavBar/NavBar";
import NavBarCostum from "../../components/Nav/MainNavBar/NavBarCostum";
import { Route, Switch, Link } from "react-router-dom";

import ProductCategory from "./ProductCategory";
import ProductDetail from "./ProductDetail";
import { connect } from "react-redux";

//Actions
import { getFavourite } from "../../features/User/userAcrions";
import Favourites from "features/User/Favourites";
import MainFooter from "features/Footer/MainFooter";

const mapState = (state) => ({
  favourites: state.firestore.ordered.favourites,
});
const actions = {
  getFavourite,
};

const style = {};

const useStyles = makeStyles(style);

function Shop({ match, getFavourite, favourites }) {
  const [pageTitle, setPageTitle] = useState("Homepage");

  const classes = useStyles();
  const headerImage = require("../../assets/img/bg4.jpg");

  const getPageTitle = (title) => {
    setPageTitle(title);
  };

  useEffect(() => {
    const getfav = async () => {
      await getFavourite();
    };
    getfav();
  }, [getFavourite]);

  return (
    <Fragment>
      <Switch>
        <Route
          exact
          path="/shop/favourites"
          render={() => <Favourites favourites={favourites} />}
        />
        <Route
          exact
          path="/shop/:id"
          render={() => <ProductCategory favourites={favourites} />}
        />

        <Route exact path="/shop/:category/:id" component={ProductDetail} />

        {!match.isExact && (
          <Route
            render={() => (
              <Fragment>
                {" "}
                <h1>NOT FOUND</h1>
                <Link to="/shop">Shop</Link>- <Link to="/admin">Admin</Link>
              </Fragment>
            )}
          />
        )}
      </Switch>
      <MainFooter />
    </Fragment>
  );
}

export default connect(mapState, actions)(Shop);
