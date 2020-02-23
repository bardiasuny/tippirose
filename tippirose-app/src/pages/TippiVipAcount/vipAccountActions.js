import { FETCH_PRODUCT_VIP_DASHBOARD } from "../Admin/Product/productConstants"


export const getTippiVipUserProduct = (userId, uniqueId) => async (
    dispatch,
    getState,
    { getFirebase, getFirestore }
) => {
    const firebase = getFirebase();
    const firestore = getFirestore();

    try {

        const user = firebase.auth().currentUser
        let allUserProducts = []
        const vipUserProductQuery = await firebase.firestore()
            .collection('users')
            .doc(user.uid)
            .collection('userProducts')
            .get()

        for (let i = 0; i < vipUserProductQuery.docs.length; i++) {
            const products = vipUserProductQuery.docs[i].data()
            allUserProducts.push(products)
        }

        dispatch({ type: FETCH_PRODUCT_VIP_DASHBOARD, payload: allUserProducts })

    } catch (err) {
        console.log(err)
    }
}