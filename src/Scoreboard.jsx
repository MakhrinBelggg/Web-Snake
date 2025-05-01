import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import '../src/styles/Scoreboard.css';
import '../src/styles/buttons.css';
import '../src/styles/colors.css';
import '../src/styles/text.css';
import '../src/styles/background.css';

const Scoreboard = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const [leaders, setLeaders] = useState([
    { id: 1, name: "Змеелов", score: 1250 },
    { id: 2, name: "Питоныч", score: 1100 },
    { id: 3, name: "Кодер", score: 980 },
    { id: 4, name: "Программист", score: 850 },
    { id: 5, name: "Джава", score: 720 },
    { id: 6, name: "Пайтон", score: 650 },
    { id: 7, name: "Аналитик", score: 550 },
    { id: 8, name: "Разработчик", score: 450 },
    { id: 9, name: "Стажер", score: 300 },
    { id: 10, name: "Новичок1", score: 150 },
    { id: 11, name: "Новичок2", score: 150 },
    { id: 12, name: "Новичок3", score: 100 },
    { id: 13, name: "Новичок4", score: 93 },
    { id: 14, name: "Новичок5", score: 80 },
    { id: 15, name: "Новичок6", score: 70 },
    { id: 16, name: "Новичок7", score: 70 },    
    { id: 17, name: "Новичок8", score: 60 },
    { id: 18, name: "Новичок9", score: 50 },
    { id: 19, name: "Новичок10", score: 50 },
    { id: 20, name: "Новичок11", score: 60 },
    { id: 21, name: "Новичок12", score: 65 },
    { id: 22, name: "Новичок13", score: 32 },
    { id: 23, name: "Лох1", score: 1 },
    { id: 24, name: "Лох2", score: 2 },
    { id: 25, name: "Лох3", score: 3 },
    { id: 26, name: "Лох4", score: 0 },
    { id: 27, name: "Лох", score: 3 },
    { id: 28, name: "Лох", score: 4 },
    { id: 29, name: "Лох", score: 5 },
    { id: 30, name: "Лох", score: 1 },
    { id: 31, name: "Лох", score: 0 }
]);

  const goToGame = () => {
    navigate('/game');
  };

  // Используем useMemo для оптимизации и стабильности
  const sortedLeaders = useMemo(() => 
    leaders.sort((a, b) => b.score - a.score), 
    [leaders]
  );

  const totalPages = useMemo(() => 
    Math.ceil(sortedLeaders.length / itemsPerPage), 
    [sortedLeaders, itemsPerPage]
  );

  // Получение лидеров для текущей страницы
  const getCurrentPageLeaders = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return sortedLeaders.slice(startIndex, startIndex + itemsPerPage);
  }, [sortedLeaders, currentPage, itemsPerPage]);

  const renderLeaderboardItem = (leader, index) => {
    const globalPlace = (currentPage - 1) * itemsPerPage + index + 1;

    let placeClass = 'default-place';
    let medalIcon = '';

    if (currentPage === 1) {
      switch(index) {
        case 0:
          placeClass = 'gold-place';
          medalIcon = '🥇';
          break;
        case 1:
          placeClass = 'silver-place';
          medalIcon = '🥈';
          break;
        case 2:
          placeClass = 'bronze-place';
          medalIcon = '🥉';
          break;
      }
    }

    return (
      <div 
        // Используем уникальный id вместо имени
        key={leader.id} 
        className={`leaderboard-item ${placeClass}`}
      >
        <div className="place-number">
          {globalPlace}
        </div>
        <div className="leader-name">
          {medalIcon} {leader.name}
        </div>
        <div className="leader-score">
          {leader.score} очков
        </div>
      </div>
    );
  };

  // Функции для навигации по страницам
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="container">
      <div className="scoreboard-container">
        
        <div className="scoreboard-header">
          <div><div className="h3-green">SNAKE</div>
          <div className='h1'>Таблица лидеров</div></div>
          <div className="d-block-l">
            <button 
            onClick={goToGame}
            className="buttonGreen"
          >
            К игре
          </button>
            </div>
        </div>
        <div className="leaderboard-header">
          <span>Место</span>
          <span>Игрок</span>
          <span>Результат</span>
        </div>

        <div className="h2">
          {getCurrentPageLeaders.map(renderLeaderboardItem)}
        </div>

        <div className="pagination">
          <button 
            onClick={prevPage} 
            disabled={currentPage === 1}
            className="buttonBlack"
          >
            {"<"}
          </button>
          <span className="page-info">
            {currentPage} из {totalPages}
          </span>
          <button 
            onClick={nextPage} 
            disabled={currentPage === totalPages}
            className="buttonBlack"
          >
            {">"}
          </button>
        </div>

        
      </div>
    </div>
  );
};

export default Scoreboard;
