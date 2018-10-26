export default interface Character {
    readonly id: string;
    readonly name: string;
    readonly hp: number;
    readonly maxHp: number;
    readonly attackPower: number;
    readonly precision: number;
}

export const isDead = ({hp}: Pick<Character, 'hp'>) => hp < 1;
