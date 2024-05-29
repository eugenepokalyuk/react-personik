import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import GameFrame from '../../components/GameFrame/GameFrame';

interface ResultPageProps {
  result: 'win' | 'lose';
  totalCities: number;
  lastCity: string;
}

const ResultPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { result, totalCities, lastCity } = location.state as ResultPageProps;

  const getResultMessage = () => {
    let result: string = "";

    switch (true) {
      case (totalCities >= 50):
        result = 'Вы настоящий мастер игры в города!';
        break;
      case (totalCities >= 40):
        result = 'Отличный результат!';
        break;
      case (totalCities >= 30):
        result = 'Очень хороший результат!';
        break;
      case (totalCities >= 20):
        result = 'Неплохой результат!';
        break;
      case (totalCities >= 10):
        result = 'Хорошее начало!';
        break;
      default:
        result = 'Попробуйте снова и у вас обязательно получится!';
        break;
    }
    return result;
  };

  const handleRestart = () => {
    navigate('/');
  };

  return (
    <GameFrame className='flex flex-col justify-center items-center space-y-8 py-10'>
      {result === 'lose' ? (
        <>
          <div className='text-center'>
            <h2 className="text-xl font-bold">К сожалению твое время вышло!</h2>
            <p className="text-lg">Твой противник победил!</p>
          </div>
          <p className="text-4xl text-red-500 mt-4 mb-4">00:00</p>
        </>
      ) : (
        <>
          <div className='text-center'>
            <h2 className="text-xl font-bold">Поздравляем тебя с победой!</h2>
            <p className="text-lg">Твой противник не вспомнил нужный город!</p>
          </div>
          <p className="text-4xl text-green-500 mt-4 mb-4">00:00</p>
        </>
      )}

      <div className='text-center'>
        <p className="text-lg">Всего было перечислено городов: {totalCities}</p>
        <p className="text-lg">{getResultMessage()}</p>
      </div>

      <div className='text-center'>
        <p className="text-lg">Последний город названный победителем</p>
        <p className="text-2xl font-bold">{lastCity}</p>
      </div>
      <button
        onClick={handleRestart}
        className="bg-purple-500 text-white p-2 rounded mt-4"
      >
        Начать новую игру
      </button>
    </GameFrame>
  );
};

export default ResultPage;
