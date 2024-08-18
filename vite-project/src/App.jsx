import { useState } from "react"
import confetti from "canvas-confetti"
import { Square } from "./Components/Square.jsx"
import { WINNER_COMBOS, TURNS } from "./Components/constant.js" // las constantes de los turnos y winner
import { checkWinnerfrom, checkEndGame} from "./logic/board.js"
import { WinnerModal } from "./Components/WinnerModal.jsx"
import { saveGameToStorage, resetGameStorage } from "./storage/index.js"





function App() {
  const [board, setBoard] = useState(() => {
    const boardFromStorage = window.localStorage.getItem('board')
    if (boardFromStorage) return JSON.parse(boardFromStorage)
    return Array(9).fill(null)
  })

  

  const [turn, setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem('turn')
    return turnFromStorage ?? TURNS.X
  })

  const [winner, setWinner] = useState(null) //no hay ganador
  
  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)

    resetGameStorage()
  }

  const updateBoard = (index) => {
    //no actualizar si ya tiene algo
    if (board[index] || winner) return
     //actualizarel tablero
    const newBoard = [...board]
    newBoard[index] = turn //x u o 
    setBoard(newBoard)
    //cambiarel turno
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)
    //revisar si hay un ganador
    const newWinner= checkWinnerfrom(newBoard)
    if(newWinner){
      confetti()
      setWinner(newWinner)
    }else if (checkEndgame(newBoard)){
      setWinner(false)// Empate
    }
  }


  return (
   <main className="board">
     <h1>CARA O CRUZ</h1>
     <button onClick={resetGame}>Reset del juego</button>
     <section className="game">
      {
        board.map((square,index) =>{
          return(
            <Square
                key={index}
                index={index}
                updateBoard={updateBoard}
              >
              {square}
            </Square>
          )
        })
      }
     </section>
     <section className="turn">
      <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
      <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
     </section>
     <WinnerModal resetGame={resetGame} winner={winner}/>
   </main>



  )
}

export default App
