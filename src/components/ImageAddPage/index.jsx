import React from 'react';
import Page from 'react-onsenui/src/components/Page.jsx';
import Navbar from '../Navbar/index';
import ImageAddForm from '../ImageAddForm';
import OfflineInfo from '../OfflineInfo/index';

function ImageAddPage({ isOnline, navigator, route }) {
    function renderToolbar() {
        return <Navbar title="Добавить" navigator={navigator} backButton />;
    }

    let pageContent = isOnline ? <ImageAddForm imageURI={route.imageURI} navigator={navigator} /> : <OfflineInfo />;

    return (
        <Page renderToolbar={renderToolbar}>
            { pageContent }
        </Page>
    );
}

export default ImageAddPage;