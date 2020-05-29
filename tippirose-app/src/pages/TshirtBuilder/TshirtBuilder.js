import React, { Fragment, useState, useEffect, useLayoutEffect } from "react";
import PropTypes from "prop-types";

import data from "./data";
import interact from "interactjs";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// ICONS
import ArrowBackIos from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIos from "@material-ui/icons/ArrowForwardIos";

// PAGES
import { connect } from "react-redux";
import { Button } from "@material-ui/core";
import COLOUR from "utils/COLOUR";
import html2canvas from "html2canvas";
import Carousel, { Dots } from "@brainhubeu/react-carousel";
import "@brainhubeu/react-carousel/lib/style.css";
import TippiButton from "components/CustomButtons/TippiButton";
import zIndex from "@material-ui/core/styles/zIndex";
import useWindowSize from "hooks/useWindowSize";
import {
  getAllPlainImagesWCat,
  getPlainProductImagesWithCat,
} from "../Admin/PlainProducts/plainProductActions";

const actions = {
  getAllPlainImagesWCat,
  getPlainProductImagesWithCat,
};

const mapState = (state) => ({
  auth: state.firebase.auth,
  allproductsImages: state.product.productsImages,
  productImages: state.product.img,
});

const style = {
  mainNavWrapper: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "white",
  },
  arrowContainer: {
    padding: 20,
    cursor: "pointer",
    color: "white",
  },
};

const useStyles = makeStyles(style);

