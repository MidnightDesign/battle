import Character from '../model/Character';
import { store } from '../redux/store';

export const heal = (healer: Character, target: Character) => {
    store.dispatch({
        character: healer,
        type: 'START_COOLDOWN',
    });
    store.dispatch({
        character: target,
        hp: 100,
        type: 'HEAL_CHARACTER',
    });

};
