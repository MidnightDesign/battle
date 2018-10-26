import {isDead} from './Character';

describe('isDead', () => {
    it('returns false if HP are positive', () => {
        expect(isDead({hp: 1})).toEqual(false);
    });
    it('returns true if HP are 0', () => {
        expect(isDead({hp: 0})).toEqual(true);
    });
    it('returns true if HP are negative', () => {
        expect(isDead({hp: -1})).toEqual(true);
    });
});
