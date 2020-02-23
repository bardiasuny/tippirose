import React, { Fragment } from "react";
// nodejs library that concatenates classes

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

import Tooltip from "@material-ui/core/Tooltip";

// @material-ui icons
import Favorite from "@material-ui/icons/Favorite";

import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import Button from "components/CustomButtons/Button.js";

import suit1 from "assets/img/examples/suit-1.jpg";

import styles from "assets/jss/material-kit-pro-react/views/ecommerceSections/productsStyle.js";
import { Link, withRouter } from "react-router-dom";

import { connect } from "react-redux";

import {
  addFavourite,
  getFavourite,
  removeFavourite
} from "../../features/User/userAcrions";

const useStyles = makeStyles(styles);

const actions = {
  addFavourite,
  getFavourite,
  removeFavourite
};

function ShopProductItem({
  products,
  addFavourite,
  favourites,
  getFavourite,
  removeFavourite,
  match
}) {
  const classes = useStyles();

  const handleaddFavourite = async product => {
    const isFavourites = favourites.some(fav => fav.id === product.id);

    if (isFavourites) {
      await removeFavourite(product.id);
      await getFavourite();
    } else {
      await addFavourite(product);
      await getFavourite();
    }

    //await getProductsCategoryForCatPage(match.params.id);
  };
  return (
    <Fragment>
      {products &&
        products.map(product => (
          <div className="grid_4_item_wrapper" key={product.id}>
            <div className="grid_4_product_wrapper">
              <Link to={`/shop/${product.category}/${product.id}`}>
                <div className="grid_image_with">
                  <img src={product.mainImageUrl} alt={product.productName} />
                </div>
              </Link>
              <div className="grid_product_footer_wrapper">
                <div>
                  <a href="#pablo">
                    <h4>{product.productName}</h4>
                  </a>
                  {/* <p className={classes.description}>{product.description}</p> */}
                  <div>
                    <span> £{product.price}</span>
                  </div>
                </div>

                <div>
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
                    <Favorite />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
    </Fragment>
  );
}
export default connect(null, actions)(withRouter(ShopProductItem));
