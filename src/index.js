import React from 'react';
import ReactDom from 'react-dom';
import App from './app';

// todo onError
// window.onError = function(error) {
//     console.log(error);
// };

function onDeviceReady() {
    ReactDom.render(<App />, document.getElementById("app"));
}

document.addEventListener("deviceready", onDeviceReady, true);