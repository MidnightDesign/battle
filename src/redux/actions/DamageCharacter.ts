import { Action } from 'redux';
import Character from '../../model/Character';

export interface DamageCharacter extends Action {
    character: Character;
    damage: number;
    type: 'DAMAGE_CHARACTER';
}
