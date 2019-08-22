export default function getDataType(value) {
    if (value === null) {
        return 'null';
    }
    if (Array.isArray(value)) {
        return 'array';
    }
    if (String(value) === 'NaN') {
        return 'NaN';
    }
    return typeof value;
}
