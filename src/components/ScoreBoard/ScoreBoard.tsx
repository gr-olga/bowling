import {useSelector} from 'react-redux';
import {RootState} from '../../store';
import {Player} from '../../store/gameState';
import {TotalScore} from '../TotalScore/TotalScore';
import styles from './scoreBoard.module.scss';


export const ScoreBoard = () => {
  const players = useSelector((state: RootState) => state.game.players);

  return (
      <table className={styles.scoreboard_container}>
        <thead>
        <tr>
          <th>Player</th>
          {Array.from({length: 10}).map((_, index: number) => (
              <th key={index}>Frame {index + 1}</th>
          ))}
          <th>Score</th>
        </tr>
        </thead>
        <tbody>
        {players.map((player: Player) => {
          return (
              <tr key={player.id}>
                <td>{player.name}</td>
                {player.frames.map((frame: ReadonlyArray<number>, index: number) => (
                    <td key={`frame-${index}`}>
                      <span className={styles.pin}>{frame[0]}</span>
                      <span>{frame[1]}</span>
                    </td>
                ))}
                <td>
                  <TotalScore id={player.id}/>
                </td>
              </tr>
          );
        })}
        </tbody>
      </table>
  );
};

