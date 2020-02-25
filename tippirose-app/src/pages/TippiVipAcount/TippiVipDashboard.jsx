import React, { Fragment, useState, useEffect } from "react";
import PropTypes from "prop-types";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// Actions
import {
  getTippiVipUserProducts,
  getTippiVipAllTemplates,
  assignVipTemplate
} from "./vipAccountActions";
import { connect } from "react-redux";
import NavBar from "components/Nav/MainNavBar/NavBar";
import Button from "components/CustomButtons/Button";
import MyProducts from "./components/MyProducts";
import { text } from "body-parser";
import { Container } from "@material-ui/core";
import AddTemplateButton from "./components/AddTemplateButton";
const style = {};

const useStyles = makeStyles(style);

const mapState = state => ({
  products: state.product.vipDashboardProducts,
  templates: state.vip.allTemplates
});
const actions = {
  getTippiVipUserProducts,
  getTippiVipAllTemplates,
  assignVipTemplate
};

function TippiVipDashboard({
  getTippiVipUserProducts,
  products,
  getTippiVipAllTemplates,
  templates,
  assignVipTemplate
}) {
  const classes = useStyles();
  useEffect(() => {
    const getAllproducts = async () => {
      await getTippiVipUserProducts();
      await getTippiVipAllTemplates();
    };
    getAllproducts();
  }, []);
  return (
    <Fragment>
      <NavBar />
      <div
        style={{
          height: 100,
          width: "100%",
          overflow: "hidden",
          background: "black"
        }}
      ></div>
      <Container>
        <div className="center_component p4">
          <h1>My Products</h1>
        </div>
        <div style={{ textAlign: "right" }}>
          <AddTemplateButton />
        </div>
        <div className="page_wrapper">
          <div className="grid_4_main_wrapper">
            <MyProducts
              products={products}
              templates={templates}
              assignVipTemplate={assignVipTemplate}
            />
          </div>
        </div>
      </Container>
    </Fragment>
  );
}
export default connect(mapState, actions)(TippiVipDashboard);
