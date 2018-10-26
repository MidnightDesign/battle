import {addVariance, randomBool} from '../util/rng';
import Character from './Character';

export const calculateAttackDamage = (attacker: Pick<Character, 'attackPower'>) => (
    Math.round(addVariance(attacker.attackPower, .2))
);
export const rollForHit = ({precision}: Pick<Character, 'precision'>) => randomBool(precision);
