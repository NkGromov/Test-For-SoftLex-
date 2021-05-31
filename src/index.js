import React from "react";
import ReactDOM from "react-dom";
import App from "./Containers/App/App";
import "./index.sass";
import { Provider } from "react-redux";
import store from "./Redux/store";

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById("root")
);
