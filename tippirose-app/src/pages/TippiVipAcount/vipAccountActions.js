
import {
    asyncActionStart,
    asyncActionFinish,
    asyncActionError
} from "../../features/async/asyncActions";
import { FETCH_PRODUCT_VIP_DASHBOARD } from "../Admin/Product/productConstants"
import { FETCH_ALL_TEMPLATES, FETCH_PRODUCT_TEMPLATE } from "./vipConstants"

import axios from "axios"
import { toastr } from "react-redux-toastr";

let api = ""

if (process.env.NODE_ENV === 'production') {
    api = 'https://us-central1-tippirose-london.cloudfunctions.net/app'
} else {
    api = ""
}



export const getTippiVipUserProducts = (userId, uniqueId) => async (
    dispatch,
    getState,
    { getFirebase, getFirestore }
) => {
    dispatch(asyncActionStart())
    const firebase = getFirebase();
    const firestore = getFirestore();

    try {

        const user = await firebase.auth().currentUser

        if (user.uid) {
            const config = {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json;charset=UTF-8'
                }

            }
            const data = JSON.stringify({ user })
            const res = await axios.post(`${api}/account/get-vip-user-products`, data, config)
            dispatch({ type: FETCH_PRODUCT_VIP_DASHBOARD, payload: res.data })
        }
        dispatch(asyncActionFinish())
    } catch (err) {
        console.log(err)
        dispatch(asyncActionError())
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
        dispatch(asyncActionStart())
        const user = await firebase.auth().currentUser

        if (user.uid) {
            const config = {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json;charset=UTF-8'
                }

            }
            const data = JSON.stringify({ user })

            const res = await axios.post(`${api}/account/fetch-all-templates`, data, config)


            dispatch({ type: FETCH_ALL_TEMPLATES, payload: res.data })
            dispatch(asyncActionFinish())
        }

    } catch (err) {
        console.log(err)
        dispatch(asyncActionError())
    }
}


export const assignVipTemplate = (template, product) => async (
    dispatch,
    getState,
    { getFirebase, getFirestore }
) => {
    dispatch(asyncActionStart())
    const firebase = getFirebase();
    const firestore = getFirestore();
    try {

        const user = await firebase.auth().currentUser

        if (user.uid) {
            const config = {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json;charset=UTF-8'
                }

            }
            const data = JSON.stringify({ user, template, product })

            const res = await axios.post(`${api}/account/assign-vip-template`, data, config)
            if (res.data === 'success') {
                toastr.success("success", "you have successfuly changes this product`s theme")
            }
            dispatch(getTippiVipUserProducts())
        }
        dispatch(asyncActionFinish())
    } catch (err) {
        console.log(err)
        dispatch(asyncActionError())
    }

}

export const getUserTemplate = (template) => async (
    dispatch,
    getState,
    { getFirebase, getFirestore }
) => {
    dispatch(asyncActionStart())
    const firebase = getFirebase();
    const firestore = getFirestore();
    console.log(api)
    try {
        const userId = await firebase.auth().currentUser.uid

        const config = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8'
            }

        }
        const data = JSON.stringify({ template, userId })
        const res = await axios.post(`${api}/user/get-user-template`, data, config)


        dispatch({ type: FETCH_PRODUCT_TEMPLATE, payload: res.data })
        dispatch(asyncActionFinish())

    } catch (err) {
        console.log(err)
        dispatch(asyncActionError())
    }
}


export const setProfileLinks = (profileName, profileLinkState, profileState) => async (
    dispatch,
    getState,
    { getFirebase, getFirestore }
) => {
    dispatch(asyncActionStart())
    const firebase = getFirebase();
    const firestore = getFirestore();

    try {
        const userId = await firebase.auth().currentUser.uid

        const config = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8'
            }

        }
        const data = JSON.stringify({ userId, profileName, profileLinkState, profileState })
        const res = await axios.post(`${api}/account/set-profile-links`, data, config)


        toastr.success("Success", `you have successfully set ${profileName} profile`)
        dispatch(asyncActionFinish())

    } catch (err) {
        console.log(err)
        dispatch(asyncActionError())
    }
}


export const createNewProfile = (name) => async (
    dispatch,
    getState,
    { getFirebase, getFirestore }
) => {
    dispatch(asyncActionStart())
    const firebase = getFirebase();
    const firestore = getFirestore();

    try {
        const userId = await firebase.auth().currentUser.uid

        const config = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8'
            }

        }
        const data = JSON.stringify({ name, userId })
        const res = await axios.post(`${api}/account/create-new-profile`, data, config)

        if (res.data === "exist") {
            return 'exist'
        }
        if (res.data === "success") {
            toastr.success("Success", `you have successfully create ${name} profile`)
        }

        dispatch(asyncActionFinish())

    } catch (err) {
        console.log(err)
        dispatch(asyncActionError())
    }
}