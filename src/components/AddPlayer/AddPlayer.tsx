import {FormEvent, useState} from 'react';
import {useDispatch} from 'react-redux';
import {getPlayer} from '../../store/gameState';
import {AppDispatch} from '../../store';
import styles from './addPlayer.module.scss';

export const AddPlayer = () => {
  const [playerName, setPlayerName] = useState('');
  const dispatch: AppDispatch = useDispatch();

  const handleAddPlayer = (e: FormEvent) => {
    e.preventDefault();
    if (playerName !== '') {
      dispatch(getPlayer(playerName));
      setPlayerName('');
    }
  };

  return (
      <div className={styles.add_player_form}>
        <form onSubmit={handleAddPlayer}>
          <input
              type="text"
              value={playerName}
              onChange={e => setPlayerName(e.target.value)}
          />
          <button type="submit">Add player name</button>
        </form>
      </div>
  );
};