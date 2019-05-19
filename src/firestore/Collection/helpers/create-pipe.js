import isValidString from './is-valid-string';
import getOrderByDirection from './get-order-by-direction';
import getOperator from './get-operator';

const OPERATORS_MAP = {
    eq: '==',
    gt: '>',
    gte: '>=',
    lt: '<',
    lte: '<=',
    contains: 'array_contains',
};

export default function createPipe(reference, query) {
    if (Array.isArray(query)) {
        return query.reduce((ref, queryItem) => {
            const {
                where,
                orderBy,
                dir,
                startAt,
                startAfter,
                endAt,
                endBefore,
                limit,
            } = queryItem;

            if (isValidString(where)) {
                const operator = getOperator(queryItem);
                const value = queryItem[operator];
                return ref.where(where, OPERATORS_MAP[operator], value);
            }
            if (isValidString(orderBy)) {
                return ref.orderBy(orderBy, getOrderByDirection(dir));
            }
            if (startAt !== undefined) {
                return ref.startAt(startAt);
            }
            if (startAfter !== undefined) {
                return ref.startAfter(startAfter);
            }
            if (endAt !== undefined) {
                return ref.endAt(endAt);
            }
            if (endBefore !== undefined) {
                return ref.endBefore(endBefore);
            }
            if (typeof limit === 'number') {
                return ref.limit(limit);
            }
            return ref;
        }, reference);
    }
    return reference;
}
