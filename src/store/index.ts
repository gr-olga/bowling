import {configureStore, EnhancedStore} from '@reduxjs/toolkit';
import gameReducer from './gameState';


const store: EnhancedStore = configureStore({
  reducer: {
    game: gameReducer
  }
});

 export type AppDispatch = typeof store.dispatch;
 export type RootState = ReturnType<typeof store.getState>;

export default store;