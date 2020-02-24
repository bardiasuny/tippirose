import { toastr } from "react-redux-toastr";
import { actionTypes } from "redux-firestore";
import { SubmissionError } from "redux-form";
import {
    asyncActionStart,
    asyncActionFinish,
    asyncActionError
} from "../../../features/async/asyncActions";

import axios from "axios"


import { FETCH_PRODUCT, FETCH_PRODUCT_IMAGES, FETCH_PRODUCT_PATTERNS } from "./productConstants"





export const addProduct = (product, images, initialValues) => async (
    dispatch,
    getState,
    { getFirebase, getFirestore }
) => {
    const firebase = getFirebase();
    const firestore = getFirestore();



    try {

        firebase.auth().currentUser.getIdToken(/* forceRefresh */ true).then(async (idToken) => {
            const config = {
                method: 'POST',
                timeout: 7000,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json;charset=UTF-8'
                }

            }

            const body = JSON.stringify({ product, images, initialValues, idToken })
            const res = await axios.post('/admin/add-product', body, config)
            console.log(res.data)
            toastr.success("Success", "you have successfully added our new product, well done ")
        }).catch(function (error) {
            // Handle error
        });



    } catch (err) {
        console.log(err)


    }

}


export const addPatternTemplate = (template, templateName) => async (
    dispatch,
    getState,
    { getFirebase, getFirestore }
) => {
    const firebase = getFirebase();
    const firestore = getFirestore();

    try {


        console.log(template)
        console.log(templateName)
        const path = `templates/${templateName}`;
        const options = {
            name: templateName
        };

        let UploadedFile = await firebase.uploadFile(path, template[0], null, options);
        let downloadURL = await UploadedFile.uploadTaskSnapshot.ref.getDownloadURL();

        await firebase.firestore()
            .collection('patterns')
            .doc(templateName)
            .set({
                name: templateName,
                url: downloadURL
            })


    } catch (err) {
        console.log(err)


    }

}






export const getProduct = (productID) => async (
    dispatch,
    getState,
    { getFirebase, getFirestore }
) => {
    const firebase = getFirebase();
    const firestore = getFirestore();

    try {


        if (productID) {
            let theProduct = []
            const product = await firebase.firestore()
                .collectionGroup('products')
                .where('id', '==', productID)
                .get()
            for (let i = 0; i < product.docs.length; i++) {
                theProduct.push(product.docs[i].data())
            }
            console.log(theProduct)

            dispatch({ type: FETCH_PRODUCT, payload: { product: theProduct } });
        } else {
            dispatch({ type: FETCH_PRODUCT, payload: { product: [] } });
        }
    } catch (err) {
        console.log(err)


    }

}

export const getProductWithCat = (category, productID) => async (
    dispatch,
    getState,
    { getFirebase, getFirestore }
) => {
    dispatch(asyncActionStart())
    try {

        if (productID && category) {
            const config = {
                method: 'POST',
                timeout: 7000,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json;charset=UTF-8'
                }
            }
            const body = JSON.stringify({ category, productID })
            const res = await axios.post('/admin/get-product', body, config)

            dispatch({ type: FETCH_PRODUCT, payload: { product: res.data } });
        } else {
            dispatch({ type: FETCH_PRODUCT, payload: { product: [] } });
        }
        dispatch(asyncActionFinish())
    } catch (err) {
        console.log(err)
        dispatch(asyncActionError())
    }

}







