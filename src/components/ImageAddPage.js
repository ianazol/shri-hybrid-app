import React from 'react';
import { Page } from 'react-onsenui';
import Navbar from './Navbar';
import ImageAddForm from './ImageAddForm';
import OfflineInfo from './OfflineInfo';

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