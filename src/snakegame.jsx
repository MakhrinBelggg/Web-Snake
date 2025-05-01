import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom'

//CSS
import '../src/styles/font.css';
//import '../src/styles/buttonRGB.css';
import '../src/styles/buttons.css';
import '../src/styles/colors.css';
import '../src/styles/text.css';

//Data
import '../src/userdata.json';


// Константы игры
const GRID_SIZE = 20;
const CELL_SIZE = 30;
const INITIAL_SPEED = 200;

function SnakeGame() {
// Состояния игры
const [snake, setSnake] = useState([{ x: 10, y: 10 }]);
const [apple, setApple] = useState({ x: 15, y: 15 });
const [direction, setDirection] = useState('RIGHT');
const [speed, setSpeed] = useState(INITIAL_SPEED);
const [score, setScore] = useState(0);
const [bestScore, setBestScore] = useState(0);
const [isGameOver, setIsGameOver] = useState(false);
const [isGameStarted, setIsGameStarted] = useState(false);
const [gameMode, setGameMode] = useState(false);
const [isButtonActive, setIsButtonActive] = useState(false);
const [isRecord, setIsRecord] = useState(false);

const handleGameModeToggle = () => {
    setGameMode(!gameMode);
    setIsButtonActive(!isButtonActive);
};

const navigate = useNavigate()
const goToScoreboard = () => {
    navigate('/scoreboard')
  }
const goToAuth = () => {
  navigate('/')
}

// Генерация яблока
const generateApple = useCallback(() => {
  
  let newApple;
  let isOnSnake, isOnPreviousApple;


  do {
    newApple = {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE),
      color: score % 5 === 0 && score !== 0
        ? APPLE_COLORS[Math.floor(score / 5)] || '#FF6565'
        : '#FF6565',
    };

    isOnSnake = snake.some(
      (segment) => segment.x === newApple.x && segment.y === newApple.y 
      && head.x === newApple.x && head.y === newApple.y 
    );
    isOnPreviousApple = apple && (apple.x === newApple.x && apple.y === newApple.y);
  } while (isOnSnake || isOnPreviousApple);
  console.log('new apple position:', newApple);
  console.log('apple position:', apple);
  return isOnSnake ? generateApple() : newApple;
}, [snake, apple]);

// Начало игры
const startGame = () => {
  setSnake([{ x: 10, y: 10 }]);
  setApple(generateApple());
  setDirection('RIGHT');
  setScore(0);
  setSpeed(INITIAL_SPEED);
  setIsGameOver(false);
  console.log('\nGame started\n');
  setIsGameStarted(true);
  setIsRecord(false);
};

// Обработка движения змейки
useEffect(() => {
  if (!isGameStarted || isGameOver) return;

  const moveSnake = () => {
    setSnake(prevSnake => {
      const newSnake = [...prevSnake];
      console.log('snake moves');
      const head = { ...newSnake[0] };

      // Движение головы в зависимости от направления
      switch (direction) {
        case 'UP': head.y -= 1; break;
        case 'DOWN': head.y += 1; break;
        case 'LEFT': head.x -= 1; break;
        case 'RIGHT': head.x += 1; break;
      }

      // Либо с границами, либо без границ
      if(gameMode){
        head.x = (head.x + GRID_SIZE) % GRID_SIZE;
        head.y = (head.y + GRID_SIZE) % GRID_SIZE;
      }
      else {
        if(head.x > GRID_SIZE-1) {
            head.x -= 1;
            setIsGameOver(true);
            setIsGameStarted(false);
          }
          if(head.y > GRID_SIZE-1) {
            head.y -= 1;
            setIsGameOver(true);
            setIsGameStarted(false);
          }
          if(head.x < 0) {
            head.x += 1;
            setIsGameOver(true);
            setIsGameStarted(false);
          }
          if(head.y < 0) {
            head.y += 1;
            setIsGameOver(true);
            setIsGameStarted(false);
          }
      }


      // Проверка столкновения с собой
      if (newSnake.some(segment => 
        segment.x === head.x && segment.y === head.y
      )) {
        setIsGameOver(true);
        setIsGameStarted(false);
        console.log('\nGame over\n');
        if (score > bestScore) {
          setBestScore(score);
          setIsRecord(true);
        }
        return prevSnake;
      }

      // Съедание яблока
      if (head.x === apple.x && head.y === apple.y) {
        console.log('Apple eaten at:', { x: head.x, y: head.y });
        console.log('Current apple position:', apple);
        setApple(generateApple());
        newSnake.unshift(head);
        console.log('Current snake:', snake);
        console.log('Current score:', score);
        if (apple !== head){
          setScore(prev => prev + 0.5);
        }
        
        console.log('Current score+1:', score);
        setSpeed(prev => Math.max(50, prev - 1)); // Ускорение
        
      } else {
        newSnake.unshift(head);
        newSnake.pop();
      }

      return newSnake;
    });
  };

  const gameInterval = setInterval(moveSnake, speed);
  return () => clearInterval(gameInterval);
}, [direction, isGameStarted, isGameOver, speed, apple, score, gameMode]);

