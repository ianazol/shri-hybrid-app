import React from 'react';

export default function(props) {
    let descriptionExist = props.title || props.location;

    function renderDescription() {
        return (
            <div className="card__description">
                { props.title && <p className="card__title">{props.title}</p> }
                { props.location && <p className="card__location">{props.location}</p> }
            </div>
        );
    }

    return (
        <div className="card">
            <img src={props.url} className="card__img" />
            { descriptionExist && renderDescription() }
        </div>
    );
}