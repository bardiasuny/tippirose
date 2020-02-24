import React, { Fragment, useState, useEffect } from "react";
import PropTypes from "prop-types";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import ModernContainer from "../../components/ModernContainer/ModernContainer";
import SubscribeEmail from "../../features/SubscribeEmail/SubscribeEmail";
import { Button, Divider, Grid } from "@material-ui/core";
import { toastr } from "react-redux-toastr";
import Skeleton from "@material-ui/lab/Skeleton";

import AboutTippi from "../../features/Shop/About/AboutTippi";
import GridContainer from "../../components/Grid/GridContainer";
import Card from "../../components/Card/Card";
import CardBody from "../../components/Card/CardBody";
import { Link } from "react-router-dom";
import NavBar from "components/Nav/MainNavBar/NavBar";
import MainFooter from "features/Footer/MainFooter";

const style = {};

const useStyles = makeStyles(style);

function Homepage() {
  const classes = useStyles();
  const headerImage =
    "https://www.comma-store.eu/on/demandware.static/-/Sites-commaEU-Library/default/dwa69a7b98/contentassets/2020/homepage/01/01_Mainteaser_20200127_04-co-xl.jpg";

  const toast = input => {
    toastr[input]("OoPS!!", "somthing went wrong, Please try again");
  };

  return (
    <Fragment>
      <NavBar />
      <ModernContainer
        title="HomePage"
        subTitle="Experience the awesomness"
        img={headerImage}
        height={800}
        picMoveUp={-400}
      >
        <AboutTippi />
        <div className="center_component">
          <h3 className="sub_dark p4">Video</h3>
        </div>
        <div className="center_component">
          <Skeleton variant="rect" width={"50%"} height={300} />
        </div>
        <br />
        <Divider />
        <br />
        <div className="center_component">
          <h3>Shop Categories</h3>
        </div>
        <div style={{ width: "100%", margin: "0 auto" }}>
          <Grid container>
            <Grid
              item
              sm={12}
              md={4}
              className="center_component card3_wrapper"
            >
              <Link to="/shop/clothing">
                <Card className="card3 link">
                  <CardBody className="center_component_fix">
                    <h2>Clothing</h2>
                  </CardBody>
                </Card>
              </Link>
            </Grid>

            <Grid
              item
              sm={12}
              md={4}
              className="center_component card3_wrapper"
            >
              <Link to="/shop/accessories">
                <Card className="card3 link">
                  <CardBody className="center_component_fix">
                    <h2>Accessories</h2>
                  </CardBody>
                </Card>
              </Link>
            </Grid>

            <Grid
              item
              sm={12}
              md={4}
              className="center_component card3_wrapper"
            >
              <Link to="/shop/fabric">
                <Card className="card3 link">
                  <CardBody className="center_component_fix">
                    <h2>Fabric</h2>
                  </CardBody>
                </Card>
              </Link>
            </Grid>
          </Grid>
        </div>
      </ModernContainer>
      <SubscribeEmail />
      <MainFooter />
    </Fragment>
  );
}
export default Homepage;
