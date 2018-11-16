import { Action } from 'redux';
import Character from '../../model/Character';

export interface StartCooldown extends Action {
    character: Character;
    type: 'START_COOLDOWN';
}
