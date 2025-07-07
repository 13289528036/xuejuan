"use client";
import { useState, useEffect } from 'react';

const COLORS = ['red', 'blue', 'green', 'yellow', 'purple'];
const BOARD_SIZE = 8;

export default function GameBoard({ onScoreUpdate }) {
  const [board, setBoard] = useState([]);
  const [selectedTile, setSelectedTile] = useState(null);
  const [isSwapping, setIsSwapping] = useState(false);
  const [isChecking, setIsChecking] = useState(false);

  // 初始化游戏板
  useEffect(() => {
    initializeBoard();
  }, []);

  const initializeBoard = () => {
    const newBoard = [];
    for (let i = 0; i < BOARD_SIZE; i++) {
      const row = [];
      for (let j = 0; j < BOARD_SIZE; j++) {
        let color;
        do {
          color = COLORS[Math.floor(Math.random() * COLORS.length)];
        } while (
          (j >= 2 && row[j-1] === color && row[j-2] === color) ||
          (i >= 2 && newBoard[i-1][j] === color && newBoard[i-2][j] === color)
        );
        row.push(color);
      }
      newBoard.push(row);
    }
    setBoard(newBoard);
  };

  const handleTileClick = (row, col) => {
    if (isSwapping || isChecking) return;

    if (selectedTile) {
      // 检查是否相邻
      const isAdjacent = 
        (Math.abs(selectedTile.row - row) === 1 && selectedTile.col === col) ||
        (Math.abs(selectedTile.col - col) === 1 && selectedTile.row === row);

      if (isAdjacent) {
        swapTiles(selectedTile.row, selectedTile.col, row, col);
      }
      setSelectedTile(null);
    } else {
      setSelectedTile({ row, col });
    }
  };

  const swapTiles = async (row1, col1, row2, col2) => {
    setIsSwapping(true);
    
    const newBoard = [...board];
    const temp = newBoard[row1][col1];
    newBoard[row1][col1] = newBoard[row2][col2];
    newBoard[row2][col2] = temp;
    setBoard(newBoard);
    
    // 等待动画完成
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // 检查是否有匹配
    const matches = findMatches(newBoard);
    
    if (matches.length === 0) {
      // 如果没有匹配，交换回来
      const revertBoard = [...newBoard];
      revertBoard[row1][col1] = newBoard[row2][col2];
      revertBoard[row2][col2] = newBoard[row1][col1];
      setBoard(revertBoard);
      setIsSwapping(false);
    } else {
      // 有匹配，处理匹配
      processMatches(matches);
    }
  };

  const findMatches = (currentBoard) => {
    const matches = [];
    
    // 检查水平匹配
    for (let i = 0; i < BOARD_SIZE; i++) {
      for (let j = 0; j < BOARD_SIZE - 2; j++) {
        if (
          currentBoard[i][j] !== null &&
          currentBoard[i][j] === currentBoard[i][j+1] &&
          currentBoard[i][j] === currentBoard[i][j+2]
        ) {
          let matchLength = 3;
          while (j + matchLength < BOARD_SIZE && currentBoard[i][j] === currentBoard[i][j+matchLength]) {
            matchLength++;
          }
          
          for (let k = 0; k < matchLength; k++) {
            matches.push({ row: i, col: j + k });
          }
          
          j += matchLength - 1;
        }
      }
    }
    
    // 检查垂直匹配
    for (let j = 0; j < BOARD_SIZE; j++) {
      for (let i = 0; i < BOARD_SIZE - 2; i++) {
        if (
          currentBoard[i][j] !== null &&
          currentBoard[i][j] === currentBoard[i+1][j] &&
          currentBoard[i][j] === currentBoard[i+2][j]
        ) {
          let matchLength = 3;
          while (i + matchLength < BOARD_SIZE && currentBoard[i][j] === currentBoard[i+matchLength][j]) {
            matchLength++;
          }
          
          for (let k = 0; k < matchLength; k++) {
            matches.push({ row: i + k, col: j });
          }
          
          i += matchLength - 1;
        }
      }
    }
    
    return matches;
  };

  const processMatches = async (matches) => {
    setIsChecking(true);
    
    // 更新分数
    const points = matches.length * 10;
    onScoreUpdate(points);
    
    // 移除匹配的瓷砖
    const newBoard = [...board];
    matches.forEach(({ row, col }) => {
      newBoard[row][col] = null;
    });
    setBoard(newBoard);
    
    // 等待动画完成
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // 下落瓷砖
    const boardAfterFalling = dropTiles(newBoard);
    setBoard(boardAfterFalling);
    
    // 等待动画完成
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // 填充新瓷砖
    const filledBoard = fillBoard(boardAfterFalling);
    setBoard(filledBoard);
    
    // 等待动画完成
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // 检查是否有新的匹配
    const newMatches = findMatches(filledBoard);
    
    if (newMatches.length > 0) {
      // 如果有新的匹配，继续处理
      processMatches(newMatches);
    } else {
      setIsSwapping(false);
      setIsChecking(false);
    }
  };

  const dropTiles = (currentBoard) => {
    const newBoard = JSON.parse(JSON.stringify(currentBoard));
    
    for (let col = 0; col < BOARD_SIZE; col++) {
      let emptyRow = BOARD_SIZE - 1;
      
      while (emptyRow >= 0) {
        if (newBoard[emptyRow][col] === null) {
          // 找到一个空位置
          let sourceRow = emptyRow - 1;
          
          // 寻找上方最近的非空瓷砖
          while (sourceRow >= 0 && newBoard[sourceRow][col] === null) {
            sourceRow--;
          }
          
          if (sourceRow >= 0) {
            // 找到了非空瓷砖，下落
            newBoard[emptyRow][col] = newBoard[sourceRow][col];
            newBoard[sourceRow][col] = null;
          }
        }
        emptyRow--;
      }
    }
    
    return newBoard;
  };

  const fillBoard = (currentBoard) => {
    const newBoard = JSON.parse(JSON.stringify(currentBoard));
    
    for (let i = 0; i < BOARD_SIZE; i++) {
      for (let j = 0; j < BOARD_SIZE; j++) {
        if (newBoard[i][j] === null) {
          newBoard[i][j] = COLORS[Math.floor(Math.random() * COLORS.length)];
        }
      }
    }
    
    return newBoard;
  };

  const getTileColor = (color) => {
    switch (color) {
      case 'red': return 'bg-gradient-to-br from-red-400 to-red-600';
      case 'blue': return 'bg-gradient-to-br from-blue-400 to-blue-600';
      case 'green': return 'bg-gradient-to-br from-green-400 to-green-600';
      case 'yellow': return 'bg-gradient-to-br from-yellow-400 to-yellow-600';
      case 'purple': return 'bg-gradient-to-br from-purple-400 to-purple-600';
      default: return 'bg-gray-300';
    }
  };

  return (
    <div className="grid grid-cols-8 gap-1 mb-6">
      {board.map((row, rowIndex) => (
        row.map((tile, colIndex) => (
          <div
            key={`${rowIndex}-${colIndex}`}
            className={`
              w-10 h-10 rounded-lg cursor-pointer flex items-center justify-center
              ${getTileColor(tile)}
              ${selectedTile?.row === rowIndex && selectedTile?.col === colIndex ? 'ring-4 ring-white' : ''}
              shadow-lg hover:shadow-xl transition-all
            `}
            onClick={() => handleTileClick(rowIndex, colIndex)}
          >
            <div className="w-6 h-6 rounded-full bg-white/30" />
          </div>
        ))
      ))}
    </div>
  );
}