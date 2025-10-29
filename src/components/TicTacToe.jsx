import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import confetti from "canvas-confetti";
import FiveTacFive from "./TicTacFive";
import SevenTacSeven from "./TicTacSeven";
import bgImage from "../assets/tictactoe-background.png";

export default function TicTacToe() {
  const [mode, setMode] = useState("3x3"); // "3x3" | "5x5" | "7x7"
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const { winner, line } = calculateWinner(board);

  useEffect(() => {
    if (winner) {
      const duration = 2000;
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
        if (Date.now() < end) requestAnimationFrame(frame);
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
    setBoard(Array(9).fill(null));
    setIsXNext(true);
  }

  const getCellCenter = (idx) => {
    const row = Math.floor(idx / 3);
    const col = idx % 3;
    return { x: col * 100 + 50, y: row * 100 + 50 };
  };

  const buttonStyle = {
    border: "none",
    borderRadius: "10px",
    padding: "10px 20px",
    fontSize: "16px",
    fontWeight: "bold",
    boxShadow: "2px 2px 8px rgba(0,0,0,0.3)",
    cursor: "pointer",
  };

  // ✅ Handle board mode switching
  if (mode === "5x5") {
    return (
      <div
        className="d-flex flex-column justify-content-center align-items-center min-vh-100 p-3"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Buttons visible in all modes */}
        <div className="mb-3 d-flex flex-wrap justify-content-center gap-2">
          <button
            style={{
              ...buttonStyle,
              background:
                mode === "3x3"
                  ? "linear-gradient(145deg, #ffcc70, #ffb347)"
                  : "linear-gradient(145deg, #d7a86e, #b07d41)",
              color: mode === "3x3" ? "#4b2e05" : "#fff",
            }}
            onClick={() => setMode("3x3")}
          >
            3×3
          </button>
          <button
            style={{
              ...buttonStyle,
              background:
                mode === "5x5"
                  ? "linear-gradient(145deg, #ffcc70, #ffb347)"
                  : "linear-gradient(145deg, #d7a86e, #b07d41)",
              color: mode === "5x5" ? "#4b2e05" : "#fff",
            }}
            onClick={() => setMode("5x5")}
          >
            5×5
          </button>
          <button
            style={{
              ...buttonStyle,
              background:
                mode === "7x7"
                  ? "linear-gradient(145deg, #ffcc70, #ffb347)"
                  : "linear-gradient(145deg, #d7a86e, #b07d41)",
              color: mode === "7x7" ? "#4b2e05" : "#fff",
            }}
            onClick={() => setMode("7x7")}
          >
            7×7
          </button>
        </div>

        <div className="w-100" style={{ maxWidth: "600px" }}>
          <FiveTacFive />
        </div>
      </div>
    );
  }

  if (mode === "7x7") {
    return (
      <div
        className="d-flex flex-column justify-content-center align-items-center min-vh-100 p-3"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Buttons visible in all modes */}
        <div className="mb-3 d-flex flex-wrap justify-content-center gap-2">
          <button
            style={{
              ...buttonStyle,
              background:
                mode === "3x3"
                  ? "linear-gradient(145deg, #ffcc70, #ffb347)"
                  : "linear-gradient(145deg, #d7a86e, #b07d41)",
              color: mode === "3x3" ? "#4b2e05" : "#fff",
            }}
            onClick={() => setMode("3x3")}
          >
            3×3
          </button>
          <button
            style={{
              ...buttonStyle,
              background:
                mode === "5x5"
                  ? "linear-gradient(145deg, #ffcc70, #ffb347)"
                  : "linear-gradient(145deg, #d7a86e, #b07d41)",
              color: mode === "5x5" ? "#4b2e05" : "#fff",
            }}
            onClick={() => setMode("5x5")}
          >
            5×5
          </button>
          <button
            style={{
              ...buttonStyle,
              background:
                mode === "7x7"
                  ? "linear-gradient(145deg, #ffcc70, #ffb347)"
                  : "linear-gradient(145deg, #d7a86e, #b07d41)",
              color: mode === "7x7" ? "#4b2e05" : "#fff",
            }}
            onClick={() => setMode("7x7")}
          >
            7×7
          </button>
        </div>

        <div className="w-100" style={{ maxWidth: "700px" }}>
          <SevenTacSeven />
        </div>
      </div>
    );
  }

  // ✅ 3×3 board (default)
  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center min-vh-100 p-3"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Buttons visible in all modes */}
      <div className="mb-3 d-flex flex-wrap justify-content-center gap-2">
        <button
          style={{
            ...buttonStyle,
            background:
              mode === "3x3"
                ? "linear-gradient(145deg, #ffcc70, #ffb347)"
                : "linear-gradient(145deg, #d7a86e, #b07d41)",
            color: mode === "3x3" ? "#4b2e05" : "#fff",
          }}
          onClick={() => setMode("3x3")}
        >
          3×3
        </button>
        <button
          style={{
            ...buttonStyle,
            background:
              mode === "5x5"
                ? "linear-gradient(145deg, #ffcc70, #ffb347)"
                : "linear-gradient(145deg, #d7a86e, #b07d41)",
            color: mode === "5x5" ? "#4b2e05" : "#fff",
          }}
          onClick={() => setMode("5x5")}
        >
          5×5
        </button>
        <button
          style={{
            ...buttonStyle,
            background:
              mode === "7x7"
                ? "linear-gradient(145deg, #ffcc70, #ffb347)"
                : "linear-gradient(145deg, #d7a86e, #b07d41)",
            color: mode === "7x7" ? "#4b2e05" : "#fff",
          }}
          onClick={() => setMode("7x7")}
        >
          7×7
        </button>
      </div>

      {/* 3x3 game board */}
      <div
        className="p-3 p-md-4 bg-white rounded shadow text-center"
        style={{
          background:
            "linear-gradient(145deg, #fff9a8, #ffeb3b, #ffc107, #ff9800)",
          maxWidth: "95vw",
        }}
      >
        <h1 className="mb-3 fs-3 fs-md-2">Tic Tac Toe (3×3)</h1>

        <div
          className="position-relative mx-auto"
          style={{
            width: "min(90vw, 320px)",
            height: "min(90vw, 320px)",
            userSelect: "none",
          }}
        >
          {winner && line && (
            <svg
              width="100%"
              height="100%"
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                pointerEvents: "none",
                zIndex: 2,
              }}
              viewBox="0 0 300 300"
            >
              {(() => {
                const start = getCellCenter(line[0]);
                const end = getCellCenter(line[2]);
                return (
                  <line
                    x1={start.x}
                    y1={start.y}
                    x2={end.x}
                    y2={end.y}
                    stroke="#f8f6f5ff"
                    strokeWidth="10"
                    strokeLinecap="round"
                  />
                );
              })()}
            </svg>
          )}

          <div
            className="d-grid gap-2"
            style={{
              gridTemplateColumns: "repeat(3, 1fr)",
              gridTemplateRows: "repeat(3, 1fr)",
              width: "100%",
              height: "100%",
            }}
          >
            {board.map((value, index) => (
              <button
                key={index}
                className="fw-bold"
                style={{
                  fontSize: "clamp(1.5rem, 4vw, 2.5rem)",
                  border: "2px solid #5c3a21",
                  background: value
                    ? "linear-gradient(145deg, #4b2e05, #6b3e12, #8b5a2b)"
                    : "linear-gradient(145deg, #deb887, #d2b48c, #cd853f, #8b5a2b)",
                  color: value ? "#fff" : "#3b2f2f",
                  borderRadius: "8px",
                  boxShadow:
                    "inset 0 0 8px rgba(0,0,0,0.3), 2px 2px 6px rgba(0,0,0,0.4)",
                }}
                onClick={() => handleClick(index)}
              >
                {value}
              </button>
            ))}
          </div>
        </div>

        <h5 className="mt-3">
          {winner
            ? `Winner: ${winner} 🎉`
            : board.every(Boolean)
            ? "Draw!"
            : `Next Player: ${isXNext ? "X" : "O"}`}
        </h5>

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
            boxShadow: "2px 2px 8px rgba(0,0,0,0.4)",
          }}
        >
          🔁 Restart
        </button>
      </div>
    </div>
  );
}

