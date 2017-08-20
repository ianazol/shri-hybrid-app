import './onsenui/onsen-css-components.min.css';
import './onsenui/onsenui.min.css';
import './app.style.scss';
import React, { Component } from 'react';
import { initFirebase } from './utils/firebase';
import Navigator from 'react-onsenui/src/components/Navigator';
import MainPage from './components/MainPage';
import NetworkWatcher from './components/NetworkWatcher';

class App extends Component {
    componentWillMount() {
        initFirebase();
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