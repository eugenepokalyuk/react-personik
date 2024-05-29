import React from 'react';
import './LoadingDots.css';

const LoadingDots: React.FC = () => {
    return (
        <div className="loading-dots">
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
        </div>
    );
};

export default LoadingDots;