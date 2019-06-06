export default function fetchDoc(ref) {
    return ref.get()
        .then(doc => {
            if (doc.exists) {
                return {
                    id: doc.id,
                    data: doc.data(),
                };
            }
            return null;
        });
}
