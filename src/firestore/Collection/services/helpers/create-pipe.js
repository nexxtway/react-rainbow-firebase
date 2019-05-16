const OPERATORS = ['eq', 'gt', 'gte', 'lt', 'lte', 'contains'];
const OPERATORS_MAP = {
    eq: '==',
    gt: '>',
    gte: '>=',
    lt: '<',
    lte: '<=',
    contains: 'array_contains',
};

function hasValidWhereClause(where) {
    return where && typeof where === 'string';
}

function hasValidOrderByClause(orderBy) {
    return orderBy && typeof orderBy === 'string';
}

function getOrderByDirection(dir) {
    if (dir === 'desc') {
        return 'desc';
    }
    return 'asc';
}

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

            if (hasValidWhereClause(where)) {
                const operator = OPERATORS.find(operatorString => queryItem[operatorString]);
                const value = queryItem[operator];
                return ref.where(where, OPERATORS_MAP[operator], value);
            }
            if (hasValidOrderByClause(orderBy)) {
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
