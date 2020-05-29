import React, { Fragment } from "react";
import PropTypes from "prop-types";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import ModernContainer from "../../components/ModernContainer/ModernContainer";
import NavBar from "../../components/Nav/MainNavBar/NavBar";
import Parallax from "../../components/Parallax/Parallax";
import { Route, Switch, Link, NavLink } from "react-router-dom";
import AddProduct from "./Product/AddProduct";
import AdminDashboard from "./AdminDashboard";
import Products from "./Product/Products";
import PatternManager from "./PatternManager";
import NavBarCostum from "components/Nav/MainNavBar/NavBarCostum";
import PlainProducts from "./PlainProducts/index";
import AddPlainProduct from "./PlainProducts/AddPlainProduct";
const style = {};

const useStyles = makeStyles(style);

export default function LoggedOutNav() {
  const classes = useStyles();
  const headerImage = require("../../assets/img/bg2.jpg");
  return (
    <Fragment>
      <div className="admin_layout">
        <div className="admin_sidebar_wrapper">
          <h4>Navigation</h4>
          <br />
          <NavLink exact className="p3" to="/admin">
            Dashboard
          </NavLink>{" "}
          <br /> <br />
          <NavLink className="p3" to="/admin/products">
            Products
          </NavLink>
          <br /> <br />
          <NavLink className="p3" to="/admin/add-product">
            Add product
          </NavLink>
          <br /> <br />
          <NavLink className="p3" to="/admin/patern-manager">
            Pattern Manager
          </NavLink>
        </div>
        <div className="admin_main_wrapper">
          <Switch>
            <Route exact path="/admin/" render={() => <AdminDashboard />} />
            <Route
              exact
              path="/admin/plain-product-manager"
              render={() => <PlainProducts />}
            />
            <Route
              exact
              path="/admin/plain-product-manager/add-product"
              render={() => <AddPlainProduct />}
            />
            <Route
              path="/admin/plain-product-manager/add-product/:id"
              render={() => <AddPlainProduct />}
            />
            <Route
              exact
              path="/admin/add-product"
              render={() => <AddProduct />}
            />
            <Route
              path="/admin/add-product/:id"
              render={() => <AddProduct />}
            />
            <Route path="/admin/products" component={Products} />
            <Route path="/admin/patern-manager" component={PatternManager} />
          </Switch>
        </div>
      </div>
    </Fragment>
  );
}
