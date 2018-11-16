import { Reducer } from 'redux';
import Character from '../../model/Character';
import { addUntil, subtractUntil } from '../../util/math';
import { AppAction } from '../actions/actions';
import AppState from '../state/AppState';

type CharactersState = AppState['characters'];
type Modifier = (character: Character) => Character;
const modifyCharacter = (
    characters: CharactersState,
    character: Character,
    modifier: Modifier,
): CharactersState => {
    return characters.map((current) => {
        if (current.id !== character.id) {
            return current;
        }

        return modifier(current);
    });
};

const charactersReducer: Reducer<CharactersState, AppAction> = (characters = [], action) => {
    const modify = (character: Character, modifier: Modifier) => modifyCharacter(characters, character, modifier);
    switch (action.type) {
        case 'DAMAGE_CHARACTER':
            return modify(action.character, (character) => ({
                ...character,
                hp: subtractUntil(character.hp, action.damage, 0),
            }));
        case 'HEAL_CHARACTER':
            return modify(action.character, (character) => ({
                ...character,
                hp: addUntil(character.hp, action.hp, character.maxHp),
            }));
        case 'START_COOLDOWN':
            const cooldownEnd = new Date();
            cooldownEnd.setTime(cooldownEnd.getTime() + 1000);
            return modify(action.character, (character) => ({...character, cooldownEnd}));
        case 'SPAWN':
            return [...characters, action.character];
    }
    return characters;
};

export default charactersReducer;
