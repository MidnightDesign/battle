import Character from '../../model/Character';

export default interface Spawn {
    type: 'SPAWN';
    character: Character;
}

export const spawn = (character: Character): Spawn => ({type: 'SPAWN', character});
