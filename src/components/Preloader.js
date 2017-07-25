import React from 'react';
import { ProgressCircular } from 'react-onsenui';

export default function Preloader() {
    return (
        <div className="preloader">
            <ProgressCircular indeterminate />
        </div>
    );
}