import getDataType from '../get-data-type';

describe('getDataType', () => {
    it('should return "undefined"', () => {
        expect(getDataType()).toBe('undefined');
        expect(getDataType(undefined)).toBe('undefined');
    });
    it('should return "null"', () => {
        expect(getDataType(null)).toBe('null');
    });
    it('should return "NaN"', () => {
        expect(getDataType(NaN)).toBe('NaN');
    });
    it('should return "string"', () => {
        expect(getDataType('')).toBe('string');
    });
    it('should return "number"', () => {
        expect(getDataType(0)).toBe('number');
    });
    it('should return "array"', () => {
        expect(getDataType([])).toBe('array');
    });
    it('should return "object"', () => {
        expect(getDataType({})).toBe('object');
    });
    it('should return "function"', () => {
        expect(getDataType(() => {})).toBe('function');
    });
    it('should return "Symbol"', () => {
        expect(getDataType(Symbol(''))).toBe('symbol');
    });
});
