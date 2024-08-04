import {createSlice, PayloadAction, Slice} from '@reduxjs/toolkit';


export interface Player {
  id: number;
  name: string;
  frames: Array<Array<number>>;
}

export interface GameState {
  players: Array<Player>,
  isGameCompleted: boolean;
}


const initialState: GameState = {
  players: [
    {
      id: 1,
      name: 'Player 1',
      frames: Array(10).fill([0, 0])
    },
    {
      id: 2,
      name: 'Player 2',
      frames: Array(10).fill([0, 0])
    }
  ],
  isGameCompleted: false
};

const gameSlice: Slice<GameState> = createSlice({
  name: 'game',
  initialState,
  reducers: {
    getPlayer: (state: GameState, action: PayloadAction<string>) => {
      if (state.players.find(player => player.name === action.payload)) return alert('Player already exists');
      const newPlayer: Player = {
        id: state.players.length + 1,
        name: action.payload,
        frames: Array(10).fill([0, 0])
      };
      state.players = [...state.players, newPlayer];
    },
    removePlayer: (state: GameState, action: PayloadAction<number>): void => {
      state.players = state.players.filter(player => player.id !== action.payload);
    },
    updateScore: (
        state: GameState,
        action: PayloadAction<{ firstRoll: number, secondRoll: number, playerId: number, frameIndex: number; }>
    ): void => {
      const {playerId, frameIndex, firstRoll, secondRoll} = action.payload;
      const player = state.players.find(player => player.id === playerId);
      if (player) player.frames[frameIndex] = [firstRoll, secondRoll];
    },
    resetGame: (state: GameState): void => {
      state.players.forEach(player => {
        player.frames = Array(10).fill([0, 0]);
      });
    },
    fullResetGame: (state: GameState): void => {
      state.players = [];
      state.isGameCompleted = false;
    },
    setGameCompleted: (state: GameState, action: PayloadAction<boolean>): void => {
      state.isGameCompleted = action.payload;
    }
  }
});


export const {getPlayer, removePlayer, updateScore, resetGame, setGameCompleted, fullResetGame} = gameSlice.actions;
export default gameSlice.reducer;