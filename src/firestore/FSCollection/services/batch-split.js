export default function batchSplit(ref, data, batchAction) {
    if (data.length <= 500) {
        return batchAction(ref, data);
    }
    const first500 = data.slice(0, 500);
    const rest = data.slice(500, data.length);
    return Promise.all([
        batchSplit(ref, first500, batchAction),
        batchSplit(ref, rest, batchAction),
    ]);
}
