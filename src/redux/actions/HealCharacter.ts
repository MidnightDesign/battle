import Character from '../../model/Character';

export default interface HealCharacter {
    type: 'HEAL_CHARACTER';
    character: Character;
    hp: number;
}
