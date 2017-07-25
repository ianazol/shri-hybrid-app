import React from 'react';
import ProgressCircular from 'react-onsenui/src/components/ProgressCircular.jsx';

export default function Preloader() {
    return (
        <div className="preloader">
            <ProgressCircular indeterminate />
        </div>
    );
}