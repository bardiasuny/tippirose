import { toastr } from "react-redux-toastr";
import { actionTypes } from "redux-firestore";
import { SubmissionError } from "redux-form";


export const getTippiVipUserProduct = (userId, uniqueId) => async (
    dispatch,
    getState,
    { getFirebase, getFirestore }
) => {
    const firebase = getFirebase();
    const firestore = getFirestore();

    try {

        // const vipUserProductQuery = await firebase.firestore()
        //     .collectionGroup('userProducts')
        //     .where('uniqueId', '==', uniqueId)
        //     .get()

        const vipUserProductQuery = await firebase.firestore()
            .collection('users')
            .doc(userId)
            .collection('userProducts')
            .doc(uniqueId)
            .get()


        //console.log(vipUserProductQuery.data())



        return await vipUserProductQuery.data()

    } catch (err) {
        console.log(err)
    }
}