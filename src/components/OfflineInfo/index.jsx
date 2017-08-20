import './style.scss';
import React from 'react'

function OfflineInfo() {
    return (
        <div className="offline-info">
            <div className="offline-info_centered">
                <img src="img/tower-transmissions.svg" className="offline-info__image" />
                <p className="offline-info__text">
                    <span className="offline-info__title">Проблемы со связью</span><br/>
                    Нет подключения к интернету
                </p>
            </div>
        </div>
    )
}

export default  OfflineInfo;