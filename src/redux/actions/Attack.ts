import {calculateAttackDamage, rollForHit} from '../../model/battle';
import Character from '../../model/Character';

interface BaseAttack {
    type: 'ATTACK';
    attacker: Character;
    target: Character;
}

interface HitAttack extends BaseAttack {
    hit: true;
    damage: number;
}

interface MissAttack extends BaseAttack {
    hit: false;
}

type Attack = HitAttack | MissAttack;

export default Attack;

export const attack = (attacker: Character, target: Character): Attack => {
    const action: BaseAttack = {attacker, target, type: 'ATTACK'};
    if (!rollForHit(attacker)) {
        return {...action, hit: false};
    }
    const damage = calculateAttackDamage(action.attacker);
    return {...action, hit: true, damage};
};
