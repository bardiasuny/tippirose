import firebaseDb from "../../app/config/firebase"

import { toastr } from "react-redux-toastr";
import { actionTypes } from "redux-firestore";
import { SubmissionError } from "redux-form";
import { closeModal } from "../Modals/modalActions";

import {
    asyncActionStart,
    asyncActionFinish,
    asyncActionError
} from "../async/asyncActions";
var functions = firebaseDb.functions();
functions.useFunctionsEmulator('http://localhost:5000')

export const login = creds => {
    return async (dispatch, getState, { getFirebase, getFirestore }) => {
        console.log("helloooo")
        const firebase = getFirebase();
        const firestore = getFirestore();

        try {
            dispatch(asyncActionStart);



            const user = await firebase
                .auth()
                .signInWithEmailAndPassword(creds.email, creds.password);


            // var login = functions.httpsCallable('login');

            // addMe(user.uid).then(function (result) {
            //     // Read result of the Cloud Function.
            //     console.log(result)

            // });

            // const login = await axios.post(
            //   "http:start-x-university/us-central1/app/login",
            //   creds
            // );
            toastr.success("Success", "you are now loged in")

            dispatch(asyncActionFinish);
        } catch (error) {
            dispatch(asyncActionError);
            console.log(error);
            throw new SubmissionError({
                _error: "Login Failed"
            });
        }

        await dispatch(closeModal());
    };
};


export const logout = history => {
    return async (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase();

        try {
            dispatch(asyncActionStart);
            await firebase.logout();
            await dispatch({ type: actionTypes.CLEAR_DATA });

            history.push("/");

            toastr.success("Success", "you are now loged out")
            dispatch(asyncActionFinish);
        } catch (error) {
            dispatch(asyncActionError);
            throw new SubmissionError({
                _error: "Logout Failed"
            });
        }

        await dispatch(closeModal());
    };
};


export const signUp = user => async (
    dispatch,
    getState,
    { getFirebase, getFirestore }
) => {
    const firebase = getFirebase();
    const firestore = getFirestore();
    dispatch(asyncActionStart());
    try {



        let createdUser = await firebase
            .auth()
            .createUserWithEmailAndPassword(user.email, user.password);

        await createdUser.user.updateProfile({
            displayName: user.displayName,
            type: "startup"
        });
        let newUser = {
            id: createdUser.user.uid,
            displayName: user.displayName,
            createdAt: firestore.FieldValue.serverTimestamp(),
            email: user.email
        };
        await firestore.set(`users/${createdUser.user.uid}`, { ...newUser });

        // await firebase.auth().onAuthStateChanged(function (user) {
        //     user.sendEmailVerification();
        // });


        dispatch(asyncActionFinish());

        dispatch(closeModal());
    } catch (error) {
        console.log(error);
        dispatch(asyncActionError());
        throw new SubmissionError({
            _error: error.message
        });
    }
};