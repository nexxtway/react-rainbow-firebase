class FirestoreListeners {
    constructor() {
        this.listeners = new Map();
    }

    isListening({ at }) {
        return this.listeners.has(at);
    }

    register({ id, unsubscribe }) {
        this.listeners.set(id, unsubscribe);
    }

    unsubscribe({ from }) {
        if (this.listeners.has(from)) {
            const unsubscribeListener = this.listeners.get(from);
            if (typeof unsubscribeListener === 'function') {
                unsubscribeListener();
            }
            this.listeners.delete(from);
        }
    }

    unsubscribeFromAll() {
        if (this.listeners.size > 0) {
            this.listeners.forEach(unsubscribeListener => {
                if (typeof unsubscribeListener === 'function') {
                    unsubscribeListener();
                }
            });
            this.listeners.clear();
        }
    }
}

export default new FirestoreListeners();
