 import { WINNER_COMBOS } from "../Components/constant"
 export const checkWinnerfrom = (boardToCheck) => {  
    for (const combo of WINNER_COMBOS) {
      const [a, b, c] = combo
      //estoy verificando si esta todo en la misma ó
      if (
        boardToCheck[a] &&
        boardToCheck [a] === boardToCheck[b] &&
        boardToCheck [a] === boardToCheck[c]
      ) 
       {
        return boardToCheck[a]
      }
      return null
    }   
    }
    
export const checkEndGame = (newBoard) => {
    // revisamos si hay un empate
    // si no hay más espacios vacíos
    // en el tablero
    return newBoard.every((square) => square !== null)
  }