// ✅ Winner logic
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], line: [a, b, c] };
    }
  }
  return { winner: null, line: null };
}


// import React, { useState, useEffect } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
// import confetti from "canvas-confetti";
// import FiveTacFive from "./TicTacFive"; // ✅ Make sure this component exists
// import SevenTacSeven from "./TicTacSeven";
// import bgImage from "../assets/tictactoe-background.png";

// export default function TicTacToe() {
//   const [showFive, setShowFive] = useState(false);
//   const [showSeven, setShowSeven] = useState(false);
//   const [board, setBoard] = useState(Array(9).fill(null));
//   const [isXNext, setIsXNext] = useState(true);
//   const { winner, line } = calculateWinner(board);

//   useEffect(() => {
//     if (winner) {
//       const duration = 2000;
//       const end = Date.now() + duration;
//       (function frame() {
//         confetti({
//           particleCount: 5,
//           angle: 60,
//           spread: 55,
//           origin: { x: 0 },
//           colors: ["#ffb6c1", "#ff69b4", "#ff1493", "#c71585"],
//         });
//         confetti({
//           particleCount: 5,
//           angle: 120,
//           spread: 55,
//           origin: { x: 1 },
//           colors: ["#ffb6c1", "#ff69b4", "#ff1493", "#c71585"],
//         });
//         if (Date.now() < end) requestAnimationFrame(frame);
//       })();
//     }
//   }, [winner]);

