
import { toastr } from "react-redux-toastr";
import { actionTypes } from "redux-firestore";
import { SubmissionError } from "redux-form";
import {
    asyncActionStart,
    asyncActionFinish,
    asyncActionError
} from "../async/asyncActions";

import uuid from "uuid"



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


        console.log("color", uniqueUrl)




        if (user.uid) {



            //const url = `http://localhost:3000/vip/${user.uid}/${uniqueId}`

            const path = `orders/${uniqId}/${product.productName}-${user.displayName}.png`;
            const options = {
                name: product.productName + "-" + user.displayName
            };

            const design = data

            // let UploadedFile = await firebase.uploadFile(path, design, null, options);
            // let downloadURL = await UploadedFile.uploadTaskSnapshot.ref.getDownloadURL();

            let storageRef = await firebase.storage().ref().child(path).putString(design, 'data_url');
            let downloadURL = await firebase.storage().ref().child(path).getDownloadURL()

            await firebase.firestore()
                .collection('orders')
                .add({
                    orderDate: firestore.FieldValue.serverTimestamp(),
                    productID: product.id,
                    category: product.category,
                    userId: user.uid,
                    userName: user.displayName,
                    userEmail: user.email,
                    pattern: pattern,
                    size: size,
                    color: color,
                    url: uniqueUrl,
                    uniqueId: uniqId,
                    designImgUrl: downloadURL,
                    secretKey: uuid(),
                    mainImageUrl: product.mainImageUrl,
                    price: product.price
                }).then(async docRef => {
                    console.log("addedOrder ID :", docRef.id)

                    await firebase.firestore()
                        .collection('users')
                        .doc(user.uid)
                        .collection('userProducts')
                        .doc(uniqId)
                        .set({
                            orderDate: firestore.FieldValue.serverTimestamp(),
                            productID: product.id,
                            userId: user.uid,
                            userName: user.displayName,
                            userEmail: user.email,
                            pattern: pattern,
                            size: size,
                            color: color,
                            url: uniqueUrl,
                            uniqueId: uniqId,
                            designImgUrl: downloadURL,
                            mainImageUrl: product.mainImageUrl,
                            madein: product.madein,
                            description: product.description,
                            orderId: docRef.id
                        })

                    await firebase.firestore()
                        .collection('users')
                        .doc(user.uid)
                        .update({
                            level: "vip"
                        })

                })
        }




    } catch (err) {
        console.log(err)
    }
}