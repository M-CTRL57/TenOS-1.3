import { useState, useEffect, useCallback } from 'react';
import { Skull, Apple } from 'lucide-react';

const GRID_SIZE = 20;

export default function SnakeGameApp({ onClose }: { onClose: () => void }) {
  const [snake, setSnake] = useState([{ x: 10, y: 10 }]);
  const [food, setFood] = useState({ x: 15, y: 10 });
  const [direction, setDirection] = useState('RIGHT');
  const [isGameOver, setIsGameOver] = useState(false);
  const [score, setScore] = useState(0);

  const moveSnake = useCallback(() => {
    if (isGameOver) return;

    setSnake(prevSnake => {
      const head = { ...prevSnake[0] };

      switch (direction) {
        case 'UP': head.y -= 1; break;
        case 'DOWN': head.y += 1; break;
        case 'LEFT': head.x -= 1; break;
        case 'RIGHT': head.x += 1; break;
      }

      // Check collision with walls
      if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE) {
        setIsGameOver(true);
        return prevSnake;
      }

      // Check collision with self
      if (prevSnake.some(segment => segment.x === head.x && segment.y === head.y)) {
        setIsGameOver(true);
        return prevSnake;
      }

      const newSnake = [head, ...prevSnake];

      // Check if food eaten
      if (head.x === food.x && head.y === food.y) {
        setScore(s => s + 10);
        setFood({
          x: Math.floor(Math.random() * GRID_SIZE),
          y: Math.floor(Math.random() * GRID_SIZE)
        });
      } else {
        newSnake.pop(); // Remove tail if no food eaten
      }

      return newSnake;
    });
  }, [direction, isGameOver, food]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowUp': if (direction !== 'DOWN') setDirection('UP'); break;
        case 'ArrowDown': if (direction !== 'UP') setDirection('DOWN'); break;
        case 'ArrowLeft': if (direction !== 'RIGHT') setDirection('LEFT'); break;
        case 'ArrowRight': if (direction !== 'LEFT') setDirection('RIGHT'); break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [direction]);

  useEffect(() => {
    const gameLoop = setInterval(moveSnake, 150);
    return () => clearInterval(gameLoop);
  }, [moveSnake]);

  const restartGame = () => {
    setSnake([{ x: 10, y: 10 }]);
    setFood({ x: 15, y: 10 });
    setDirection('RIGHT');
    setIsGameOver(false);
    setScore(0);
  };

  return (
    <div className="flex flex-col h-full bg-slate-900 text-white font-mono p-4 items-center">
      <div className="flex justify-between w-full max-w-[400px] mb-4 items-center">
        <h2 className="text-xl font-bold text-green-400">YILAN OYUNU</h2>
        <div className="text-lg">Skor: {score}</div>
      </div>
      
      <div 
        className="bg-black border-2 border-green-500 relative"
        style={{ 
          width: 400, 
          height: 400, 
          display: 'grid', 
          gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
          gridTemplateRows: `repeat(${GRID_SIZE}, 1fr)`
        }}
      >
        {/* Render Snake */}
        {snake.map((segment, index) => (
          <div 
            key={`${segment.x}-${segment.y}-${index}`}
            style={{ 
              gridColumnStart: segment.x + 1, 
              gridRowStart: segment.y + 1,
              backgroundColor: index === 0 ? '#4ade80' : '#22c55e',
              border: '1px solid #000'
            }}
          />
        ))}

        {/* Render Food */}
        <div 
          style={{ 
            gridColumnStart: food.x + 1, 
            gridRowStart: food.y + 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Apple size={16} className="text-red-500" />
        </div>

        {/* Game Over Screen */}
        {isGameOver && (
          <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center">
            <Skull size={48} className="text-red-500 mb-4" />
            <h3 className="text-2xl text-red-500 font-bold mb-4">OYUN BİTTİ</h3>
            <button 
              onClick={restartGame}
              className="bg-green-600 hover:bg-green-500 text-white px-6 py-2 rounded font-bold"
            >
              TEKRAR OYNA
            </button>
          </div>
        )}
      </div>

      <div className="mt-4 text-xs text-gray-400">Yön tuşlarını kullanarak oynayın</div>
    </div>
  );
}
