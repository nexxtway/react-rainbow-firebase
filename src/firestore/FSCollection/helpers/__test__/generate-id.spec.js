import generateId from '../generate-id';

describe('generateId', () => {
    it('should generate the right id', () => {
        const opts = {
            collectionRef: 'users',
            query: [{ orderBy: 'name' }],
            startAt: 'John',
            endBefore: 'Mary',
            limit: 20,
        };
        expect(generateId(opts)).toBe('collectionRef:users-orderBy:name-dir:asc-startAt:John-endBefore:Mary-limit:20');
    });
    it('should generate the right id when only pass collectionRef and limit', () => {
        const opts = {
            collectionRef: 'orders',
            limit: 20,
        };
        expect(generateId(opts)).toBe('collectionRef:orders-limit:20');
    });
    it('should generate the right id when pass a where query', () => {
        const opts = {
            collectionRef: 'users',
            query: [{
                where: 'type',
                eq: 'regular',
            }],
            startAfter: 'Pepe',
            endAt: 'Doe',
        };
        expect(generateId(opts)).toBe('collectionRef:users-where:type-eq:regular-startAfter:Pepe-endAt:Doe');
    });
    it('should generate the right id when pass a where query with keys order inverted', () => {
        const opts = {
            collectionRef: 'users',
            query: [{
                eq: 'regular',
                where: 'type',
            }],
            startAfter: 'Pepe',
            endAt: 'Doe',
        };
        expect(generateId(opts)).toBe('collectionRef:users-where:type-eq:regular-startAfter:Pepe-endAt:Doe');
    });
});
