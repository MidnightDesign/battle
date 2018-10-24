import {addVariance, randomBool} from '../util/rng';
import Character from './Character';

export const calculateAttackDamage = (attacker: Character) => Math.round(addVariance(attacker.attackPower, .2));
export const rollForHit = () => randomBool(90);
