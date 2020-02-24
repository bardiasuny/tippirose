import { toastr } from "react-redux-toastr";
import { actionTypes } from "redux-firestore";
import { SubmissionError } from "redux-form";
import axios from "axios"


export const getTippiVipUserProduct = (userId, uniqueId) => async (
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
        const data = JSON.stringify({ userId, uniqueId })
        const res = await axios.post('/vip/get-user-product', data, config)
        return res.data


    } catch (err) {
        console.log(err)
    }
}