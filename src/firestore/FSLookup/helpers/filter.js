function getWords(query) {
    return query
        .split(/\s+/g)
        .map(word => word.trim())
        .filter(word => !!word);
}

function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export default function filter(query, collection = []) {
    if (query) {
        return collection.filter(item => {
            const stringToMatch = item.label;
            const words = getWords(query);

            return words.every(word => {
                const regex = new RegExp(escapeRegExp(word), 'i');
                return regex.test(stringToMatch);
            });
        });
    }
    return collection;
}
