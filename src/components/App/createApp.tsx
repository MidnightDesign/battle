import * as React from 'react';
import {Provider} from 'react-redux';
import Character from '../../model/Character';
import {spawn} from '../../redux/actions/Spawn';
import createStore from '../../redux/createStore';
import App from './App';

export default () => {
    const store = createStore();
    const hero: Character = {
        attackPower: 5,
        cooldownEnd: undefined,
        hp: 50,
        id: 'foo',
        maxHp: 100,
        name: 'Gyros',
        precision: 90,
    };
    store.dispatch(spawn(hero));
    const monster: Character = {
        attackPower: 2,
        cooldownEnd: undefined,
        hp: 100,
        id: 'bar',
        maxHp: 100,
        name: 'Murloc',
        precision: 90,
    };
    store.dispatch(spawn(monster));
    return (
        <Provider store={store}>
            <App/>
        </Provider>
    );
};
