import {
    asyncActionStart,
    asyncActionFinish,
    asyncActionError
} from "../../features/async/asyncActions";
import { FETCH_SCANNED_PRODUCT } from "../Admin/Product/productConstants"
import { FETCH_PRODUCT_TEMPLATE } from "../TippiVipAcount/vipConstants"
import { toastr } from "react-redux-toastr";
import { actionTypes } from "redux-firestore";
import { SubmissionError } from "redux-form";
import axios from "axios"


export const getTippiVipUserProduct = (uniqueId) => async (
    dispatch,
    getState,
    { getFirebase, getFirestore }
) => {
    const firebase = getFirebase();
    const firestore = getFirestore();

    try {

        dispatch(asyncActionStart())


        const config = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8'
            }

        }
        const data = JSON.stringify({ uniqueId })
        const res = await axios.post('/vip/get-user-product', data, config)
        console.log(res.data)

        dispatch({ type: FETCH_SCANNED_PRODUCT, payload: res.data.infoToshow })

        dispatch({ type: FETCH_PRODUCT_TEMPLATE, payload: res.data.userTemplate })

        dispatch(asyncActionFinish())
    } catch (err) {
        console.log(err)
        dispatch(asyncActionError())
    }
}


export const activateProduct = (product, userData, user) => async (
    dispatch,
    getState,
    { getFirebase, getFirestore }
) => {
    const firebase = getFirebase();
    const firestore = getFirestore();

    try {




        const config = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8'
            }

        }
        const data = JSON.stringify({ product, userData, user })
        const res = await axios.post('/user/activate-product', data, config)
        console.log(res.data)

        if (res.data === 'match') {
            window.location.reload()
        }
        // dispatch({ type: FETCH_PRODUCT_VIP_DASHBOARD, payload: res.data })


    } catch (err) {
        console.log(err)
    }
}

export const getUserTemplate = (template, userId) => async (
    dispatch,
    getState,
    { getFirebase, getFirestore }
) => {
    const firebase = getFirebase();
    const firestore = getFirestore();

    try {




        const config = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8'
            }

        }
        const data = JSON.stringify({ template, userId })
        const res = await axios.post('/vip/get-user-template', data, config)
        console.log(res.data)

        // dispatch({ type: FETCH_PRODUCT_VIP_DASHBOARD, payload: res.data })


    } catch (err) {
        console.log(err)
    }
}