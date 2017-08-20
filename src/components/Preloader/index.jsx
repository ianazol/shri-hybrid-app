import './style.scss';
import React from 'react';
import ProgressCircular from 'react-onsenui/src/components/ProgressCircular';

export default function Preloader() {
    return (
        <div className="preloader">
            <ProgressCircular indeterminate />
        </div>
    );
}