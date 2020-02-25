import { createReducer } from "../../app/util/reducerUtils";
import { FETCH_ALL_TEMPLATES, FETCH_PRODUCT_TEMPLATE } from './vipConstants'


const initialState = {
    allTemplates: [],
    productTemplate: {}
}


const fetchAllTemplates = (state, payload) => {
    return {
        ...state,
        allTemplates: payload
    }
}

const fetchProductTemplate = (state, payload) => {

    return {
        ...state,
        productTemplate: payload
    }
}

export default createReducer(initialState, {
    [FETCH_ALL_TEMPLATES]: fetchAllTemplates,
    [FETCH_PRODUCT_TEMPLATE]: fetchProductTemplate
})