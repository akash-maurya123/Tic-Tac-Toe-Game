import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import confetti from "canvas-confetti";

export default function TicTacToe() {
  const [board, setBoard] = useState(Array(25).fill(null)); // 5x5 grid
  const [isXNext, setIsXNext] = useState(true);
  const { winner, line } = calculateWinner(board);

  useEffect(() => {
    if (winner) {
      const duration = 2 * 1000;
      const end = Date.now() + duration;
      (function frame() {
        confetti({
          particleCount: 5,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ["#ffb6c1", "#ff69b4", "#ff1493", "#c71585"],
        });
        confetti({
          particleCount: 5,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ["#ffb6c1", "#ff69b4", "#ff1493", "#c71585"],
        });
        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      })();
    }
  }, [winner]);

  function handleClick(index) {
    if (board[index] || winner) return;
    const newBoard = [...board];
    newBoard[index] = isXNext ? "X" : "O";
    setBoard(newBoard);
    setIsXNext(!isXNext);
  }

  function resetGame() {
    setBoard(Array(25).fill(null));
    setIsXNext(true);
  }

  const getCellCenter = (idx) => {
    const row = Math.floor(idx / 5);
    const col = idx % 5;
    return { x: col * 60 + 30, y: row * 60 + 30 }; // updated for 60px cells
  };

  return (
    <div className="d-flex flex-column justify-content-center align-items-center  px-2" 
    >
      <div
        className="p-4 bg-white rounded shadow text-center"
        style={{
          background: "linear-gradient(145deg, #fff9a8, #ffeb3b, #ffc107, #ff9800)",
          
          maxWidth: "95vw",
        }}
      >
        <h1 className="mb-3 fs-3 fs-md-2">Tic Tac Toe (5×5)</h1>

        <div
          className="position-relative"
          style={{
            width: "310px",
            height: "310px",
            margin: "0 auto",
            userSelect: "none",
          }}
        >
          {/* Draw winning line */}
          {winner && line && (
            <svg
              width="300"
              height="300"
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                pointerEvents: "none",
                zIndex: 2,
              }}
            >
              {(() => {
                const start = getCellCenter(line[0]);
                const end = getCellCenter(line[line.length - 1]);
                return (
                  <line
                    x1={start.x}
                    y1={start.y}
                    x2={end.x}
                    y2={end.y}
                    stroke="#ffffff"
                    strokeWidth="8"
                    strokeLinecap="round"
                  />
                );
              })()}
            </svg>
          )}

          {/* Board */}
          <div
            className="d-grid gap-1"
            style={{
              gridTemplateColumns: "repeat(5, 60px)",
              gridTemplateRows: "repeat(5, 60px)",
              width: "300px",
              height: "300px",
              position: "relative",
              zIndex: 1,
            }}
          >
            {board.map((value, index) => (
              <button
                key={index}
                className="btn fw-bold"
                style={{
                  width: "60px",
                  height: "60px",
                  fontSize: "22px",
                  background: value
                    ? "linear-gradient(145deg, #4b2e05, #6b3e12, #8b5a2b)"
                    : "linear-gradient(145deg, #deb887, #d2b48c, #cd853f, #8b5a2b)",
                  border: "2px solid #5c3a21",
                  color: value ? "#fff" : "#3b2f2f",
                  boxShadow:
                    "inset 0 0 8px rgba(0,0,0,0.3), 2px 2px 6px rgba(0,0,0,0.4)",
                  fontFamily: "Georgia, serif",
                  borderRadius: "6px",
                  cursor: "pointer",
                }}
                onClick={() => handleClick(index)}
              >
                {value}
              </button>
            ))}
          </div>
        </div>

        <h4 className="mt-4">
          {winner
            ? `Winner: ${winner} 🎉`
            : board.every(Boolean)
            ? "Draw!"
            : `Next Player: ${isXNext ? "X" : "O"}`}
        </h4>

        <button
          className="btn fw-bold mt-3"
          onClick={resetGame}
          style={{
            background: "linear-gradient(145deg, #50c878, #2e8b57)",
            color: "#fff",
            border: "none",
            borderRadius: "12px",
            padding: "10px 30px",
            fontSize: "18px",
            letterSpacing: "0.5px",
            boxShadow: "2px 2px 8px rgba(0,0,0,0.4)",
            transition: "all 0.3s ease-in-out",
          }}
          onMouseOver={(e) =>
            (e.target.style.background = "linear-gradient(145deg, #66d98f, #3cb371)")
          }
          onMouseOut={(e) =>
            (e.target.style.background = "linear-gradient(145deg, #50c878, #2e8b57)")
          }
        >
          🔁 Restart
        </button>
      </div>
    </div>
  );
}

// ✅ Calculate winner for 5x5 (4 in a row wins)
function calculateWinner(squares) {
  const size = 5;
  const needed = 4;

  const checkLine = (indices) => {
    const vals = indices.map((i) => squares[i]);
    if (vals.every((v) => v && v === vals[0])) return vals[0];
    return null;
  };

  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      if (c + needed <= size) {
        const rowLine = Array.from({ length: needed }, (_, i) => r * size + c + i);
        const rowWin = checkLine(rowLine);
        if (rowWin) return { winner: rowWin, line: rowLine };
      }
      if (r + needed <= size) {
        const colLine = Array.from({ length: needed }, (_, i) => (r + i) * size + c);
        const colWin = checkLine(colLine);
        if (colWin) return { winner: colWin, line: colLine };
      }
      if (r + needed <= size && c + needed <= size) {
        const diagLine = Array.from({ length: needed }, (_, i) => (r + i) * size + (c + i));
        const diagWin = checkLine(diagLine);
        if (diagWin) return { winner: diagWin, line: diagLine };
      }
      if (r + needed <= size && c - needed + 1 >= 0) {
        const antiDiagLine = Array.from({ length: needed }, (_, i) => (r + i) * size + (c - i));
        const antiWin = checkLine(antiDiagLine);
        if (antiWin) return { winner: antiWin, line: antiDiagLine };
      }
    }
  }

  return { winner: null, line: null };
}
