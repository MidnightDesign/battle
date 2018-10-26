import Character from '../../model/Character';
import {attack} from './Attack';

const baseCharacter = {hp: 100, maxHp: 100};

describe('attack', () => {
    it(`returns a non-hit action if the hit roll doesn't succeed`, () => {
        const attacker: Character = {...baseCharacter, attackPower: 10, precision: 0, name: 'Foo', id: 'foo'};
        const target: Character = {...baseCharacter, hp: 100, name: 'Bar', id: 'bar', attackPower: 10, precision: 50};

        const action = attack(attacker, target);

        expect(action).toEqual({type: 'ATTACK', attacker, target, hit: false});
    });
});
