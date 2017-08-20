import React, { Component } from 'react';
import Page from 'react-onsenui/src/components/Page';
import Button from 'react-onsenui/src/components/Button';
import Navbar from '../Navbar';
import ImageList from '../ImageList';
import ImageAddPage from '../ImageAddPage';

class MainPage extends Component {
    gotoImageAddPage(imageURI) {
        this.props.navigator.pushPage({ component: ImageAddPage, key: 'IMAGE_ADD_PAGE', imageURI });
    }

    onActionSelect(buttonIndex) {
        let pictureSourceType;

        if (buttonIndex === 1) {
            pictureSourceType = "PHOTOLIBRARY";
        } else if (buttonIndex === 2) {
            pictureSourceType = "CAMERA";
        }

        if (pictureSourceType) {
            this.takePicture(pictureSourceType);
        }
    }

    takePicture(pictureSourceType) {
        const cameraOptions = {
            quality: 90,
            targetWidth: 1000,
            targetHeight: 1000,
            destinationType: Camera.DestinationType.FILE_URI,
            sourceType: Camera.PictureSourceType[pictureSourceType],
            encodingType: Camera.EncodingType.JPEG,
            mediaType: Camera.MediaType.PICTURE,
            cameraDirection: Camera.Direction.FRONT
        };

        navigator.camera.getPicture(
            (imageURI) => this.gotoImageAddPage(imageURI),
            (error) => console.log(error),
            cameraOptions
        );
    }

    showImagePicker() {
        let options = {
            androidTheme: window.plugins.actionsheet.ANDROID_THEMES.THEME_DEVICE_DEFAULT_LIGHT,
            title: 'Откуда загрузить изображение?',
            buttonLabels: ['Выбрать из галереи', 'Сделать фото'],
            androidEnableCancelButton : true,
            addCancelButtonWithLabel: 'Отменить',
            position: [20, 40]
        };

        window.plugins.actionsheet.show(options, this.onActionSelect.bind(this));
    }

    renderToolbar() {
        return <Navbar title="Картинки" navigator={navigator} />;
    }

    renderButton() {
        return (
            <Button className="button_bottom_fixed button_no-rounded"
                    onClick={this.showImagePicker.bind(this)}
                    modifier='large'>Добавить</Button>
        );
    };

    render() {
        return (
            <Page renderToolbar={this.renderToolbar.bind(this)}
                  renderFixed={this.renderButton.bind(this)}
                  className="page_fixed">
                <ImageList isOnline={this.props.isOnline} />
            </Page>
        );
    }
}

export default MainPage;