export const getProductImages = (productID) => async (
    dispatch,
    getState,
    { getFirebase, getFirestore }
) => {
    const firebase = getFirebase();
    const firestore = getFirestore();

    try {
        if (productID) {

            let imagesCollection = []
            const product = await firebase.firestore()
                .collectionGroup('products')
                .where('id', '==', productID)
                .get()

            const productInfo = product.docs[0].data()
            const productCategory = productInfo.category

            const productImages = await firebase.firestore()
                .collection('products')
                .doc(productCategory)
                .collection('products')
                .doc(productID)
                .collection('photos')
                .orderBy('name')
                .get()




            for (let i = 0; i < productImages.docs.length; i++) {
                const productImage = productImages.docs[i].data()
                imagesCollection.push({ ...productImage, id: productImages.docs[i].id })
            }



            dispatch({ type: FETCH_PRODUCT_IMAGES, payload: { img: imagesCollection } });
        } else {
            dispatch({ type: FETCH_PRODUCT_IMAGES, payload: { img: [] } });
        }
    } catch (err) {
        console.log(err)


    }

}

export const getProductImagesWithCat = (category, productID) => async (
    dispatch,
    getState,
    { getFirebase, getFirestore }
) => {
    dispatch(asyncActionStart())
    try {
        if (productID && category) {
            const config = {
                method: 'POST',
                timeout: 7000,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json;charset=UTF-8'
                }
            }
            const body = JSON.stringify({ category, productID })
            const res = await axios.post('/admin/get-product-images', body, config)

            dispatch({ type: FETCH_PRODUCT_IMAGES, payload: { img: res.data } });
        } else {
            dispatch({ type: FETCH_PRODUCT_IMAGES, payload: { img: [] } });
        }

        dispatch(asyncActionFinish())
    } catch (err) {
        console.log(err)
        dispatch(asyncActionError())
    }
}


export const getProductPatterns = () => async (
    dispatch,
    getState,
    { getFirebase, getFirestore }
) => {
    dispatch(asyncActionStart())
    const firebase = getFirebase();
    const firestore = getFirestore();

    try {
        let patternCollection = []

        const patternImages =
            await firebase.firestore()
                .collection('patterns')
                .get()
        for (let i = 0; i < patternImages.docs.length; i++) {
            const patterns = patternImages.docs[i].data()
            patternCollection.push(patterns)
        }

        dispatch({ type: FETCH_PRODUCT_PATTERNS, payload: { pattern: patternCollection } });

        dispatch(asyncActionFinish())
    } catch (err) {
        console.log(err)
        dispatch(asyncActionError())
    }
}






export const deleteImage = (initialValues, img) => async (
    dispatch,
    getState,
    { getFirebase, getFirestore }
) => {
    const firebase = getFirebase();
    const firestore = getFirestore();

    try {
        if (img.name === initialValues.mainImageName) {
            toastr.warning("Warning!", " you can't delete the main image. please select another Image as your prodcut's main image then try to delete this image.")
        } else {

            await firebase.firestore()
                .collection('products')
                .doc(initialValues.category)
                .collection('products')
                .doc(initialValues.id)
                .collection('photos')
                .doc(img.id)
                .delete()
            await firebase.deleteFile(`products/${initialValues.id}/product-images/${img.name}`)


            toastr.success("Success!", " you have successfully deleted the image")
        }



    } catch (err) {
        console.log(err)

        toastr.error("Woooops!", " Something went wrong, try again later")

    }

}

export const SetMainImage = (productID, img, productCategory) => async (
    dispatch,
    getState,
    { getFirebase, getFirestore }
) => {
    const firebase = getFirebase();
    const firestore = getFirestore();

    try {

        await firebase.firestore()
            .collection('products')
            .doc(productCategory)
            .collection('products')
            .doc(productID)
            .update({
                mainImageUrl: img.url,
                mainImageName: img.name
            })


    } catch (err) {
        console.log(err)


    }

}

export const resetReducer = (reducerName, reducerTag) => async (
    dispatch,
    getState,
    { getFirebase, getFirestore }
) => {
    const firebase = getFirebase();
    const firestore = getFirestore();

    try {

        dispatch({ type: reducerName, payload: { [reducerTag]: [] } });



    } catch (err) {
        console.log(err)


    }

}


