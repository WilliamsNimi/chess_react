import { PlayerColor, SquareProps } from '../types'
import Piece from './Piece'
import { clickSquare, drop } from '../logic/handlers'
import '../App.css'

const Square = (props: SquareProps) => {
  const {
    id,
    onDragOver,
    pieceId,
    currentColor,
    setColor,
    currentBoard,
    setBoardState,
    movesHistory,
    setMoveHistory,
    capturedPieces,
    setCapturedPiece,
    kingSquare,
    setKingSquare,
    kingInCheck,
    setKingInCheck,
    checkMate,
    setCheckMate,
    staleMate,
    setStaleMate,
    validMoves,
    setValidMoves,
    occupiedSquares,
    setOccupiedSquares,
    fiftyMovesTracker,
    setFiftyMovesTracker,
    setOpenPromotionModal,
    setPromotionSquaresInfo,
    clickedSquare,
    setClickedSquare,
    movesNotation,
    setMovesNotation
  } = props

  const multiPlayerColor = sessionStorage.getItem('multiPlayerColor')
  const handleDrop = drop(
    currentColor,
    setColor,
    currentBoard,
    setBoardState,
    movesHistory,
    setMoveHistory,
    capturedPieces,
    setCapturedPiece,
    kingSquare,
    setKingSquare,
    kingInCheck,
    setKingInCheck,
    setCheckMate,
    setStaleMate,
    validMoves,
    setValidMoves,
    occupiedSquares,
    setOccupiedSquares,
    fiftyMovesTracker,
    setFiftyMovesTracker,
    setOpenPromotionModal,
    setPromotionSquaresInfo,
    multiPlayerColor as PlayerColor,
    setClickedSquare,
    movesNotation,
    setMovesNotation
  )
  const {
    srcSquare,
    destSquare
  } = movesHistory.length ? movesHistory[movesHistory.length - 1] : {srcSquare: 'null', destSquare: 'null'}
  const isLastMoveSrc = srcSquare === id
  const isLastMoveDest = destSquare === id
  const validMovesToCheck = kingInCheck?.color === currentColor ? kingInCheck.validCheckMoves?.[clickedSquare] : validMoves[clickedSquare]?.validSquares
  const isEligibleToMoveTo = validMovesToCheck?.includes(id)
  const hasBeenClicked = clickedSquare === id
  const kingUnderAttack = pieceId?.[1] === 'k' && (kingInCheck?.color === pieceId?.[0] || checkMate === (pieceId?.[0] === 'w' ? 'b' : 'w'))
  const numberLabelCheck = multiPlayerColor === 'b' ? '8' : '1'
  const alphabetLabelCheck = multiPlayerColor === 'b' ? 'h' : 'a'
  const handleClick = clickSquare(
    currentColor,
    pieceId,
    id,
    clickedSquare,
    setClickedSquare,
    multiPlayerColor as PlayerColor|null,
    setColor,
    currentBoard,
    setBoardState,
    movesHistory,
    setMoveHistory,
    capturedPieces,
    setCapturedPiece,
    kingSquare,
    setKingSquare,
    kingInCheck,
    setKingInCheck,
    setCheckMate,
    setStaleMate,
    validMoves,
    setValidMoves,
    occupiedSquares,
    setOccupiedSquares,
    fiftyMovesTracker,
    setFiftyMovesTracker,
    setOpenPromotionModal,
    setPromotionSquaresInfo,
    multiPlayerColor as PlayerColor,
    checkMate,
    staleMate,
    movesNotation,
    setMovesNotation
  )
  return (
    <th id={id} className={`${id} ${kingUnderAttack && hasBeenClicked ? "clickKingInCheck" : hasBeenClicked ? "clickedSquare" : ""} ${isLastMoveSrc ? "lastMoveMarker" : ""} ${isLastMoveDest ? "lastMoveMarker" : ""} ${kingUnderAttack ? "kingAttack" : ""}`} onDrop={handleDrop} onDragOver={onDragOver} onClick={handleClick}>
        {isEligibleToMoveTo ? (<div className='eligibilityCircle'></div>) : (null)}
        {id[1] === numberLabelCheck ? (<span className='alphabetLabel'>{id[0]}</span>) : (null)}
        {id[0] === alphabetLabelCheck ? (<span className='numberLabel'>{id[1]}</span>) : (null)}
        {pieceId ? (
          <Piece
            id={pieceId}
            currentColor={currentColor}
            squareId={id}
            checkMate={checkMate}
            staleMate={staleMate}
            setClickedSquare={setClickedSquare}
          />
        ) : (
          ''
        )}
    </th>
  )
}

export default Square
