export default interface Character {
    readonly id: string;
    readonly name: string;
    readonly hp: number;
    readonly maxHp: number;
    readonly attackPower: number;
    readonly precision: number;
    readonly cooldownEnd: Date | undefined;
}

export const isDead = ({hp}: Pick<Character, 'hp'>) => hp < 1;
export const isCoolingDown = ({cooldownEnd}: Pick<Character, 'cooldownEnd'>, now?: Date) => {
    if (cooldownEnd === undefined) {
        return false;
    }
    return (now || new Date()).getTime() <= cooldownEnd.getTime();
};
