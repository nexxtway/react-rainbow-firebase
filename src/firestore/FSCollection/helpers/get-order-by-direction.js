export default function getOrderByDirection(dir) {
    if (dir === 'desc') {
        return 'desc';
    }
    return 'asc';
}
