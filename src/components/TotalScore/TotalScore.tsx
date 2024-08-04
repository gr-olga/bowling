import {useSelector} from 'react-redux';
import {RootState} from '../../store';
import {Player} from '../../store/gameState';

interface TotalScoreProps {
  id: number;
}

export const TotalScore = ({id}: TotalScoreProps) => {
  const isStrike = (frame: ReadonlyArray<number>): boolean => frame[0] === 10;
  const isSpare = (frame: ReadonlyArray<number>): boolean => frame[0] + frame[1] === 10;

  const players = useSelector((state: RootState) => state.game.players);

  const player: Player | undefined = players.find((player: Player): boolean => player.id === id);
  if (!player) throw new Error('Player not found');

  const getTotalScore = (player: Player): number => {
    let totalScore: number = 0;
    player.frames.forEach((frame: ReadonlyArray<number>, index: number): void => {
      totalScore += frame[0] + frame[1];
      if (index === 9) return;
      if (isStrike(frame)) {
        const nextFrameScore: number = player.frames[index + 1][0] + player.frames[index + 1][1];
        totalScore += nextFrameScore;
      } else if (isSpare(frame)) {
        const nextFrameFirstStrikeScore: number = player.frames[index + 1][0];
        totalScore += nextFrameFirstStrikeScore;
      }
    });

    return totalScore;
  };

  return (
      <div>
        <h2>{getTotalScore(player)}</h2>
      </div>
  );
};