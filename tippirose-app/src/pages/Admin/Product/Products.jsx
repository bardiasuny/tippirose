import React, { Fragment, useState, useEffect } from "react";
import PropTypes from "prop-types";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

import { getProductsCategory } from "./productActions";
import { connect } from "react-redux";
import TableForAdmin from "../../../features/Components/TableForAdmin";
import { Route, Link, Switch } from "react-router-dom";
import { Paper, Tabs, Tab } from "@material-ui/core";

import { CSSTransition, TransitionGroup } from "react-transition-group";

const actions = {
  getProductsCategory
};

const mapState = state => ({
  accessories: state.firestore.ordered.accessories,
  clothing: state.firestore.ordered.clothing,
  fabric: state.firestore.ordered.fabric
});

const style = {};

const useStyles = makeStyles(style);

function Products({
  getProductsCategory,
  accessories,
  clothing,
  fabric,
  history,
  match
}) {
  const [value, setValue] = useState("accessories");

  const classes = useStyles();

  useEffect(() => {
    const getProducts = async () => {
      await getProductsCategory("accessories");
      await getProductsCategory("clothing");
      await getProductsCategory("fabric");
    };
    getProducts();
    const str = history.location.pathname;
    const category = str.substring(str.lastIndexOf("/") + 1, str.length);
    if (category === "products") {
      history.push("/admin/products/accessories");
    } else {
      setValue(category);
    }
  }, []);

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
    history.push(`/admin/products/${newValue}`);
  };

  return (
    <Fragment>
      <div className="ph4 relative">
        <Paper square>
          <Tabs
            value={value}
            indicatorColor="primary"
            textColor="primary"
            onChange={handleTabChange}
            aria-label="disabled tabs example"
          >
            <Tab label="Accessories" value="accessories" />
            <Tab label="Clothing" value="clothing" />
            <Tab label="Fabric" value="fabric" />
          </Tabs>
        </Paper>
        <br />
        <Route
          render={({ location }) => (
            <TransitionGroup>
              <CSSTransition key={location.key} timeout={100} classNames="item">
                <Switch location={location}>
                  <Route
                    exact
                    path="/admin/products/accessories"
                    render={() => (
                      <div className="page">
                        <div className="relative">
                          <TableForAdmin rows={accessories} />
                        </div>
                      </div>
                    )}
                  />
                  <Route
                    exact
                    path="/admin/products/clothing"
                    render={() => (
                      <div className="page">
                        <div className="relative">
                          <TableForAdmin rows={clothing} />
                        </div>
                      </div>
                    )}
                  />

                  <Route
                    exact
                    path="/admin/products/fabric"
                    render={() => (
                      <div className="page">
                        <div className="relative">
                          <TableForAdmin rows={fabric} />
                        </div>
                      </div>
                    )}
                  />
                </Switch>
              </CSSTransition>
            </TransitionGroup>
          )}
        />
      </div>
    </Fragment>
  );
}
export default connect(mapState, actions)(Products);
