import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// plugin that creates slider
import Slider from "nouislider";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Checkbox from "@material-ui/core/Checkbox";
import Tooltip from "@material-ui/core/Tooltip";
import FormControlLabel from "@material-ui/core/FormControlLabel";
// @material-ui icons
import Favorite from "@material-ui/icons/Favorite";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";
import Cached from "@material-ui/icons/Cached";
import Subject from "@material-ui/icons/Subject";
import Check from "@material-ui/icons/Check";
// core components
import Accordion from "components/Accordion/Accordion.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import Button from "components/CustomButtons/Button.js";
import Clearfix from "components/Clearfix/Clearfix.js";

import suit1 from "assets/img/examples/suit-1.jpg";
import suit2 from "assets/img/examples/suit-2.jpg";
import suit3 from "assets/img/examples/suit-3.jpg";
import suit4 from "assets/img/examples/suit-4.jpg";
import suit5 from "assets/img/examples/suit-5.jpg";
import suit6 from "assets/img/examples/suit-6.jpg";
import color1 from "assets/img/examples/color1.jpg";
import color3 from "assets/img/examples/color3.jpg";
import color2 from "assets/img/examples/color2.jpg";
import dg3 from "assets/img/dg3.jpg";
import dg1 from "assets/img/dg1.jpg";

import styles from "assets/jss/material-kit-pro-react/views/ecommerceSections/productsStyle.js";
import FilterSection from "./FilterSection";
import ShopProductItem from "./ShopProductItem";

const useStyles = makeStyles(styles);

export default function Ecommerce({ products, favourites }) {
  const [checked, setChecked] = React.useState([1, 9, 27]);
  const [priceRange, setPriceRange] = React.useState([101, 790]);
  //   React.useEffect(() => {
  //     if (
  //       !document
  //         .getElementById("sliderRegular")
  //         .classList.contains("noUi-target")
  //     ) {
  //       Slider.create(document.getElementById("sliderRegular"), {
  //         start: priceRange,
  //         connect: true,
  //         range: { min: 30, max: 900 },
  //         step: 1
  //       }).on("update", function(values) {
  //         setPriceRange([Math.round(values[0]), Math.round(values[1])]);
  //       });
  //     }
  //     return function cleanup() {};
  //   });
  const handleToggle = value => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];
    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
  };
  const classes = useStyles();
  return (
    <div className="page_wrapper">
      <div className="grid_4_main_wrapper">
        <ShopProductItem products={products} favourites={favourites} />
      </div>
      <div
        className={classNames(
          classes.mlAuto,
          classes.mrAuto,
          "center_component"
        )}
      >
        {products && products.length > 5 && (
          <Button round color="rose">
            Load more...
          </Button>
        )}
      </div>
    </div>
  );
}
