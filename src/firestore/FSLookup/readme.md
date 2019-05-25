Basic example:

    <FSLookup
        label="Find user"
        collectionRef="users"
        optionsMapFn={(user) => ({
            label: `${user.data.firstName} ${user.data.lastName}`,
            description: user.data.type,
        })}
        value={state.value}
        onChange={(value) => setState({ value })} />

Patients example:

    <FSLookup
        label="Find patient"
        collectionRef="patients"
        optionsMapFn={(patient) => ({
            label: patient.data.firstName,
        })}
        value={state.value}
        onChange={(value) => setState({ value })} />


Example without optionsMapFn:

    const getDocReference = require('../../helpers/get-doc-reference').default;

    initialState = { value: getDocReference('users', '5Bfk11EuAs05myqnMfaq') };

    <FSLookup
        label="Find user"
        collectionRef="users"
        value={state.value}
        onChange={(value) => setState({ value })} />
