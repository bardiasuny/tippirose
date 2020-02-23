import { createReducer } from "../../../app/util/reducerUtils";
import { FETCH_PRODUCT, FETCH_PRODUCT_IMAGES, FETCH_PRODUCT_PATTERNS, FETCH_PRODUCT_VIP_DASHBOARD } from "./productConstants"

const initialState = {
    product: [],
    img: []
}



const fetchProduct = (state, payload) => {

    return {
        ...state,
        product: payload.product
    }
}

const fetchProductImages = (state, payload) => {

    return {
        ...state,
        img: payload.img
    }
}

const fetchProductPatterns = (state, payload) => {

    return {
        ...state,
        patterns: payload.pattern
    }
}


const fetchProductVipDashboard = (state, payload) => {
    return {
        ...state,
        vipDashboardProducts: payload
    }
}


export default createReducer(initialState, {
    [FETCH_PRODUCT]: fetchProduct,
    [FETCH_PRODUCT_IMAGES]: fetchProductImages,
    [FETCH_PRODUCT_PATTERNS]: fetchProductPatterns,
    [FETCH_PRODUCT_VIP_DASHBOARD]: fetchProductVipDashboard
})