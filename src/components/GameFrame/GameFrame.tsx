import React from 'react';

interface IGameFrame {
    children: React.JSX.Element | React.JSX.Element[],
    className?: string
}

const GameFrame: React.FC<IGameFrame> = ({ children, className }) => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-200 p-4 md:p-0">
            <div className={`bg-white shadow rounded-2xl max-w-xl w-full ${className ? className : ""} flex flex-col justify-between`}>
                {children}
            </div>
        </div>
    );
};

export default GameFrame;