import { heal as doHeal } from '../actions/heal';
import Character, { isCoolingDown } from '../model/Character';

export const heal = (healer: Character, target: Character) => {
    if (isCoolingDown(healer)) {
        return;
    }
    doHeal(healer, target);
};
