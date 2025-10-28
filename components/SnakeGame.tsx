
import React, { useState, useEffect, useCallback, useRef } from 'react';

// --- Game Constants ---
const BOARD_SIZE = 20;
const INITIAL_SNAKE_POSITION = [{ x: 10, y: 10 }];
const INITIAL_FOOD_POSITION = { x: 15, y: 15 };
const GAME_SPEED_MS = 150;
const DIRECTIONS = {
  ArrowUp: { x: 0, y: -1 },
  ArrowDown: { x: 0, y: 1 },
  ArrowLeft: { x: -1, y: 0 },
  ArrowRight: { x: 1, y: 0 },
};

type Direction = keyof typeof DIRECTIONS;
type Position = { x: number; y: number };

// --- Helper Functions ---
const getRandomPosition = (snake: Position[] = []): Position => {
  let newPos: Position;
  do {
    newPos = {
      x: Math.floor(Math.random() * BOARD_SIZE),
      y: Math.floor(Math.random() * BOARD_SIZE),
    };
  } while (snake.some(segment => segment.x === newPos.x && segment.y === newPos.y));
  return newPos;
};

// --- Component ---
export const SnakeGame: React.FC<{ onRestart: () => void }> = ({ onRestart }) => {
  const [snake, setSnake] = useState<Position[]>(INITIAL_SNAKE_POSITION);
  const [food, setFood] = useState<Position>(INITIAL_FOOD_POSITION);
  const [direction, setDirection] = useState<Position>(DIRECTIONS.ArrowRight);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);

  const gameLoopRef = useRef<NodeJS.Timeout>();

  const resetGame = useCallback(() => {
    setSnake(INITIAL_SNAKE_POSITION);
    // FIX: Pass the initial snake position to getRandomPosition.
    // The function was called with 0 arguments, but it expects 1 to avoid placing food on the snake.
    setFood(getRandomPosition(INITIAL_SNAKE_POSITION));
    setDirection(DIRECTIONS.ArrowRight);
    setIsGameOver(false);
    setScore(0);
  }, []);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    const newDirection = DIRECTIONS[e.key as Direction];
    if (newDirection) {
      // Prevent snake from reversing on itself
      if (
        (newDirection.x !== 0 && newDirection.x === -direction.x) ||
        (newDirection.y !== 0 && newDirection.y === -direction.y)
      ) {
        return;
      }
      setDirection(newDirection);
    }
  }, [direction]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      if (gameLoopRef.current) clearInterval(gameLoopRef.current);
    };
  }, [handleKeyDown]);

  const gameTick = useCallback(() => {
    const newSnake = [...snake];
    const head = { ...newSnake[0] };

    head.x += direction.x;
    head.y += direction.y;

    // Wall collision
    if (head.x < 0 || head.x >= BOARD_SIZE || head.y < 0 || head.y >= BOARD_SIZE) {
      setIsGameOver(true);
      return;
    }

    // Self collision
    for (let i = 1; i < newSnake.length; i++) {
      if (head.x === newSnake[i].x && head.y === newSnake[i].y) {
        setIsGameOver(true);
        return;
      }
    }
    
    newSnake.unshift(head);

    // Food collision
    if (head.x === food.x && head.y === food.y) {
      setScore(s => s + 10);
      setFood(getRandomPosition(newSnake));
    } else {
      newSnake.pop();
    }

    setSnake(newSnake);
  }, [snake, direction, food]);


  useEffect(() => {
    if (!isGameOver) {
        gameLoopRef.current = setInterval(gameTick, GAME_SPEED_MS);
    } else if (gameLoopRef.current) {
        clearInterval(gameLoopRef.current);
    }
    return () => {
        if (gameLoopRef.current) clearInterval(gameLoopRef.current);
    };
}, [isGameOver, gameTick]);


  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-900 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:32px_32px] p-4">
      <div className="w-full max-w-2xl bg-gray-800/80 backdrop-blur-md rounded-2xl shadow-2xl border border-gray-700 flex flex-col items-center p-6">
        <header className="w-full flex justify-between items-center mb-4">
           <div>
              <h2 className="text-lg font-bold text-white">Highshift Arcade</h2>
              <p className="text-sm text-indigo-400">Score: {score}</p>
           </div>
           <button onClick={onRestart} className="text-sm text-gray-400 hover:text-white transition">Back to Services</button>
        </header>

        <div 
          className="relative bg-gray-900/50 border-2 border-gray-700 grid" 
          style={{ 
            gridTemplateColumns: `repeat(${BOARD_SIZE}, 1fr)`,
            gridTemplateRows: `repeat(${BOARD_SIZE}, 1fr)`,
            width: 'clamp(300px, 90vw, 500px)',
            height: 'clamp(300px, 90vw, 500px)'
          }}
        >
          {isGameOver && (
             <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center z-10">
                <h3 className="text-3xl font-bold text-red-500">Game Over</h3>
                <p className="text-white mt-2">Final Score: {score}</p>
                <button 
                  onClick={resetGame}
                  className="mt-6 bg-indigo-600 text-white font-semibold py-2 px-6 rounded-lg hover:bg-indigo-500 transition-colors"
                >
                  Play Again
                </button>
             </div>
          )}
          {snake.map((segment, index) => (
            <div
              key={index}
              className="bg-green-500"
              style={{ gridColumn: segment.x + 1, gridRow: segment.y + 1, opacity: 1 - (index * 0.02) }}
            />
          ))}
          <div
            className="bg-red-500 rounded-full"
            style={{ gridColumn: food.x + 1, gridRow: food.y + 1 }}
          />
        </div>
        <p className="text-gray-500 text-sm mt-4">Use arrow keys to move</p>
      </div>
    </div>
  );
};
