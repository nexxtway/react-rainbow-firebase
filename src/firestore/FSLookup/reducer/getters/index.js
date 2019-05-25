export function isListening(state, id) {
    return !!(state[id] && state[id].isListening);
}

export function getOptions(state, id) {
    return state[id].options;
}
