import React from 'react';
import { Route, Routes } from 'react-router-dom';
import GamePage from '../../pages/GamePage/GamePage';
import ResultPage from '../../pages/ResultPage/ResultPage';
import WelcomePage from '../../pages/WelcomePage/WelcomePage';

const App: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<WelcomePage />} />
            <Route path="/game" element={<GamePage />} />
            <Route path="/result" element={<ResultPage />} />
        </Routes>
    );
};

export default App;
