import './css/onsenui.min.css';
import './css/onsen-css-components.min.css';
import './css/index.css';

import React, { Component } from 'react';
import { Navigator } from 'react-onsenui';
import MainPage from './components/MainPage';
import NetworkWatcher from './hoc/NetworkWatcher';
import firebase from 'firebase';
import firebaseConfig from './firebaseConfig';

class App extends Component {
    componentWillMount() {
        firebase.initializeApp(firebaseConfig);
    }

    renderPage(route, navigator) {
        return <route.component key={route.key} navigator={navigator} route={route} {...this.props} />
    }

    render() {
        return (
            <Navigator
                renderPage={this.renderPage.bind(this)}
                initialRoute={{component: MainPage, key: 'MAIN_PAGE'}}
            />
        );
    }
}

export default NetworkWatcher(App);