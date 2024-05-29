import React from 'react';
import { useNavigate } from 'react-router-dom';
import GameFrame from '../../components/GameFrame/GameFrame';

const WelcomePage: React.FC = () => {
    const navigate = useNavigate();

    const startGame = () => {
        navigate('/game');
    };

    return (
        <GameFrame>
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-200">
                <div className="bg-white rounded-2xl max-w-xl w-full">
                    <div className='prose text-center p-6'>
                        <h4 className="text-base font-normal">Игра в города на время</h4>
                    </div>

                    <div className="w-full bg-gray-100 h-1.5">
                        <div className="bg-gray-100 h-1.5 w-full"></div>
                    </div>

                    {/*  */}
                    <div className='prose prose-sm p-6 space-y-6'>
                        <p className="text-sm">Цель: Назвать как можно больше реальных городов.</p>
                        <ul className="pl-5 list-disc list-outside text-sm !mt-0">
                            <li>Запрещается повторение городов.</li>
                            <li>Названий городов на твердый “ъ” и мягкий “ъ” знак нет. Из-за этого бы пропускаем эту букву и игрок должен назвать город на букву стоящую перед ъ или ь знаком.</li>
                            <li>Каждому игроку дается 2 минуты на размышления, если спустя это время игрок не вводит слово он считается проигравшим</li>
                        </ul>
                        <div className='w-full flex justify-center'>
                            <button
                                className="bg-violet-600 hover:bg-violet-700 text-white rounded px-4 py-2 font-medium"
                                onClick={startGame}
                            >
                                Начать игру
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </GameFrame>
    );
};

export default WelcomePage;