//   function handleClick(index) {
//     if (board[index] || winner) return;
//     const newBoard = [...board];
//     newBoard[index] = isXNext ? "X" : "O";
//     setBoard(newBoard);
//     setIsXNext(!isXNext);
//   }

//   function resetGame() {
//     setBoard(Array(9).fill(null));
//     setIsXNext(true);
//   }

//   const getCellCenter = (idx) => {
//     const row = Math.floor(idx / 3);
//     const col = idx % 3;
//     return { x: col * 100 + 50, y: row * 100 + 50 };
//   };

//   // ✅ Show 5×5 board
//   if (showFive) {
//     return (
//       <div
//         className="d-flex flex-column justify-content-center align-items-center min-vh-100 p-3"
//         style={{
//           // background: "linear-gradient(145deg, #b2fefa, #1ff52a, #009245, #004d00)",
//           backgroundImage: `url(${bgImage})`,
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//         }}
//       >
//         <button
//           className="btn fw-bold mb-3"
//           style={{
//             background: "linear-gradient(145deg, #ffcc70, #ffb347)",
//             border: "none",
//             color: "#4b2e05",
//             borderRadius: "10px",
//             padding: "10px 20px",
//             boxShadow: "2px 2px 8px rgba(0,0,0,0.3)",
//           }}
//           onClick={() => setShowFive(false)}
//         >
//           🔙 Back to 3×3
//         </button>
//         <div className="w-100" style={{ maxWidth: "600px" }}>
//           <FiveTacFive />
//         </div>
//       </div>
//     );
//   }

//   // ✅ Show 3×3 board
//   return (
//     <div
//       className="d-flex flex-column justify-content-center align-items-center min-vh-100 p-3"
//       style={{
//         // background: "linear-gradient(145deg, #b2fefa, #1ff52a, #009245, #004d00)",
//          backgroundImage: `url(${bgImage})`,
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//       }}
//     >
//       {/* Mode Buttons */}
//       <div className="mb-3 d-flex flex-wrap justify-content-center gap-2">
//         <button
//           className="btn fw-bold"
//           style={{
//             background: "linear-gradient(145deg, #ffcc70, #ffb347)",
//             border: "none",
//             color: "#4b2e05",
//             borderRadius: "10px",
//             padding: "10px 20px",
//             boxShadow: "2px 2px 8px rgba(0,0,0,0.3)",
//             fontSize: "16px",
//           }}
//         >
//           3×3
//         </button>
//         <button
//           className="btn fw-bold"
//           style={{
//             background: "linear-gradient(145deg, #d7a86e, #b07d41)",
//             border: "none",
//             color: "#fff",
//             borderRadius: "10px",
//             padding: "10px 20px",
//             boxShadow: "2px 2px 8px rgba(0,0,0,0.3)",
//             fontSize: "16px",
//           }}
//           onClick={() => setShowFive(true)}
//         >
//           5×5
//         </button>
//         <button
//           className="btn fw-bold"
//           style={{
//             background: "linear-gradient(145deg, #d7a86e, #b07d41)",
//             border: "none",
//             color: "#fff",
//             borderRadius: "10px",
//             padding: "10px 20px",
//             boxShadow: "2px 2px 8px rgba(0,0,0,0.3)",
//             fontSize: "16px",
//           }}
//           onClick={() => setShowSeven(true)}
//         >
//           7×7
//         </button>
//       </div>

