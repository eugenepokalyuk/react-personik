import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as IconMessage } from '../../assets/icons/message.svg';
import GameFrame from '../../components/GameFrame/GameFrame';
import LoadingDots from '../../components/LoadingDots/LoadingDots';
import { getLastChar } from '../../utils/getLastChar';
import { getNextCity } from '../../utils/getNextCity';
import { validateCityName } from '../../utils/validateCityName';
import { validateExistingCity } from '../../utils/validateExistingCity';

const GamePage: React.FC = () => {
    const navigate = useNavigate();
    const gameTimePerPlayer = 120; // 2 минуты в секундах

    const [timeLeft, setTimeLeft] = useState(gameTimePerPlayer);
    const [cities, setCities] = useState<string[]>([]);
    const [currentCity, setCurrentCity] = useState('');
    const [isUserTurn, setIsUserTurn] = useState(true);
    const [lastChar, setLastChar] = useState<string | null>(null);
    const [isThinking, setIsThinking] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [animationKey, setAnimationKey] = useState(0);

    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (timeLeft > 0) {
            const timerId = setInterval(() => {
                setTimeLeft(prevTime => prevTime - 1);
            }, 1000);

            return () => clearInterval(timerId);
        } else {
            navigate('/result', {
                state: {
                    result: isUserTurn ? 'lose' : 'win',
                    totalCities: cities.length,
                    lastCity: cities[cities.length - 1],
                },
            });
        }
    }, [timeLeft, isUserTurn, cities, navigate]);

    useEffect(() => {
        if (!isUserTurn) {
            setIsThinking(true);
            getNextCity(cities, lastChar).then((nextCity: string) => {
                setCities(prevCities => [...prevCities, nextCity]);
                setLastChar(getLastChar(nextCity));
                setIsThinking(false);
                setIsUserTurn(true);
                setTimeLeft(gameTimePerPlayer); // Сброс времени для следующего хода
                setAnimationKey(prevKey => prevKey + 1); // Обновление ключа для анимации
            });
        }
    }, [isUserTurn, cities, lastChar]);

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [cities]);

    const handleCityInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        if (validateCityName(value)) {
            setCurrentCity(value);
            setError(null);
        }
    };

    const handleCitySubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!isUserTurn) {
            setError('Сейчас ход соперника.');
            return;
        }
        if (!validateExistingCity(currentCity)) {
            setError('Такого города не существует.');
            return;
        }
        if (cities.includes(currentCity)) {
            setError('Такой город уже был введен.');
            return;
        }
        if (
            currentCity &&
            validateExistingCity(currentCity) &&
            !cities.includes(currentCity) &&
            (!lastChar || currentCity.toLowerCase().startsWith(lastChar))
        ) {
            setCities([...cities, currentCity]);
            setLastChar(getLastChar(currentCity));
            setCurrentCity('');
            setIsUserTurn(false);
            setTimeLeft(gameTimePerPlayer); // Сброс времени для следующего хода
            setAnimationKey(prevKey => prevKey + 1); // Обновление ключа для анимации
            setError(null);
        } else {
            setError('Играй по правилам!');
            return;
        }
    };

    return (
        <GameFrame className='min-h-[578px]'>
            <div className='flex flex-col justify-between pt-6 space-y-6'>
                <div className='flex justify-between items-top text-center px-6'>
                    <h2 className="text-left text-base">{isUserTurn ? "Сейчас ваша очередь" : "Сейчас очередь соперника"}</h2>
                    <p className="text-lg">{`0${Math.floor(timeLeft / 60)}:${timeLeft % 60 < 10 ? `0${timeLeft % 60}` : timeLeft % 60}`}</p>
                </div>

                <div className="w-full bg-gray-100 h-1.5 relative">
                    <div
                        key={animationKey}
                        className="progress-bar bg-violet-300 h-1.5"
                        style={{
                            animation: `progress ${gameTimePerPlayer}s linear infinite`,
                            width: `${(timeLeft / gameTimePerPlayer) * 100}%`
                        }}
                    ></div>
                </div>
            </div>

            <div className="min-h-96 h-full">
                {cities.length === 0 ? (
                    <div className='h-96 flex justify-center items-center text-center'>
                        <p className="text-gray-400">Первый участник вспоминает города...</p>
                    </div>
                ) : (
                    <div>
                        <ul className='h-96 w-full flex flex-col p-4 overflow-y-auto'>
                            {cities.map((city, index) => (
                                <li
                                    key={index}
                                    className={`break-all whitespace-normal w-auto mb-2 px-3 py-1.5 ${index % 2 === 0 ? ('rounded-xl rounded-bl-none bg-violet-50 text-left mr-auto') : ('rounded-xl rounded-br-none bg-violet-500 text-white text-right ml-auto')}`}
                                >
                                    {city}
                                </li>
                            ))}

                            {isThinking && (
                                <li className="break-words w-auto mb-2 px-3 py-3.5 rounded-xl rounded-br-none bg-violet-500 text-white text-right ml-auto">
                                    <LoadingDots />
                                </li>
                            )}

                            <div ref={messagesEndRef} />
                        </ul>

                        <div className='h-full flex justify-center items-center'>
                            <p className="text-xs text-gray-400">Всего перечислено городов: {cities.length}</p>
                        </div>
                    </div>
                )}
            </div>
            <div className='p-4'>
                <form onSubmit={handleCitySubmit} className='flex flex-col md:flex-row justify-center items-center'>
                    <div className={`flex items-center bg-gray-100 rounded w-full ${error && "border border-red-500"}`}>
                        <input
                            type="text"
                            value={currentCity}
                            onChange={handleCityInput}
                            className="bg-transparent text-gray-700 w-full p-3 text-sm outline-none"
                            placeholder={`${lastChar ? `Знаете город на букву ${lastChar.toUpperCase()}?` : 'Напишите любой город, например: Где вы живете?'}`}
                            disabled={!isUserTurn}
                        />
                        <button
                            type="submit"
                            className="hidden md:block bg-purple-500 hover:bg-purple-600 text-white p-2 m-2 rounded"
                            disabled={!isUserTurn}
                        >
                            <IconMessage />
                        </button>
                    </div>
                    <button
                        type="submit"
                        className="flex md:hidden justify-center items-center bg-purple-500 hover:bg-purple-600 text-white p-2 m-2 rounded w-full"
                        disabled={!isUserTurn}
                    >
                        Отправить <IconMessage />
                    </button>
                </form>
                {error && (
                    <div className='bg-red-300/[.2] p-3 mt-2 rounded'>
                        <p className="text-red-500">{error}</p>
                    </div>
                )}
            </div>
        </GameFrame>
    );
};

export default GamePage;