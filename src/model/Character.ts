export default interface Character {
    readonly id: string;
    readonly name: string;
    readonly hp: number;
    readonly maxHp: number;
    readonly attackPower: number;
}

export const isDead = ({hp}: Pick<Character, 'hp'>) => hp < 1;
