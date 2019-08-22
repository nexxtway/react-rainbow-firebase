Example:

    const useFirestoreSearchByIds = require('./index').default;
    const ReactJson = require('react-json-view').default;

    function FirestoreSearchByIds(props) {
        const { data, isLoading } = useFirestoreSearchByIds({
            inCollection: 'patients',
            idsCollection: 'users/5Bfk11EuAs05myqnMfaq/patients',
            once: false,
        });

        if (isLoading) {
            return <h1 style={{ fontSize: 32 }}>Loading...</h1>
        }

        return <ReactJson src={data} />;
    }

    <FirestoreSearchByIds />

Example with once set to true:

    const useFirestoreSearchByIds = require('./index').default;

    function FirestoreSearchByIds(props) {
        const { data, isLoading } = useFirestoreSearchByIds({
            inCollection: 'patients',
            idsCollection: 'users/5Bfk11EuAs05myqnMfaq/patients',
            once: true,
        });

        return data.map(item => (
            <div key={item.id}>
                {item.data.firstName || item.data.name}
            </div>
        ));
    }

    <FirestoreSearchByIds />
