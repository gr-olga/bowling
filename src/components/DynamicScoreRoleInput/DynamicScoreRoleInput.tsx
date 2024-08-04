import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {updateScore} from '../../store/gameState';
import {RootState} from '../../store';
import styles from './dynamicScoreInput.module.scss';

interface DynamicScoreRoleInputProps {
  playerId: number;
  onScoresUpdated: () => void;
  frameIndex: number;
}

export const DynamicScoreRoleInput: any = ({
                                             playerId,
                                             onScoresUpdated,
                                             frameIndex
                                           }: DynamicScoreRoleInputProps) => {
  const dispatch = useDispatch();
  const [firstRoll, setFirstRoll] = useState<null | number>(null);
  const [secondRoll, setSecondRoll] = useState<null | number>(null);
  const [maxPins, setMaxPins] = useState<number>(10);
  const gameCompleted = useSelector((state: RootState) => state.game.isGameCompleted);

  const isStrike = (pin: number): boolean => pin === 10;

  const handleRoll = (pin: number) => {
    if (isStrike(pin)) {
      setFirstRoll(pin);
      setSecondRoll(0);
      setMaxPins(0);
      return;
    }

    if (firstRoll === null) {
      setFirstRoll(pin);
      setMaxPins(10 - pin);
    } else if (secondRoll === null) {
      setSecondRoll(pin);
    }
  };

  const renderButtons = () => {
    let buttons = [];
    for (let pin: number = 0; pin <= maxPins; pin++) {
      buttons.push(
          <button key={pin} className={styles.knockdown_button} onClick={() => handleRoll(pin)}>
            {pin}
          </button>
      );
    }
    return <div className={styles.dynamic_score_role_input}>{buttons}</div>;
  };

  useEffect(() => {
    if (firstRoll !== null && secondRoll !== null) {
      dispatch(updateScore({firstRoll, secondRoll, playerId, frameIndex}));
      onScoresUpdated();
      setFirstRoll(null);
      setSecondRoll(null);
      setMaxPins(10);
    }
  }, [secondRoll, firstRoll, frameIndex]);


  return <div> {gameCompleted ? '' : renderButtons()}</div>;
};
