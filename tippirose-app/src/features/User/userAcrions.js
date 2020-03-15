import axios from "axios"
import { toastr } from "react-redux-toastr";
import { actionTypes } from "redux-firestore";
import { SubmissionError } from "redux-form";
import {
    asyncActionStart,
    asyncActionFinish,
    asyncActionError
} from "../async/asyncActions";

import uuid from "uuid"

let api = ""

if (process.env.NODE_ENV === 'production') {
    api = 'https://us-central1-tippirose-london.cloudfunctions.net/app'
} else {
    api = ""
}


export const addFavourite = (product) => async (
    dispatch,
    getState,
    { getFirebase, getFirestore }
) => {
    const firebase = getFirebase();
    const firestore = getFirestore();

    try {

        const user = firebase.auth().currentUser
        if (user.uid) {
            await firebase.firestore()
                .collection('users')
                .doc(user.uid)
                .collection('favourites')
                .doc(product.id)
                .set({
                    id: product.id,
                    mainImageName: product.mainImageName,
                    mainImageUrl: product.mainImageUrl,
                    productName: product.productName,
                    category: product.category,
                    dateFavourite: firestore.FieldValue.serverTimestamp()
                })
        }
    } catch (err) {
        console.log(err)
    }
}

export const removeFavourite = (productID) => async (
    dispatch,
    getState,
    { getFirebase, getFirestore }
) => {
    const firebase = getFirebase();
    const firestore = getFirestore();

    try {

        const user = firebase.auth().currentUser
        if (user.uid) {
            await firebase.firestore()
                .collection('users')
                .doc(user.uid)
                .collection('favourites')
                .doc(productID)
                .delete()
        }
    } catch (err) {
        console.log(err)
    }
}

export const getFavourite = () => async (
    dispatch,
    getState,
    { getFirebase, getFirestore }
) => {
    const firebase = getFirebase();
    const firestore = getFirestore();

    try {

        const user = firebase.auth().currentUser
        if (user.uid) {
            await firestore.get({
                collection: "users",
                doc: user.uid,
                subcollections: [{
                    collection: 'favourites'
                }],
                orderBy: 'dateFavourite',
                storeAs: 'favourites'
            })


        }
    } catch (err) {
        console.log(err)
    }
}




export const orderProductMakeVip = (data, product, color, size, pattern, uniqId, uniqueUrl) => async (
    dispatch,
    getState,
    { getFirebase, getFirestore }
) => {
    const firebase = getFirebase();
    const firestore = getFirestore();

    try {

        const user = firebase.auth().currentUser
        const path = `orders/${uniqId}/${product.productName}-${user.displayName}.png`;
        const options = {
            name: product.productName + "-" + user.displayName
        };

        const design = data

        let storageRef = await firebase.storage().ref().child(path).putString(design, 'data_url');
        let downloadURL = await firebase.storage().ref().child(path).getDownloadURL()

        if (user.uid) {
            const config = {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json;charset=UTF-8'
                }

            }
            const date = firestore.FieldValue.serverTimestamp()
            const secretKey = uuid()
            const body = JSON.stringify({ downloadURL, product, color, size, pattern, uniqId, uniqueUrl, user, date, secretKey })
            const res = await axios.post(`${api}/user/order-product`, body, config)
            toastr.success("Congrats", res.data)
        } else {

            toastr.error("OPSSS", "you should signed in before you can order a product ")
        }


    } catch (err) {
        console.log(err)
    }
}