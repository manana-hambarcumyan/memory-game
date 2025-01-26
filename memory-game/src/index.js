import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from 'framer-motion';

const Game = () => {
  const [playerCount, setPlayerCount] = useState(6);
  const [words, setWords] = useState(["Apple", "Banana", "Cherry", "Dog", "Elephant", "Fox"]);
  const [hiddenWords, setHiddenWords] = useState([]);
  const [isGameOver, setIsGameOver] = useState(false);

  useEffect(() => {
    if (hiddenWords.length > 0 && hiddenWords.every((hidden) => !hidden)) {
      setIsGameOver(true);
    }
  }, [hiddenWords]);

  const startGame = () => {
    setHiddenWords(words.map(() => true));
    setIsGameOver(false);
  };

  const handleWordClick = (index) => {
    setHiddenWords((prevHiddenWords) => {
      const updated = [...prevHiddenWords];
      updated[index] = false;
      return updated;
    });
  };

  const hideWords = () => {
    setHiddenWords(words.map(() => true));
  };

  const resetGame = () => {
    setHiddenWords(words.map(() => true));
    setIsGameOver(false);
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Memory Game</h1>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Number of Players:</label>
        <select
          className="border rounded p-2"
          value={playerCount}
          onChange={(e) => setPlayerCount(parseInt(e.target.value))}
        >
          {[6, 9, 12].map((count) => (
            <option key={count} value={count}>
              {count} Players
            </option>
          ))}
        </select>
      </div>

      {!isGameOver && (
        <>
          <div className="grid grid-cols-3 gap-4 mb-4">
            {words.map((word, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.1 }}
                onClick={() => handleWordClick(index)}
                className="p-4 bg-blue-500 text-white text-center cursor-pointer rounded-lg"
              >
                {hiddenWords[index] ? "?" : word}
              </motion.div>
            ))}
          </div>

          <div className="flex justify-between">
            <Button onClick={hideWords} className="bg-red-500 hover:bg-red-600">
              Hide Words
            </Button>
          </div>
        </>
      )}

      {isGameOver && (
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Game Over!</h2>
          <Button onClick={resetGame} className="bg-green-500 hover:bg-green-600">
            Start Again
          </Button>
        </div>
      )}
    </div>
  );
};

export default Game;

