import React from 'react';
import { Toolbar, BackButton } from 'react-onsenui';

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