// Обработка нажатий клавиш
useEffect(() => {
  const handleKeyDown = (e) => {
    switch (e.key) {
      case 'ArrowUp': 
        if (direction !== 'DOWN') setDirection('UP'); 
        break;
      case 'ArrowDown': 
        if (direction !== 'UP') setDirection('DOWN'); 
        break;
      case 'ArrowLeft': 
        if (direction !== 'RIGHT') setDirection('LEFT'); 
        break;
      case 'ArrowRight': 
        if (direction !== 'LEFT') setDirection('RIGHT'); 
        break;
    }
  };

  window.addEventListener('keydown', handleKeyDown);
  return () => window.removeEventListener('keydown', handleKeyDown);
}, [direction]);


const APPLE_COLORS = [
    '#FF6565', 
    'orange',   
    'lime',   
  ];
// Стили вынесены отдельно для читаемости
const styles = {
  container: { 
    display: 'flex', 
    flexDirection: 'column', 
    alignItems: 'center', 
    backgroundColor: '#141414', 
    height: '100vh',
    width: '100vw',
    padding: '20px',
    scrollbars: 'false',
    overflow: 'hidden',
    position: 'fixed',
    top: '0',
    left: '0',
  },

  gameBoard: { 
    display: 'grid', 
    gridTemplateColumns: `repeat(${GRID_SIZE}, ${CELL_SIZE}px)`, 
    gridTemplateRows: `repeat(${GRID_SIZE}, ${CELL_SIZE}px)`,
    border: isGameOver ? '4px solid #A040FF' : isButtonActive ?  'transparent' : '4px solid #acff40',
    boxShadow: isGameOver ? '0 0 30px rgba(160, 64, 255, 0.50)' : '0 0 60px rgba(172, 255, 64, 0.16)',
    //backgroundColor: '#f0f0d0',
    backgroundColor: '#22271b', 
    position: 'relative',
    borderRadius: '2%'
  },
  cell: {
    border: '1px solid rgba(233, 233, 233, 0.05)',
    boxSizing: 'border-box',
    borderRadius: '10%'
  },
  apple: {
    position: 'absolute',
    width: `${CELL_SIZE}px`,
    height: `${CELL_SIZE}px`,
    backgroundColor: '#FF6565',
    borderRadius: '30%',
  },
  snakeSegment: (index) => ({
    width: `${CELL_SIZE}px`,
    height: `${CELL_SIZE}px`,
    backgroundColor: index === 0 ? 'rgb(67, 160, 17)' :'rgb(115, 193, 51)',
    borderRadius: '17%',
    boxSizing: 'border-box'
  }),
  
};

return (
  <div style={styles.container}>

    <div className="scoreBoard">
      <h2 className="h2-green">username</h2>
      <button className="button" onClick={goToScoreboard}>Scoreboard</button>
      <button className="button" onClick={goToAuth}
      >Logout</button>
    </div>

    <div className="scoreBoard">
        <h2 className="h2">Score: {score}</h2>
        <h2 className="h2">Best Score: {bestScore}</h2>
    </div>

    <div style={styles.gameBoard}>
      {/* Сетка игрового поля */}
      {[...Array(GRID_SIZE)].map((_, rowIndex) => 
        [...Array(GRID_SIZE)].map((_, colIndex) => (
          <div 
            key={`${rowIndex}-${colIndex}`} 
            style={{
              ...styles.cell,
              width: `${CELL_SIZE}px`,
              height: `${CELL_SIZE}px`
            }} 
          />
          
        ))
      )}

      {/* Яблоко */}
      <div 
        style={{
          ...styles.apple,
          left: `${apple.x * CELL_SIZE}px`,
          top: `${apple.y * CELL_SIZE}px`,
          backgroundColor: apple.color 
        }} 
      />
      

      {/* Змейка */}
      {snake.map((segment, index) => (
        <div
          key={`${segment.x}-${segment.y}`}
          style={{
            ...styles.snakeSegment(index),
            position: 'absolute',
            left: `${segment.x * CELL_SIZE}px`,
            top: `${segment.y * CELL_SIZE}px`
          }}
        >
          {/* Глаза для головы */}
          {index === 0 && (
            <>
              <div 
                style={{
                  position: 'absolute', 
                  width: '6px', 
                  height: '6px', 
                  backgroundColor: 'white', 
                  borderRadius: '50%', 
                  top: '5px', 
                  left: '5px' 
                }} 
              />
              <div 
                style={{
                  position: 'absolute', 
                  width: '6px', 
                  height: '6px', 
                  backgroundColor: 'white', 
                  borderRadius: '50%', 
                  top: '5px', 
                  right: '5px' 
                }} 
              />
            </>
          )}
        </div>
      ))}
    </div>


    <div style={{display: 'flex',
        justifyContent: 'center',
        gap: '20px',
        alignItems: 'center'}}>
     {!isGameStarted && (
    <>
      <button 
        onClick={startGame}
        className="buttonGreen"
        style={{marginTop: '20px'}}
      >
        {isGameOver ? 'Начать заново' : 'Начать игру'}
      </button>

      <button 
        className="button"
        onClick={handleGameModeToggle}
        style={{marginTop: '20px'}}
      >
        {isButtonActive ? "Без границ" : "Границы"}
      </button>
     </>
     )}
    </div>
  

     
    {isGameOver && (
      <div className="gameOverText">
        Игра окончена!        
      </div>
    )}
    
    {isRecord && (
      <h2 className="gameOverText" style={{marginTop: '380px'}}>
        Новый рекорд!        
      </h2>
    )}


    
  </div>
);
};

export default SnakeGame;