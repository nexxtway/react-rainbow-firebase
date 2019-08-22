import isObject from '../is-object';

describe('isObject', () => {
    it('should return false', () => {
        const values = [null, undefined, NaN, 'abc', 123, [], () => {}, Symbol('')];
        values.forEach(value => {
            expect(isObject(value)).toBe(false);
        });
    });
    it('should return true', () => {
        expect(isObject({})).toBe(true);
    });
});
