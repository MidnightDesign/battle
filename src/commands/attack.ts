import { attack as doAttack } from '../actions/attack';
import Character, { isCoolingDown, isDead } from '../model/Character';

export const attack = (attacker: Character, target: Character) => {
    if (target === undefined) {
        return;
    }
    if (isDead(target) || isCoolingDown(attacker)) {
        return;
    }
    doAttack(attacker, target);
};
