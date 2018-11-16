import { calculateAttackDamage, rollForHit } from '../model/battle';
import Character from '../model/Character';
import { store } from '../redux/store';

export const attack = (attacker: Character, target: Character) => {
    store.dispatch({
        character: attacker,
        type: 'START_COOLDOWN',
    });
    if (!rollForHit(attacker)) {
        return;
    }
    const damage = calculateAttackDamage(attacker);
    store.dispatch({
        character: target,
        damage,
        type: 'DAMAGE_CHARACTER',
    });
};
