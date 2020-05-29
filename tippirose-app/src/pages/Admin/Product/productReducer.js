import { createReducer } from "../../../app/util/reducerUtils";
import {
  FETCH_PRODUCT,
  FETCH_PRODUCT_IMAGES,
  FETCH_PRODUCT_PATTERNS,
  FETCH_PRODUCT_VIP_DASHBOARD,
  FETCH_SCANNED_PRODUCT,
  FETCH_ALLPRODUCT_IMAGES,
} from "./productConstants";

const initialState = {
  product: [],
  img: [],
  productsImages: [],
};

const fetchProduct = (state, payload) => {
  return {
    ...state,
    product: payload.product,
  };
};

const fetchProductImages = (state, payload) => {
  return {
    ...state,
    img: payload.img,
  };
};

const fetchallProductImages = (state, payload) => {
  return {
    ...state,
    productsImages: payload.img,
  };
};

const fetchProductPatterns = (state, payload) => {
  return {
    ...state,
    patterns: payload.pattern,
  };
};

const fetchProductVipDashboard = (state, payload) => {
  return {
    ...state,
    vipDashboardProducts: payload,
  };
};

const fetchScannedProduct = (state, payload) => {
  return {
    ...state,
    scannedProduct: payload,
  };
};

export default createReducer(initialState, {
  [FETCH_PRODUCT]: fetchProduct,
  [FETCH_PRODUCT_IMAGES]: fetchProductImages,
  [FETCH_PRODUCT_PATTERNS]: fetchProductPatterns,
  [FETCH_PRODUCT_VIP_DASHBOARD]: fetchProductVipDashboard,
  [FETCH_SCANNED_PRODUCT]: fetchScannedProduct,
  [FETCH_ALLPRODUCT_IMAGES]: fetchallProductImages,
});
