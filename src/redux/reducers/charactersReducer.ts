import {Reducer} from 'redux';
import Character, {isDead} from '../../model/Character';
import Attack from '../actions/Attack';
import Heal from '../actions/Heal';
import Spawn from '../actions/Spawn';
import State from '../state/State';

type Action =
    Attack |
    Heal |
    Spawn;

type Modifier = (character: Character) => Character;

const modifyCharacter = (
    characters: Character[],
    character: Character,
    modifier: Modifier,
) => characters.map((current) => current.id !== character.id ? current : modifier(current));

const charactersReducer: Reducer<State['characters'], Action> = (characters = [], action) => {
    const modify = (character: Character, mofifier: Modifier) => modifyCharacter(characters, character, mofifier);
    const cooldown = (character: Character): Character => {
        const cooldownEnd = new Date();
        cooldownEnd.setTime(cooldownEnd.getTime() + 1000);
        return ({...character, cooldownEnd});
    };
    switch (action.type) {
        case 'ATTACK':
            const targetDamaged = modify(action.target, (character) => {
                if (!action.hit) {
                    return character;
                }
                let newHp = character.hp - action.damage;
                if (isDead({hp: newHp})) {
                    newHp = 0;
                }
                return {...character, hp: newHp};
            });
            return modifyCharacter(targetDamaged, action.attacker, cooldown);
        case 'HEAL':
            const targetHealed = modify(action.target, (character) => {
                let newHp = character.hp + 10;
                if (newHp > character.maxHp) {
                    newHp = character.maxHp;
                }
                return cooldown({...character, hp: newHp});
            });
            return modifyCharacter(targetHealed, action.healer, cooldown);
        case 'SPAWN':
            return [...characters, action.character];
    }
    return characters;
};

export default charactersReducer;