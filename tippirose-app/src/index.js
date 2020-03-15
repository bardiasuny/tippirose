import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import "./App.css"

import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { configureStore } from "./app/store/configureStore";
import ScrollToTop from "./app/util/scrollToTop"

import ReduxToasr from "react-redux-toastr";
import "react-redux-toastr/lib/css/react-redux-toastr.min.css";

const store = configureStore();

const rootEl = document.getElementById('root')


let render = () => {
    ReactDOM.render(
        <Provider store={store}>
            <BrowserRouter>
                <ScrollToTop>
                    <ReduxToasr
                        timeOut={7000}
                        position="bottom-right"
                        transitionIn="fadeIn"
                        transitionOut="fadeOut"
                        progressBar
                        closeOnToastrClick
                        preventDuplicates
                    />
                    <App />
                </ScrollToTop>
            </BrowserRouter>
        </Provider>

        , rootEl
    )
}


if (module.hot) {
    module.hot.accept("./App", () => {
        setTimeout(render);
    });
}



store.firebaseAuthIsReady.then(() => {
    render();
});


serviceWorker.unregister();
