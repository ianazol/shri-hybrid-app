import './style.scss';
import React from 'react';

export default function(props) {
    let descriptionExist = props.title || props.location;

    function renderDescription() {
        return (
            <div className="image-card__description">
                { props.title && <p className="image-card__title">{props.title}</p> }
                { props.location && <p className="image-card__location">{props.location}</p> }
            </div>
        );
    }

    return (
        <div className="card image-card">
            <img src={props.url} className="image-card__img" />
            { descriptionExist && renderDescription() }
        </div>
    );
}