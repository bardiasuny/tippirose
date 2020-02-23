import React, { Fragment, useState, useEffect } from "react";
import PropTypes from "prop-types";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import Favorite from "@material-ui/icons/Favorite";

import Button from "components/CustomButtons/Button.js";
import { connect } from "react-redux";

import { getFavourite, removeFavourite } from "./userAcrions";

const style = {};

const useStyles = makeStyles(style);

const actions = {
  getFavourite,
  removeFavourite
};

function Favourites({ favourites, getFavourite, removeFavourite }) {
  const classes = useStyles();

  const handleaddFavourite = async product => {
    await removeFavourite(product.id);
    await getFavourite();
  };

  return (
    <Fragment>
      <div style={{ minHeight: "70vh" }}>
        <div
          style={{
            height: 100,
            width: "100%",
            overflow: "hidden",
            background: "black"
          }}
        ></div>
        <div
          style={{
            height: 100,
            width: "100%",
            overflow: "hidden",
            background: "black",
            position: "fixed",
            top: 0
          }}
        ></div>

        <div className="center_component p4">
          <h1>Favourites</h1>
        </div>
        <div className="page_wrapper">
          <div className="grid_4_main_wrapper">
            <Fragment>
              {favourites &&
                favourites.map(product => (
                  <div className="grid_4_item_wrapper" key={product.id}>
                    <div className="grid_4_product_wrapper">
                      <Link to={`/shop/${product.category}/${product.id}`}>
                        <div className="grid_image_with">
                          <img
                            src={product.mainImageUrl}
                            alt={product.productName}
                          />
                        </div>
                      </Link>
                      <div className="grid_product_footer_wrapper">
                        <div>
                          <h4>{product.productName}</h4>
                        </div>
                        <div
                          className="flex_row"
                          style={{ alignItems: "center" }}
                        >
                          <Button
                            justIcon
                            simple
                            color={
                              favourites &&
                              favourites.some(fav => fav.id === product.id)
                                ? "rose"
                                : "white"
                            }
                            onClick={() => handleaddFavourite(product)}
                          >
                            <p>remove </p> <Favorite />
                          </Button>
                          {/* <p className={classes.description}>{product.description}</p> */}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </Fragment>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
export default connect(null, actions)(Favourites);
