import {applyMiddleware, combineReducers, createStore, Reducer} from 'redux';
import logger from 'redux-logger';
import battleLogReducer from './reducers/battleLogReducer';
import charactersReducer from './reducers/charactersReducer';
import State from './state/State';

export default () => {
    const reducer: Reducer<State> = combineReducers({
        battleLog: battleLogReducer,
        characters: charactersReducer,
    });
    return createStore(reducer, applyMiddleware(logger));
};
