import React from 'react';

function networkWatcher(Component) {
    class NetworkWatcher extends React.Component {
        constructor() {
            super();
            this.state = {
                isOnline: true
            }
        }

        componentWillMount() {
            this.checkNetworkConnection();
            document.addEventListener("offline", this.offlineHandler.bind(this), false);
            document.addEventListener("online", this.onlineHandler.bind(this), false);
        }

        componentWillUnmount() {
            document.removeEventListener("offline", this.offlineHandler.bind(this), false);
            document.removeEventListener("online", this.onlineHandler.bind(this), false);
        }

        shouldComponentUpdate(nextProps, nextState) {
            return this.state.isOnline !== nextState.isOnline;
        }

        componentDidUpdate(prevProps, prevState) {
            if (this.state.isOnline === false) {
                navigator.notification.alert('Проверьте подключение к интернету', () => {}, '');
            }
        }

        offlineHandler() {
            this.setState({ isOnline: false });
        }

        onlineHandler() {
            this.setState({ isOnline: true });
        }

        checkNetworkConnection() {
            if (navigator.connection.type === Connection.NONE) {
                this.offlineHandler();
            }
        }

        render() {
            return <Component isOnline={this.state.isOnline} {...this.props} />
        }
    }

    NetworkWatcher.displayName = `NetworkWatcher(${Component.displayName || Component.name || 'Component'})`;

    return NetworkWatcher;
}

export default networkWatcher;