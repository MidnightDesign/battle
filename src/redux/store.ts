import { applyMiddleware, combineReducers, createStore, Reducer, Store } from 'redux';
import logger from 'redux-logger';
import { AppAction } from './actions/actions';
import charactersReducer from './reducers/charactersReducer';
import AppState from './state/AppState';

export type AppStore = Store<AppState, AppAction>;

const reducer: Reducer<AppState> = combineReducers({
    characters: charactersReducer,
});
export const store: AppStore = createStore<AppState, AppAction, {}, {}>(reducer, applyMiddleware(logger));
