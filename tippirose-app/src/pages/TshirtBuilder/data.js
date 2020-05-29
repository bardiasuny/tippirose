import forground from "../../assets/img/tshirt/forground.png";
import punk from "../../assets/img/tshirt/paint-splatters-2.png";
import red from "../../assets/img/tshirt/red.png";
import white from "../../assets/img/tshirt/white.png";

import window35Light from "../../assets/img/tshirt/window-35-qr-light.png";
import window35Dark from "../../assets/img/tshirt/window-35-qr-dark.png";
import window12Light from "../../assets/img/tshirt/window-12-qr-light.png";
import window12Dark from "../../assets/img/tshirt/window-12-qr-dark.png";
import stayWithMe from "../../assets/img/tshirt/StayWithMe.png";
import Meditate from "../../assets/img/tshirt/Meditate.png";
import Throw from "../../assets/img/tshirt/Throw.png";
import ShoulderStand from "../../assets/img/tshirt/ShoulderStand.png";
import Run from "../../assets/img/tshirt/Run.png";
import Jump from "../../assets/img/tshirt/Jump.png";
import sketch_tshirt from "../../assets/img/tshirt/sketch_tshirt.png";
import tippiDbMeter from "../../assets/img/tshirt/tippi_db_meter_bw.png";
const blue =
  "https://www.kidswholesaleclothing.co.uk/4127-large_default/baby-blanks-short-sleeve-tshirt-royalblue.jpg";

const currency = {};

export default {
  UTILS: {
    images: {
      dbMeter : tippiDbMeter
    }
  },
  SELECTORS: [
    { id: "type", lable: "product type" },
    { id: "color", lable: "T-shirt color" },
    { id: "productSize", lable: "product size" },
    { id: "pattern", lable: "pattern" },
    { id: "design", lable: "design" },
    { id: "printSize", lable: "print size" },
  ],
  SKETCH: {
    TSHIRT: [{ name: "sketch t-shirt", image: sketch_tshirt }],
  },
  TSHIRTS: [
    { color: "red", accept: "light", image: red, hex: "#f71717" },
    { color: "blue", accept: "light", image: blue, hex: "#394f93" },
    { color: "white", accept: "dark", image: white, hex: "#394f93" },
    {
      color: "sketch t-shirt",
      accept: "dark",
      image: sketch_tshirt,
      hex: "#394f93",
    },
  ],
  TYPES: [
    { name: "stanly stella rocker T-Shirt", productCode: "sttu758" },
    { name: "stanly stella creator T-Shirt", productCode: "sttu755" },
  ],
  PRODUCT_INFO: [
    {
      productCode: "sttu758",
      name: "stanly stella rocker T-Shirt",
      price: 10,
      variaty: [
        { color: "vintage white", hex: "#f2eae4", accept: "dark" },
        { color: "white", hex: "#ffffff", accept: "dark", image: white },
        { color: "red", hex: "#b7293d", accept: "light", image: red },
        { color: "burgundy", hex: "#5f2735", accept: "light" },
        { color: "azur", hex: "#0096c0", accept: "light", image: blue },
        { color: "spectra yellow", hex: "#fcb322", accept: "dark" },
        { color: "varsity green", hex: "#0b854a", accept: "light" },
      ],
      sizes: [
        { name: "xtra small", short: "xs" },
        { name: "small", short: "s" },
        { name: "medium", short: "m" },
        { name: "larg", short: "l" },
        { name: "xtra larg", short: "xl" },
      ],
    },
    {
      productCode: "sttu755",
      price: 7,
      name: "stanly stella rocker T-Shirt",
      variaty: [
        { color: "white", hex: "#ffffff", accept: "dark", image: white },
        { color: "azur", hex: "#0096c0", accept: "light", image: blue },
      ],
      sizes: [
        { name: "xtra small", short: "xs" },
        { name: "small", short: "s" },
      ],
    },
  ],
  PATTERNS: [
    { name: "window35Light", color: "light", image: window35Light },
    { name: "window35Dark", color: "dark", image: window35Dark },
    { name: "window12Light", color: "light", image: window12Light },
    { name: "window12Dark", color: "dark", image: window12Dark },
  ],
  DESIGNS: [
    {
      name: "Meditate",
      image: Meditate,
      designer: "Amir Bech",
      description: "",
      tags: ["meditation", "spritual", "peace"],
      ajustable: true,
      adjMin: 20,
      adjMax: 20,
    },
    { name: "Throw", image: Throw },
    { name: "ShoulderStand", image: ShoulderStand },
    { name: "Run", image: Run },
    { name: "Jump", image: Jump, ajustable: true, adjMin: 20, adjMax: 0 },
    { name: "stayWithMe", image: stayWithMe },
  ],
  PRINT_SIZE: [
    { name: "small", size: "small", price: 3 },
    { name: "medium", size: "medium", price: 5 },
  ],
  POST: {
    uk: 7,
    nonUK: 20,
  },
};
