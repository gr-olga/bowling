import React from 'react';
import styles from './App.module.scss';
import {AddPlayer} from './components/AddPlayer/AddPlayer';
import {PlayersList} from './components/PlayersList/PlayersList';
import {GameBoard} from './components/GameBoard/GameBoard';
import {useDispatch, useSelector} from 'react-redux';
import {fullResetGame} from './store/gameState';
import {RootState} from './store';


function App() {
  const dispatch = useDispatch();
  const players = useSelector((state: RootState) => state.game.players);
  const [isGameStarted, setIsGameStarted] = React.useState(false);
  const handleResetGame = () => {
    dispatch(fullResetGame(players));
    setIsGameStarted(false);
  };

  return (
      <div className={styles.app}>
        <span> Bowling game demo </span>
        {isGameStarted ? '' :
            <div className={styles.setup_section}>
              <AddPlayer/>
              <PlayersList/>
              <button onClick={() => setIsGameStarted(true)}>Start</button>
            </div>
        }
        <button onClick={handleResetGame}>Restart all</button>
        {isGameStarted ?
            <div className={styles.game_board}><GameBoard/></div> : ''}
      </div>
  );
}

export default App;
