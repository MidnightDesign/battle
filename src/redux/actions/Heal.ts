import Character from '../../model/Character';

export default interface Heal {
    type: 'HEAL';
    healer: Character;
    target: Character;
}

export const heal = (healer: Character, target: Character): Heal => ({type: 'HEAL', healer, target});