//       <div
//         className="p-3 p-md-4 bg-white rounded shadow text-center"
//         style={{
//           background: "linear-gradient(145deg, #fff9a8, #ffeb3b, #ffc107, #ff9800)",
//           maxWidth: "95vw",
//         }}
//       >
//         <h1 className="mb-3 fs-3 fs-md-2">Tic Tac Toe (3×3)</h1>

//         {/* Game board container */}
//         <div
//           className="position-relative mx-auto"
//           style={{
//             width: "min(90vw, 320px)",
//             height: "min(90vw, 320px)",
//             userSelect: "none",
//           }}
//         >
//           {/* Draw winning line */}
//           {winner && line && (
//             <svg
//               width="100%"
//               height="100%"
//               style={{
//                 position: "absolute",
//                 top: 0,
//                 left: 0,
//                 pointerEvents: "none",
//                 zIndex: 2,
//               }}
//               viewBox="0 0 300 300"
//             >
//               {(() => {
//                 const start = getCellCenter(line[0]);
//                 const end = getCellCenter(line[2]);
//                 return (
//                   <line
//                     x1={start.x}
//                     y1={start.y}
//                     x2={end.x}
//                     y2={end.y}
//                     stroke="#f8f6f5ff"
//                     strokeWidth="10"
//                     strokeLinecap="round"
//                   />
//                 );
//               })()}
//             </svg>
//           )}

//           {/* Grid */}
//           <div
//             className="d-grid gap-2"
//             style={{
//               gridTemplateColumns: "repeat(3, 1fr)",
//               gridTemplateRows: "repeat(3, 1fr)",
//               width: "100%",
//               height: "100%",
//             }}
//           >
//             {board.map((value, index) => (
//               <button
//                 key={index}
//                 className="fw-bold "
//                 style={{
//                   fontSize: "clamp(1.5rem, 4vw, 2.5rem)",
//                   border: "2px solid #5c3a21",
//                   background: value
//                     ? "linear-gradient(145deg, #4b2e05, #6b3e12, #8b5a2b)"
//                     : "linear-gradient(145deg, #deb887, #d2b48c, #cd853f, #8b5a2b)",
                   
//                   color: value ? "#fff" : "#3b2f2f",
//                   borderRadius: "8px",
//                    boxShadow:
//                     "inset 0 0 8px rgba(0,0,0,0.3), 2px 2px 6px rgba(0,0,0,0.4)",
//                 }}
//                 onClick={() => handleClick(index)}
//               >
//                 {value}
//               </button>
//             ))}
//           </div>
//         </div>

//         <h5 className="mt-3">
//           {winner
//             ? `Winner: ${winner} 🎉`
//             : board.every(Boolean)
//             ? "Draw!"
//             : `Next Player: ${isXNext ? "X" : "O"}`}
//         </h5>

//         <button
//           className="btn fw-bold mt-3"
//           onClick={resetGame}
//           style={{
//             background: "linear-gradient(145deg, #50c878, #2e8b57)",
//             color: "#fff",
//             border: "none",
//             borderRadius: "12px",
//             padding: "10px 30px",
//             fontSize: "18px",
//             boxShadow: "2px 2px 8px rgba(0,0,0,0.4)",
//           }}
//         >
//           🔁 Restart
//         </button>
//       </div>
//     </div>
//   );
// }

// // ✅ Winner logic
// function calculateWinner(squares) {
//   const lines = [
//     [0, 1, 2],
//     [3, 4, 5],
//     [6, 7, 8],
//     [0, 3, 6],
//     [1, 4, 7],
//     [2, 5, 8],
//     [0, 4, 8],
//     [2, 4, 6],
//   ];
//   for (let [a, b, c] of lines) {
//     if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
//       return { winner: squares[a], line: [a, b, c] };
//     }
//   }
//   return { winner: null, line: null };
// }

