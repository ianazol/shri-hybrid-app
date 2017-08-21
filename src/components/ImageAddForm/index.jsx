import './style.scss';
import React, { Component } from 'react';
import Button from 'react-onsenui/src/components/Button';
import Input from 'react-onsenui/src/components/Input';
import { uploadFileToFirebaseStorage, saveToFirebase } from '../../utils/firebase';
import { createBlobImageFromUri } from '../../utils/fs';

class ImageAdd extends Component {
    constructor() {
        super();
        this.state = {
            title: '',
            loading: false
        };

        this.onTitleChange = this.onTitleChange.bind(this);
        this.onFormSubmit = this.onFormSubmit.bind(this);
    }

    onTitleChange(event) {
        this.setState({ title: event.target.value });
    }

    onFormSubmit() {
        this.setState({ loading: true });

        createBlobImageFromUri(this.props.imageURI)
            .then((blob) => {
                let filename = this.props.imageURI.replace(/^.*[\\\/]/, '');
                return uploadFileToFirebaseStorage(blob, `images/${filename}`);
            })
            .then((downloadURL) => {
                let data = {
                    priority: -Date.now(),
                    title: this.state.title,
                    url: downloadURL
                };
                return saveToFirebase(data, `/images`);
            })
            .then(() => {
                this.setState({ loading: false });
                navigator.notification.alert('Изображение опубликовано', this.gotoMainPage.bind(this), '');
            })
            .catch((error) => {
                let alertCallback = () => console.log(error);
                navigator.notification.alert('Произошла ошибка', alertCallback, '');
            });
    }

    gotoMainPage() {
        this.props.navigator.popPage();
    }

    renderImage() {
        return (
            <div className="imageAddForm__img-container">
                <img src={this.props.imageURI} className="imageAddForm__img" />
            </div>
        );
    }

    renderButton() {
        if (!this.state.loading) {
            return <Button modifier='large' onClick={this.onFormSubmit}>Опубликовать</Button>;
        } else {
            return <Button modifier='large' disabled>Сохраняем...</Button>;
        }
    }

    render() {
        return (
            <div className="imageAddForm">
                {this.props.imageURI && this.renderImage()}
                <div className="imageAddForm__title">
                    <Input
                        value={this.state.title}
                        className="imageAddForm__title-input"
                        placeholder="Введите подпись..."
                        onChange={this.onTitleChange}
                    />
                </div>
                {this.renderButton()}
            </div>
        );
    }
}

export default ImageAdd;