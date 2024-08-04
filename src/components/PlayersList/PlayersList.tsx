import {Player, removePlayer} from '../../store/gameState';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../store';
import styles from './playersList.module.scss';

export const PlayersList = () => {
  const dispatch = useDispatch();
  const players = useSelector((state: RootState) => state.game.players);

  const handleRemovePlayer = (id: number) => {
    dispatch(removePlayer(id));
  };
  const isPlayersEmpty = players.length === 0;

  return (
      <div className={styles.player_list}>
        {isPlayersEmpty ? <h2>Add players</h2> : players.map((player: Player) => {
              return (
                  <div key={player.id} className={styles.player}>
                    {player.name}
                    <button onClick={() => handleRemovePlayer(player.id)}>Remove</button>
                  </div>
              );
            }
        )}
      </div>
  );
};