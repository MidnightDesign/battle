import {calculateAttackDamage, rollForHit} from './battle';

describe('calculateAttackDamage', () => {
    it('returns a number that is approximately the attack power of the character', () => {
        const iterations = 10000;
        const attackPower = 100;
        const totalDamage = new Int8Array(iterations)
            .map(() => calculateAttackDamage({attackPower}))
            .reduce((total, damage) => total + damage, 0);
        expect(totalDamage / iterations).toBeCloseTo(attackPower, 0);
    });
});

describe('rollForHit', () => {
    it(`returns true at the rate of the attacker's precision`, () => {
        const attacker = {precision: 90};
        const iterations = 1000;
        const [hits] = (Array.apply(null, Array(iterations)) as boolean[])
            .map(() => rollForHit(attacker))
            .reduce((totals, hit) => [totals[0] + (hit ? 1 : 0), totals[1] + (hit ? 0 : 1)], [0, 0]);
        expect(hits / iterations).toBeCloseTo(attacker.precision / 100, 1);
    });
});
