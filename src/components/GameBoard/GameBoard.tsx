import {ScoreBoard} from '../ScoreBoard/ScoreBoard';
import {DynamicScoreRoleInput} from '../DynamicScoreRoleInput/DynamicScoreRoleInput';
import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../store';
import {resetGame, setGameCompleted} from '../../store/gameState';
import styles from './gameBoard.module.scss';

export const GameBoard = () => {
  const dispatch = useDispatch();
  const players = useSelector((state: RootState) => state.game.players);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState<number>(0);
  const [currentFrameIndex, setCurrentFrameIndex] = useState<number>(0);
  const gameCompleted = useSelector((state: RootState) => state.game.isGameCompleted);

  const handleScoresUpdated = () => {
    if (currentPlayerIndex < players.length - 1) {
      setCurrentPlayerIndex(currentPlayerIndex + 1);
    } else {
      setCurrentPlayerIndex(0);
      if (currentFrameIndex < 9) {
        setCurrentFrameIndex(currentFrameIndex + 1);
      }
      if (currentFrameIndex === 9) {
        dispatch(setGameCompleted(true));
      }
    }
  };
  const isPlayersEmpty: boolean = players.length === 0;

  const handleResetGame = () => {
    dispatch(resetGame(players[currentPlayerIndex].id));
    setCurrentFrameIndex(0);
    setCurrentFrameIndex(0);
    dispatch(setGameCompleted(false));
  };

  return (
      <div className={styles.board_container}>
        <h1>Bowling Scoreboard</h1>
        {isPlayersEmpty ? '' :
            <div className={styles.scoreboard_section}>
              <ScoreBoard/>
              {gameCompleted ?
                  <>
                    <h2 className={styles.game_over}>Game over</h2>
                    <button className={styles.scoreboard_section_btn} onClick={handleResetGame}>Do you want play
                      again?
                    </button>
                  </>
                  :
                  <>
                    <div className={styles.bord_info}>
                      <h3> Current Player: </h3> <span>{players[currentPlayerIndex].name}</span>
                    </div>
                    <div className={styles.pin_section}>
                      <span>Knock down: </span>
                      <DynamicScoreRoleInput
                          playerId={players[currentPlayerIndex].id}
                          frameIndex={currentFrameIndex}
                          onScoresUpdated={handleScoresUpdated}
                      />
                      <span>pins</span>
                    </div>
                  </>
              }
            </div>
        }
      </div>
  );
};