export default function getNormalizedValue(value) {
    if (typeof value === 'string') {
        return null;
    }
    return value;
}
