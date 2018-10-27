import {Reducer} from 'redux';
import BattleLogEntry from '../../model/BattleLogEntry';
import Attack from '../actions/Attack';
import State from '../state/State';

type Action =
    Attack;

const addEntry = (log: BattleLogEntry[], text: string) => [...log, {timestamp: new Date(), text}];

const battleLogReducer: Reducer<State['battleLog'], Action> = (log = [], action) => {
    const add = (text: string) => addEntry(log, text);
    switch (action.type) {
        case 'ATTACK':
            const attackerName = action.attacker.name;
            const targetName = action.target.name;
            const text = action.hit
                ? `${attackerName} attacks ${targetName} and does ${action.damage} damage`
                : `${attackerName} attacks ${targetName} and misses`;
            let state = add(text);
            if (action.hit && action.damage > action.target.hp) {
                state = addEntry(state, `${targetName} dies`);
            }
            return state;
    }
    return log;
};

export default battleLogReducer;
