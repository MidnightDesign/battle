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
                ? `${attackerName} attacked ${targetName} and did ${action.damage} damage`
                : `${attackerName} attacked ${targetName} and missed`;
            return add(text);
    }
    return log;
};

export default battleLogReducer;
