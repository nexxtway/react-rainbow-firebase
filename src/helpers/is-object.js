export default function isObject(value) {
    return value !== null && !Array.isArray(value) && typeof value === 'object';
}
