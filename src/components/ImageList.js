import React, { Component } from 'react';
import ImageItem from './ImageItem';
import Preloader from './Preloader';
import OfflineInfo from './OfflineInfo';
import { fetchFromFirebase, authInFirebase } from '../helpers';

class ImageList extends Component {
    constructor() {
        super();
        this.state = {
            loading: true,
            pictures: []
        };
    }

    componentWillMount() {
        if (this.props.isOnline) {
            this.connectToFirebase();
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.isOnline === nextProps.isOnline) {
            return;
        }
        if (nextProps.isOnline === true) {
            this.connectToFirebase();
        }
    }

    connectToFirebase() {
        authInFirebase()
            .then(() => {
                fetchFromFirebase('images', (values) => {
                    this.setState({
                        loading: false,
                        pictures: values || []
                    });
                });
            });
    }

    renderPictures() {
        return (
            <div>
                {this.state.loading &&  <Preloader />}
                {this.state.pictures.map((picture) => {
                    return <ImageItem key={picture.priority} {...picture} />;
                })}
            </div>
        );
    }

    render() {
        let pictureExists = this.state.pictures.length > 0;
        if (this.props.isOnline || pictureExists) {
            return this.renderPictures();
        } else {
            return <OfflineInfo />;
        }
    }
}

export default ImageList;