export const getProductsCategory = (productCategory) => async (
    dispatch,
    getState,
    { getFirebase, getFirestore }
) => {
    const firebase = getFirebase();
    const firestore = getFirestore();

    try {

        await firestore.get({
            collection: "products",
            doc: productCategory,
            subcollections: [
                {
                    collection: 'products'
                }
            ],
            storeAs: productCategory

        })



    } catch (err) {
        console.log(err)
    }

}


export const getProductsCategoryForCatPage = (productCategory) => async (
    dispatch,
    getState,
    { getFirebase, getFirestore }
) => {
    const firebase = getFirebase();
    const firestore = getFirestore();

    try {

        await firestore.get({
            collection: "products",
            doc: productCategory,
            subcollections: [
                {
                    collection: 'products'
                }
            ],
            limit: 6,
            storeAs: 'products'

        })



    } catch (err) {
        console.log(err)
    }

}




export const unMountReducers = (name, tag) => async (
    dispatch,
    getState,
    { getFirebase, getFirestore }
) => {
    console.log('cleaning Reducers')
    dispatch({ type: name, payload: { tag: [{}] } });



}


export const assignProductColor = (initialValues, color, img) => async (
    dispatch,
    getState,
    { getFirebase, getFirestore }
) => {
    dispatch(asyncActionStart())
    const firebase = getFirebase();
    const firestore = getFirestore();

    try {

        console.log(initialValues.category)

        await firebase.firestore()
            .collection('products')
            .doc(initialValues.category)
            .collection("products")
            .doc(initialValues.id)
            .collection('photos')
            .doc(img.id)
            .update({
                color: color
            })




        dispatch(asyncActionFinish())
    } catch (err) {
        console.log(err)
        dispatch(asyncActionError())
    }
}

export const assignPatternToImage = (initialValues, pattern, img) => async (
    dispatch,
    getState,
    { getFirebase, getFirestore }
) => {
    dispatch(asyncActionStart())
    const firebase = getFirebase();
    const firestore = getFirestore();

    try {
        console.log('hello')
        console.log(pattern);
        console.log(initialValues.category)

        await firebase.firestore()
            .collection('products')
            .doc(initialValues.category)
            .collection("products")
            .doc(initialValues.id)
            .collection('photos')
            .doc(img.id)
            .set({
                pattern: pattern
            }, { merge: true })




        dispatch(asyncActionFinish())
    } catch (err) {
        console.log(err)
        dispatch(asyncActionError())
    }
}





export const setProductQRCodeInImage = (name, value, imgId, initialValues) => async (
    dispatch,
    getState,
    { getFirebase, getFirestore }
) => {
    dispatch(asyncActionStart())
    const firebase = getFirebase();
    const firestore = getFirestore();

    try {

        await firebase.firestore()
            .collection('products')
            .doc(initialValues.category)
            .collection("products")
            .doc(initialValues.id)
            .collection('photos')
            .doc(imgId)
            .set({
                [name]: value
            }, { merge: true })


        dispatch(asyncActionFinish())
    } catch (err) {
        console.log(err)
        dispatch(asyncActionError())
    }
}

export const addPatternToProduct = (pattern, initialValues, patterns) => async (
    dispatch,
    getState,
    { getFirebase, getFirestore }
) => {
    dispatch(asyncActionStart())
    const firebase = getFirebase();
    const firestore = getFirestore();


    try {
        console.log(initialValues)
        // await firebase.firestore()
        //     .collection('products')
        //     .doc(initialValues.category)
        //     .collection("products")
        //     .doc(initialValues.id)
        //     .collection('patterns')
        //     .doc(pattern.name)
        //     .set(pattern)

        let prevPattens = []
        if (patterns) {
            prevPattens = patterns
        }

        console.log({ patterns })
        console.log({ pattern })

        await firebase.firestore()
            .collection('products')
            .doc(initialValues.category)
            .collection("products")
            .doc(initialValues.id)
            .update({
                patterns: [...prevPattens, pattern]
            })


        dispatch(asyncActionFinish())
    } catch (err) {
        console.log(err)
        dispatch(asyncActionError())
    }
}