/* eslint-disable */
export function isListening(state, id) {
    return !!(state[id] && state[id].isListening);
}