function TshirtBuilder({
  auth,
  getAllPlainImagesWCat,
  allproductsImages,
  getPlainProductImagesWithCat,
  productImages,
}) {
  const sketch = data.SKETCH.TSHIRT[0].image;
  const [tshirt, setTshirt] = useState(sketch);

  const [designT, setDesign] = useState("");
  const [pattern, setPattern] = useState("");
  const [tshirtSize, setTshirtSize] = useState("");
  const [size, setSize] = useState("");

  const [accept, setAccept] = useState("light");

  const [selection, setSelection] = useState("type");
  const [type, setType] = useState(null);
  const [snapShot, setSnapShot] = useState("");
  const [snap, setSnap] = useState("");
  const [adjust, setAdjust] = useState(0);
  const [value, setValue] = useState(0);
  const [selectorValue, setSelectorValue] = useState(0);
  const [typeValue, setTypeValue] = useState(0);
  const [complete, setComplete] = useState(false);
  const [plainPrice, setPlainPrice] = useState(0);
  const [ppPrice, setPPPrice] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);
  const [realPrice, setRealPrice] = useState(0);

  useEffect(() => {
    console.log(
      "HEKLKEF",
      allproductsImages.filter((allp) => allp.id === type)
    );
  }, [allproductsImages, type]);

  useEffect(() => {
    getAllPlainImagesWCat("tshirt");
  }, [getAllPlainImagesWCat]);

  useEffect(() => {
    if (type) {
      getPlainProductImagesWithCat("tshirt", type);
    }
  }, [type]);

  useEffect(() => {
    if (
      !!tshirt &&
      tshirt !== sketch &&
      !!designT &&
      !!tshirtSize &&
      !!size &&
      !!type &&
      !!ppPrice &&
      !!plainPrice
    ) {
      setSnapShot(true);
      setComplete(true);
      const totalCost = plainPrice + ppPrice + data.POST.uk;
      const profit = totalCost * 0.5;
      setTotalPrice(totalCost + profit);
      setRealPrice(totalCost + profit + profit);
    }
  }, [tshirt, designT, tshirtSize, size, type, sketch, ppPrice, plainPrice]);

  const classes = useStyles();
  const authenticated = !auth.isEmpty && auth.isLoaded;

  const buttonSelectedStyle = {
    borderColor: COLOUR.MAIN_BLUE,
    borderWidth: "2px",
    borderStyle: "solid",
    transition: "all .4s",
  };

  const buttonStyle = {
    borderColor: "",
    borderWidth: "",
    borderStyle: "none",
    transition: "all .4s",
  };

  const nextActivButton = {
    borderColor: COLOUR.GREEN,
    borderWidth: " 3px",
    borderStyle: "solid",
  };

  const takeSnap = () => {
    html2canvas(document.getElementsByClassName("tshirt_image_wrapper")[0], {
      scrollX: 0,
      scrollY: -window.scrollY,
    }).then((canvas) => {
      document.body.appendChild(canvas);
      setSnap(canvas.toDataURL());
      var a = document.createElement("a"); //Create <a>
      a.href = "data:image/png;base64," + canvas.toDataURL(); //Image Base64 Goes here
      a.download = "Image.png"; //File name Here
      a.click();
      console.log(canvas.toDataURL());
    });
  };

  const onChange = ({ value }) => {};

  const [width, height] = useWindowSize();

  const [imgWidth, setImgWidth] = useState(0);

  const handleAddToCard = () => {
    if (!type) {
      setSelection("type");
      setSelectorValue(0);
    } else if (!tshirt || tshirt === sketch) {
      setSelection("color");
      setSelectorValue(1);
    } else if (!tshirtSize) {
      setSelection("productSize");
      setSelectorValue(2);
    } else if (!pattern) {
      setSelection("pattern");
      setSelectorValue(3);
    } else if (!designT) {
      setSelection("design");
      setSelectorValue(4);
    } else if (!ppPrice) {
      setSelection("printSize");
      setSelectorValue(5);
    } else {
      alert(`adding to card ${totalPrice} pounds`);
    }
  };

  const [tshirtWidth, setTshirtWidth] = useState(300);
  const [designWidth, setDesignWidth] = useState(200);
  useLayoutEffect(() => {
    if (width > 900) {
      setTshirtWidth(530);
      setDesignWidth(200);

      if (size === "small") {
        setDesignWidth(150);
      }
    }
    if (width < 900) {
      if (height < 500) {
        setTshirtWidth(150);
        setDesignWidth(90);
      } else if (height < 660) {
        setTshirtWidth(250);
        setDesignWidth(90);
        if (size === "small") {
          setDesignWidth(57);
        }
      } else {
        setTshirtWidth(330);
        setDesignWidth(130);

        if (size === "small") {
          setDesignWidth(100);
        }
      }
    }
  }, [height, width, size]);

  return (
    <div className="tshirt_builder_page_wrapper">
      <div className="tshirt_builder_wrapper">
        <div className="tshirt_builder_section">
          <div className="tshirt_builder_container_section">
            {/* <div className="tshirt_builder_adjusment_buttons">
              <Button
                onClick={() => {
                  if (adjust > -20) setAdjust((adj) => adj - 5);
                }}
              >
                Up
              </Button>
              <br />
              <Button
                onClick={() => {
                  if (adjust < 20) {
                    setAdjust((adj) => adj + 5);
                  }
                }}
              >
                down
              </Button>
              <br />
              <Button onClick={() => setAdjust(0)}>resrt</Button>
            </div> */}
            <div
              className="tshirt_image_wrapper"
              style={{
                transform: "scale(1.5, 1.5)",
                zIndex: 10,
                width: tshirtWidth,
              }}
            >
              <div className="tshirt_image_wrapper_tshirt">
                <img src={tshirt} />
              </div>
              <div className="tshirt_image_pattern_design_wrapper">
                <img style={{ width: designWidth }} src={pattern} />
                <div
                  className="tshirt_image_design"
                  style={{ marginTop: `${adjust}px` }}
                >
                  <img src={designT} style={{ width: designWidth }} />
                </div>
              </div>
            </div>
          </div>

          <div className="tshirt_builder_customizer_selector">
            <div className="customizer_selector_focus_box"></div>
            <Carousel
              centered
              slidesPerPage={3}
              value={selectorValue}
              onChange={(value) => {
                setSelectorValue(value);
                setSelection(data.SELECTORS[value].id);
              }}
              keepDirectionWhenDragging
              clickToChange
              minDraggableOffset={0.6}
              arrowLeft={
                <div
                  style={style.arrowContainer}
                  onClick={() => {
                    setSelectorValue((val) => val - 1);
                    setSelection(data.SELECTORS[selectorValue - 1].id);
                  }}
                >
                  <ArrowBackIos />
                </div>
              }
              arrowRight={
                <div
                  style={style.arrowContainer}
                  onClick={() => {
                    setSelectorValue((val) => val + 1);
                    setSelection(data.SELECTORS[selectorValue + 1].id);
                  }}
                >
                  <ArrowForwardIos />
                </div>
              }
            >
              {data.SELECTORS.map((button) => (
                <Button
                  style={
                    selection === button.id
                      ? { color: "white", fontSize: 16 }
                      : { ...buttonStyle, color: "grey" }
                  }
                >
                  {button.lable}
                </Button>
              ))}
            </Carousel>
          </div>
          <div className="tshirt_builder_config">
            {/* {selection === "product" && (
              <div className="tshirt_builder_customizer_section">
                <p>Select Product of your T-shirt</p>
                <div>
                  {data.PATTERNS.map((patternT) => (
                    <Button
                      onClick={() => setPattern(patternT.image)}
                      style={{
                        backgroundColor:
                          pattern === patternT.image ? COLOUR.MAIN_BLUE : " ",
                        color: pattern === patternT.image ? "white" : "black",
                      }}
                      outlinedSizeSmall
                    >
                      T shirt
                    </Button>
                  ))}
                </div>
              </div>
            )} */}

            {selection === "type" && (
              <div className="tshirt_builder_customizer_section">
                <p>Select type of product your T-shirt</p>

                <Carousel
                  centered
                  slidesPerPage={3}
                  clickToChange
                  minDraggableOffset={1000}
                  value={typeValue}
                  onChange={(value) => {
                    setTypeValue(value);
                    //setType();
                    setTshirt(sketch);
                    setAccept("");
                    setTshirtSize("");
                    setPattern("");
                    setDesign("");
                  }}
                >
                  {allproductsImages.map((typeT) => (
                    <Button
                      onClick={() => {
                        if (typeT.productCode === type) {
                          return;
                        } else {
                          setType(typeT.id);
                          setTshirt(sketch);
                          setTotalPrice(0);
                          setRealPrice(0);
                          setAccept("");
                          setTshirtSize("");
                          setPattern("");
                          setDesign("");
                        }
                      }}
                      style={
                        type === typeT.id ? buttonSelectedStyle : buttonStyle
                      }
                      outlinedSizeSmall
                    >
                      {typeT.manufacturerBrand}
                    </Button>
                  ))}
                </Carousel>
              </div>
            )}
            {selection === "color" && (
              <div className="tshirt_builder_customizer_section">
                <h3>Select Color</h3>
                <div>
                  {productImages &&
                    productImages.map((shirt) => (
                      <Button
                        onClick={() => {
                          setTshirt(shirt.url);
                          setAccept(shirt.light ? "light" : "dark");

                          // const price = data.PRODUCT_INFO.filter(
                          //   (pro) => pro.productCode === type
                          // )[0].price;
                          // setPlainPrice(price);
                          if (shirt.accept === accept) {
                            return;
                          } else {
                            // setPattern("");
                            // setDesign("");
                            // setTshirtSize("");
                          }
                        }}
                        style={
                          tshirt === shirt.image
                            ? buttonSelectedStyle
                            : buttonStyle
                        }
                        outlinedSizeSmall
                      >
                        <div
                          style={{
                            width: 20,
                            height: 20,
                            backgroundColor: shirt.colorCode,
                          }}
                        ></div>
                      </Button>
                    ))}
                </div>
              </div>
            )}
            {selection === "productSize" && (
              <div className="tshirt_builder_customizer_section">
                <p>Select Pattern of your T-shirt</p>
                <div>
                  {allproductsImages &&
                    allproductsImages
                      .filter((allimg) => allimg.id === type)[0]
                      .size.map((sizeT) => {
                        console.log(sizeT);
                        return (
                          <Button
                            onClick={() => setTshirtSize(sizeT)}
                            style={
                              tshirtSize === sizeT
                                ? buttonSelectedStyle
                                : buttonStyle
                            }
                            outlinedSizeSmall
                          >
                            {sizeT}
                          </Button>
                        );
                      })}
                </div>
              </div>
            )}

            {selection === "pattern" && (
              <div className="tshirt_builder_customizer_section">
                <p>Select Pattern of your T-shirt</p>
                <div>
                  {data.PATTERNS.filter(
                    (patterns) => patterns.color === accept
                  ).map((patternT) => {
                    return (
                      <Button
                        onClick={() => setPattern(patternT.image)}
                        style={
                          pattern === patternT.image
                            ? buttonSelectedStyle
                            : buttonStyle
                        }
                      >
                        {patternT.name}
                      </Button>
                    );
                  })}
                </div>
              </div>
            )}
            {selection === "design" && (
              <div className="tshirt_builder_customizer_section">
                <p>Select Design of your T-shirt</p>
                {/* <Button
                  onClick={() => {
                    setValue(0);
                    setDesign(data.DESIGNS[0].image);
                  }}
                >
                  back to top
                </Button> */}
                <Carousel
                  arrowLeft={
                    <div
                      style={style.arrowContainer}
                      onClick={() => {
                        setValue((val) => val - 1);
                        setDesign(data.DESIGNS[value - 1].image);
                      }}
                    >
                      <ArrowBackIos />
                    </div>
                  }
                  arrowRight={
                    <div
                      style={style.arrowContainer}
                      onClick={() => {
                        setValue((val) => val + 1);
                        setDesign(data.DESIGNS[value + 1].image);
                      }}
                    >
                      <ArrowForwardIos />
                    </div>
                  }
                  centered
                  slidesPerPage={3}
                  value={value}
                  onChange={(value) => {
                    setValue(value);
                    setDesign(data.DESIGNS[value].image);
                  }}
                  minDraggableOffset={100}
                  clickToChange
                >
                  {data.DESIGNS.map((desing, i) => {
                    return (
                      <div
                        onClick={() => setDesign(desing.image)}
                        style={
                          designT === desing.image
                            ? buttonSelectedStyle
                            : buttonStyle
                        }
                        outlinedSizeSmall
                      >
                        <img
                          src={desing.image}
                          style={{ width: width < 900 ? 40 : 50 }}
                        />
                      </div>
                    );
                  })}
                </Carousel>
              </div>
            )}
            {selection === "printSize" && (
              <div className="tshirt_builder_customizer_section">
                <p>Select Size of the print</p>

                {data.PRINT_SIZE.map((pSize) => (
                  <Button
                    onClick={() => {
                      setSize(pSize.size);
                      setPPPrice(pSize.price);
                    }}
                    style={
                      size === pSize.size ? buttonSelectedStyle : buttonStyle
                    }
                    outlinedSizeSmall
                  >
                    {pSize.name}
                  </Button>
                ))}
              </div>
            )}

            <div className="add_card_wrapper">
              <TippiButton
                //discounted={realPrice}
                //price={totalPrice}
                onClick={handleAddToCard}
                disabled={!complete}
                backgroundColor={!complete ? "grey" : "blue"}
              >
                CONTINUE >>>
              </TippiButton>
            </div>
            {snapShot && (
              <>
                <Button onClick={takeSnap}> snap</Button>
                <img src={snap} alt="snapshopt" />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
export default connect(mapState, actions)(TshirtBuilder);
