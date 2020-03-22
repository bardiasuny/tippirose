/*eslint-disable*/
import React, { useRef, useEffect } from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// react component used to create nice image meadia player
import ImageGallery from "react-image-gallery";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
// @material-ui/icons
import ShoppingCart from "@material-ui/icons/ShoppingCart";
import LocalShipping from "@material-ui/icons/LocalShipping";
import VerifiedUser from "@material-ui/icons/VerifiedUser";
import Favorite from "@material-ui/icons/Favorite";
// core components
import Header from "components/Header/Header.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Parallax from "components/Parallax/Parallax.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Footer from "components/Footer/Footer.js";
import Button from "components/CustomButtons/Button.js";
import Accordion from "components/Accordion/Accordion.js";
import InfoArea from "components/InfoArea/InfoArea.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import Tooltip from "@material-ui/core/Tooltip";

import productStyle from "assets/jss/material-kit-pro-react/views/productStyle.js";

// images
import cardProduct1 from "assets/img/examples/card-product1.jpg";
import cardProduct3 from "assets/img/examples/card-product3.jpg";
import cardProduct4 from "assets/img/examples/card-product4.jpg";
import cardProduct2 from "assets/img/examples/card-product2.jpg";
import product1 from "assets/img/examples/product1.jpg";
import product2 from "assets/img/examples/product2.jpg";
import product3 from "assets/img/examples/product3.jpg";
import product4 from "assets/img/examples/product4.jpg";
import { connect } from "react-redux";

import "../../../node_modules/react-image-gallery/styles/css/image-gallery.css";

import PatternMaker from "./PatternMaker";
import { Link } from "react-router-dom";

const useStyles = makeStyles(productStyle);

