import React from 'react'

function OfflineInfo() {
    return (
        <div className="offline">
            <div className="offline__info">
                <img src="img/tower-transmissions.svg" className="offline__image" />
                <p className="offline__text">
                    <span className="offline__title">Проблемы со связью</span><br/>
                    Нет подключения к интернету
                </p>
            </div>
        </div>
    )
}

export default  OfflineInfo;