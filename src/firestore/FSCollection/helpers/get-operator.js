const OPERATORS = ['eq', 'gt', 'gte', 'lt', 'lte', 'contains'];

export default function getOperator(queryItem) {
    return OPERATORS.find(operatorString => queryItem[operatorString] !== undefined);
}
