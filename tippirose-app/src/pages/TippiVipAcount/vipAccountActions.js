import { FETCH_PRODUCT_VIP_DASHBOARD } from "../Admin/Product/productConstants"
import { FETCH_ALL_TEMPLATES, FETCH_PRODUCT_TEMPLATE } from "./vipConstants"
import axios from "axios"
import { toastr } from "react-redux-toastr";



export const getTippiVipUserProducts = (userId, uniqueId) => async (
    dispatch,
    getState,
    { getFirebase, getFirestore }
) => {
    const firebase = getFirebase();
    const firestore = getFirestore();

    try {

        const user = firebase.auth().currentUser

        if (user.uid) {
            const config = {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json;charset=UTF-8'
                }

            }
            const data = JSON.stringify({ user })
            const res = await axios.post('/account/get-vip-user-products', data, config)
            dispatch({ type: FETCH_PRODUCT_VIP_DASHBOARD, payload: res.data })
        }

    } catch (err) {
        console.log(err)
    }
}

export const getTippiVipAllTemplates = () => async (
    dispatch,
    getState,
    { getFirebase, getFirestore }
) => {
    const firebase = getFirebase();
    const firestore = getFirestore();

    try {

        const user = firebase.auth().currentUser

        if (user.uid) {
            const config = {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json;charset=UTF-8'
                }

            }
            const data = JSON.stringify({ user })

            const res = await axios.post('/account/fetch-all-templates', data, config)


            dispatch({ type: FETCH_ALL_TEMPLATES, payload: res.data })
        }

    } catch (err) {
        console.log(err)
    }
}


export const assignVipTemplate = (template, product) => async (
    dispatch,
    getState,
    { getFirebase, getFirestore }
) => {
    const firebase = getFirebase();
    const firestore = getFirestore();
    try {

        const user = firebase.auth().currentUser

        if (user.uid) {
            const config = {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json;charset=UTF-8'
                }

            }
            const data = JSON.stringify({ user, template, product })

            const res = await axios.post('/account/assign-vip-template', data, config)
            if (res.data === 'success') {
                toastr.success("success", "you have successfuly changes this product`s theme")
            }
            dispatch(getTippiVipUserProducts())
        }

    } catch (err) {
        console.log(err)
    }

}

export const getUserTemplate = (template) => async (
    dispatch,
    getState,
    { getFirebase, getFirestore }
) => {
    const firebase = getFirebase();
    const firestore = getFirestore();

    try {
        const userId = firebase.auth().currentUser.uid
        console.log(template)
        const config = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8'
            }

        }
        const data = JSON.stringify({ template, userId })
        const res = await axios.post('/user/get-user-template', data, config)


        dispatch({ type: FETCH_PRODUCT_TEMPLATE, payload: res.data })


    } catch (err) {
        console.log(err)
    }
}