function ProductDetailInside({ allImages, product, isAdmin }) {
  const [colorSelect, setColorSelect] = React.useState("");
  const [sizeSelect, setSizeSelect] = React.useState("");
  const [patternSelect, setPatternSelect] = React.useState("");
  const [openPaternMaker, setOpenPatternMaker] = React.useState(false);

  const [index, setIndex] = React.useState("0");
  const classes = useStyles();

  const carausal = useRef();

  useEffect(() => {
    if (allImages && allImages[0] && allImages[0].color) {
      const color =
        (allImages && allImages[0].color && allImages[0].color) || "";
      const pattern =
        (allImages && allImages[0].pattern && allImages[0].pattern.name) || "";
      setColorSelect(color);
      setPatternSelect(pattern.name);
    }
  }, []);

  const changeImage = e => {
    console.log();
    if (e.target.name === "patternSelect") {
      setPatternSelect(e.target.value);
    }

    if (e.target.name === "colorSelect") {
      setColorSelect(e.target.value);
    }

    let index;
    if (colorSelect !== "" && patternSelect === "") {
      console.log("justcolor");
      index = allImages.findIndex(img => img.color === e.target.value);
    }

    if (patternSelect !== "" && colorSelect !== "") {
      console.log("both");
      if (e.target.name === "colorSelect") {
        console.log("colorSelect", e.target.value);
        index = allImages.findIndex(
          img => img.pattern === patternSelect && img.color === e.target.value
        );
      }
      if (e.target.name === "patternSelect") {
        console.log("patternSelect", e.target.value);
        console.log(colorSelect);
        index = allImages.findIndex(
          img => img.pattern === e.target.value && img.color === colorSelect
        );
      }
    }

    console.log(index);

    if (index === -1) {
      console.log("product doesnt exist");
    } else {
      console.log("this is the product");
      carausal.current && carausal.current.slideToIndex(index);
    }
  };

  return (
    <div>
      {/* <Header
        brand="Material Kit PRO React"
        links={<HeaderLinks dropdownHoverColor="rose" />}
        fixed
        color="transparent"
        changeColorOnScroll={{
          height: 100,
          color: "rose"
        }}
      /> */}
      <div style={{ height: "90px", background: "black" }}></div>

      {openPaternMaker && (
        <div class="add_template_modal">
          <PatternMaker
            color={colorSelect}
            size={sizeSelect}
            selectedPattern={patternSelect}
            product={product}
            setOpenPatternMaker={setOpenPatternMaker}
          />
        </div>
      )}
      <div className={classNames(classes.section)}>
        <div className="custom_container">
          <div className="product_ditail_inside_wrapper">
            <GridContainer>
              <GridItem md={6} sm={12}>
                {isAdmin && (
                  <Link to={`/admin/add-product/${product.id}`}>
                    <Button size="sm" color="dark" style={{ marginLeft: 100 }}>
                      Edit
                    </Button>
                  </Link>
                )}
                <ImageGallery
                  showFullscreenButton={true}
                  showPlayButton={true}
                  startIndex={0}
                  items={allImages && allImages}
                  ref={carausal}
                />
              </GridItem>
              <GridItem md={6} sm={12}>
                <div style={{ padding: 70 }}>
                  <h2 className={classes.title}>{product.productName}</h2>
                  <h3 className={classes.mainPrice}>£{product.price}</h3>
                  <Accordion
                    active={0}
                    activeColor="rose"
                    collapses={[
                      {
                        title: "Description",
                        content: <p>{product.description}</p>
                      },
                      {
                        title: "Designer Information",
                        content: (
                          <p>
                           {product.history}
                          </p>
                        )
                      },
                      {
                        title: "Details and Care",
                        content: (
                          <ul>
                            <li>
                              Storm and midnight-blue stretch cotton-blend
                            </li>
                            <li>
                              Notch lapels, functioning buttoned cuffs, two
                              front flap pockets, single vent, internal pocket
                            </li>
                            <li>Two button fastening</li>
                            <li>84% cotton, 14% nylon, 2% elastane</li>
                            <li>Dry clean</li>
                          </ul>
                        )
                      }
                    ]}
                  />
                  <GridContainer className={classes.pickSize}>
                    <GridItem md={6} sm={6}>
                      <label>Select color</label>
                      <FormControl
                        fullWidth
                        className={classes.selectFormControl}
                      >
                        <Select
                          MenuProps={{
                            className: classes.selectMenu
                          }}
                          classes={{
                            select: classes.select
                          }}
                          value={colorSelect}
                          onChange={event => {
                            changeImage(event);
                            setColorSelect(event.target.value);
                          }}
                          inputProps={{
                            name: "colorSelect",
                            id: "color-select"
                          }}
                        >
                          {product.color &&
                            product.color.length > 0 &&
                            product.color.map((clr, index) => (
                              <MenuItem
                                classes={{
                                  root: classes.selectMenuItem,
                                  selected: classes.selectMenuItemSelected
                                }}
                                value={clr}
                              >
                                {clr}
                              </MenuItem>
                            ))}
                        </Select>
                      </FormControl>
                    </GridItem>
                    <GridItem md={6} sm={6}>
                      <label>Select size</label>
                      <FormControl
                        fullWidth
                        className={classes.selectFormControl}
                      >
                        <Select
                          MenuProps={{
                            className: classes.selectMenu
                          }}
                          classes={{
                            select: classes.select
                          }}
                          value={sizeSelect}
                          onChange={event => {
                            setSizeSelect(event.target.value);
                          }}
                          inputProps={{
                            name: "sizeSelect",
                            id: "size-select"
                          }}
                        >
                          {product.size &&
                            product.size.map((sz, index) => (
                              <MenuItem
                                classes={{
                                  root: classes.selectMenuItem,
                                  selected: classes.selectMenuItemSelected
                                }}
                                value={sz}
                              >
                                {sz}
                              </MenuItem>
                            ))}
                        </Select>
                      </FormControl>
                    </GridItem>
                  </GridContainer>
                  <GridContainer>
                    <GridItem md={6} sm={6}>
                      <label>Select Pattern</label>
                      <FormControl
                        fullWidth
                        className={classes.selectFormControl}
                      >
                        <Select
                          MenuProps={{
                            className: classes.selectMenu
                          }}
                          classes={{
                            select: classes.select
                          }}
                          value={patternSelect}
                          onChange={event => {
                            changeImage(event);
                          }}
                          inputProps={{
                            name: "patternSelect",
                            id: "size-select"
                          }}
                        >
                          {product.patterns &&
                            product.patterns.map((pattern, index) => (
                              <MenuItem
                                classes={{
                                  root: classes.selectMenuItem,
                                  selected: classes.selectMenuItemSelected
                                }}
                                value={pattern.name}
                              >
                                {pattern.name}
                              </MenuItem>
                            ))}
                        </Select>
                      </FormControl>
                    </GridItem>
                  </GridContainer>

                  <GridContainer className="center_component p4">
                    <div className="order_button">
                      <button
                        round
                        onClick={() => setOpenPatternMaker(true)}
                        className="mian_bg_button"
                      >
                        <p className="white">
                          Add to Cart &nbsp; <ShoppingCart />
                        </p>
                      </button>

                      <div class="button_ani_1"></div>
                    </div>
                  </GridContainer>
                </div>
              </GridItem>
            </GridContainer>
          </div>
          <div
            className={classNames(
              classes.features,
              classes.textCenter,
              "custom_container_small"
            )}
          >
            <GridContainer>
              <GridItem md={4} sm={4}>
                <InfoArea
                  title="2 Days Delivery"
                  description="Divide details about your product or agency work into parts. Write a few lines about each one. A paragraph describing a feature will be enough."
                  icon={LocalShipping}
                  iconColor="info"
                  vertical
                />
              </GridItem>
              <GridItem md={4} sm={4}>
                <InfoArea
                  title="Refundable Policy"
                  description="Divide details about your product or agency work into parts. Write a few lines about each one. A paragraph describing a feature will be enough."
                  icon={VerifiedUser}
                  iconColor="success"
                  vertical
                />
              </GridItem>
              <GridItem md={4} sm={4}>
                <InfoArea
                  title="Popular Item"
                  description="Divide details about your product or agency work into parts. Write a few lines about each one. A paragraph describing a feature will be enough."
                  icon={Favorite}
                  iconColor="rose"
                  vertical
                />
              </GridItem>
            </GridContainer>

            <div className={classes.relatedProducts}>
              <h3 className={classNames(classes.title, classes.textCenter)}>
                You may also be interested in:
              </h3>
              <GridContainer>
                <GridItem sm={6} md={3}>
                  <Card product>
                    <CardHeader image>
                      <a href="#pablo">
                        <img src={cardProduct1} alt="cardProduct" />
                      </a>
                    </CardHeader>
                    <CardBody>
                      <h6
                        className={classNames(
                          classes.cardCategory,
                          classes.textRose
                        )}
                      >
                        Trending
                      </h6>
                      <h4 className={classes.cardTitle}>Dolce & Gabbana</h4>
                    </CardBody>
                    <CardFooter className={classes.justifyContentBetween}>
                      <div className={classes.price}>
                        <h4>$1,459</h4>
                      </div>
                      <div className={classes.stats}>
                        <Tooltip
                          id="tooltip-top"
                          title="Save to Wishlist"
                          placement="top"
                          classes={{ tooltip: classes.tooltip }}
                        >
                          <Button justIcon color="rose" simple>
                            <Favorite />
                          </Button>
                        </Tooltip>
                      </div>
                    </CardFooter>
                  </Card>
                </GridItem>
                <GridItem sm={6} md={3}>
                  <Card product>
                    <CardHeader image>
                      <a href="#pablo">
                        <img src={cardProduct3} alt="cardProduct3" />
                      </a>
                    </CardHeader>
                    <CardBody>
                      <h6 className={classes.cardCategory}>Popular</h6>
                      <h4 className={classes.cardTitle}>Balmain</h4>
                    </CardBody>
                    <CardFooter className={classes.justifyContentBetween}>
                      <div className={classes.price}>
                        <h4>$459</h4>
                      </div>
                      <div className={classes.stats}>
                        <Tooltip
                          id="tooltip-top"
                          title="Save to Wishlist"
                          placement="top"
                          classes={{ tooltip: classes.tooltip }}
                        >
                          <Button justIcon link>
                            <Favorite />
                          </Button>
                        </Tooltip>
                      </div>
                    </CardFooter>
                  </Card>
                </GridItem>
                <GridItem sm={6} md={3}>
                  <Card product>
                    <CardHeader image>
                      <a href="#pablo">
                        <img src={cardProduct4} alt="cardProduct4" />
                      </a>
                    </CardHeader>
                    <CardBody>
                      <h6 className={classes.cardCategory}>Popular</h6>
                      <h4 className={classes.cardTitle}>Balenciaga</h4>
                    </CardBody>
                    <CardFooter className={classes.justifyContentBetween}>
                      <div className={classes.price}>
                        <h4>$590</h4>
                      </div>
                      <div className={classes.stats}>
                        <Tooltip
                          id="tooltip-top"
                          title="Save to Wishlist"
                          placement="top"
                          classes={{ tooltip: classes.tooltip }}
                        >
                          <Button justIcon color="rose" simple>
                            <Favorite />
                          </Button>
                        </Tooltip>
                      </div>
                    </CardFooter>
                  </Card>
                </GridItem>
                <GridItem sm={6} md={3}>
                  <Card product>
                    <CardHeader image>
                      <a href="#pablo">
                        <img src={cardProduct2} alt="cardProduct2" />
                      </a>
                    </CardHeader>
                    <CardBody>
                      <h6
                        className={classNames(
                          classes.cardCategory,
                          classes.textRose
                        )}
                      >
                        Trending
                      </h6>
                      <h4 className={classes.cardTitle}>Dolce & Gabbana</h4>
                    </CardBody>
                    <CardFooter className={classes.justifyContentBetween}>
                      <div className={classes.price}>
                        <h4>$1,459</h4>
                      </div>
                      <div className={classes.stats}>
                        <Tooltip
                          id="tooltip-top"
                          title="Save to Wishlist"
                          placement="top"
                          classes={{ tooltip: classes.tooltip }}
                        >
                          <Button justIcon link>
                            <Favorite />
                          </Button>
                        </Tooltip>
                      </div>
                    </CardFooter>
                  </Card>
                </GridItem>
              </GridContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailInside;
