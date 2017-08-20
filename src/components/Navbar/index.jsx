import React from 'react';
import Toolbar from 'react-onsenui/src/components/Toolbar';
import BackButton from 'react-onsenui/src/components/BackButton';

function Navbar({ title, navigator, backButton }) {
    return (
        <Toolbar>
            <div className="left">
                {backButton ? <BackButton onClick={() => navigator.popPage()}>Назад</BackButton> : null}
            </div>
            <div className="center">{title}</div>
        </Toolbar>
    );
}

export default Navbar;