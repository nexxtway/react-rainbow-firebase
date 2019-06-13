Basic example:

    <FSDoc docRef="users/5Bfk11EuAs05myqnMfaq" />

Example with once:

    const getDocReference = require('../../helpers/get-doc-reference').default;
    const { Badge, Spinner } = require('react-rainbow-components');

    const styles = {
        position: 'relative',
        padding: '24px 0',
        display: 'flex',
        justifyContent: 'center',
    };

    function RenderComponent({ doc, isLoading, error }) {
        if (isLoading) {
            return <Spinner />
        }
        if (doc) {
            const { firstName, lastName } = doc.data;
            return <Badge label={`${firstName} ${lastName}`} />;
        }
        if (error) {
            return <span>{error.message}</span>
        }
        return null;
    }

    <div style={styles}>
        <FSDoc
            docRef={getDocReference('users/auISkNVziru5hBg5kPlb')}
            once
            component={RenderComponent}
        />
    </div>
