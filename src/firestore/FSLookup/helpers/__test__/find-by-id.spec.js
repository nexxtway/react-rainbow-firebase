import findById from '../find-by-id';

const options = [
    { label: 'Pepe', id: 'qwerty1234' },
    { label: 'John', id: 'asdfgh1234' },
    { label: 'Pedro', id: 'zxcvbn1234' },
];

describe('findById', () => {
    it('should return undefined when options is not passed or if it is an empty array', () => {
        const optionValues = [undefined, []];
        optionValues.forEach(value => {
            expect(findById(value)).toBeUndefined();
        });
    });
    it('should find the option', () => {
        expect(findById(options, 'asdfgh1234')).toEqual({
            label: 'John',
            id: 'asdfgh1234',
        });
    });
    it('should return undefined when not find an option', () => {
        const values = [undefined, '', 'wrong-id', 'qwerty123'];
        values.forEach(value => {
            expect(findById(options, value)).toBeUndefined();
        });
    });
});
