/* eslint-disable no-shadow */
import isValidString from './is-valid-string';
import getOrderByDirection from './get-order-by-direction';
import getOperator from './get-operator';

export default function generateId(opts) {
    const {
        collectionRef,
        query = [],
        startAt,
        startAfter,
        endAt,
        endBefore,
        limit,
    } = opts;

    const optsArray = query.concat([
        { startAt },
        { startAfter },
        { endAt },
        { endBefore },
        { limit },
    ]);

    const id = optsArray.reduce((acc, currentValue) => {
        const {
            where,
            orderBy,
            dir,
            startAt,
            startAfter,
            endAt,
            endBefore,
            limit,
        } = currentValue;

        if (isValidString(where)) {
            const operator = getOperator(currentValue);
            const value = currentValue[operator];
            return `${acc}-where:${where}-${operator}:${value}`;
        }
        if (isValidString(orderBy)) {
            return `${acc}-orderBy:${orderBy}-dir:${getOrderByDirection(dir)}`;
        }
        if (startAt !== undefined) {
            return `${acc}-startAt:${startAt}`;
        }
        if (startAfter !== undefined) {
            return `${acc}-startAfter:${startAfter}`;
        }
        if (endAt !== undefined) {
            return `${acc}-endAt:${endAt}`;
        }
        if (endBefore !== undefined) {
            return `${acc}-endBefore:${endBefore}`;
        }
        if (typeof limit === 'number') {
            return `${acc}-limit:${limit}`;
        }

        return acc;
    }, `collectionRef:${collectionRef}`);

    return id;
}
