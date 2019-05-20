Base example:

    <Collection path="users" limit={10} />

Limited to 5 regular users:

    <Collection
        path="users"
        query={[
            {
                where: 'type',
                eq: 'regular',
            },
        ]}
        limit={5} />

Ordered by firstName and start at Leo:

    <Collection
        path="users"
        query={[
            {
                orderBy: 'firstName',
                dir: 'asc',
            },
        ]}
        startAt="Leo" />

Table example:

    const { Card, Table, Column } = require('react-rainbow-components');

    function CollectionTable(props) {
        const { isLoading, data } = props;

        return (
            <Card>
                <Table keyField="id" isLoading={isLoading} data={data}>
                    <Column header="First Name" field="data.firstName" />
                    <Column header="Last Name" field="data.lastName" />
                    <Column header="Phone Number" field="data.phone" />
                    <Column header="Member Id" field="id" />
                    <Column header="Type" field="data.type" />
                </Table>
            </Card>
        );
    }

    <Collection path="users" component={CollectionTable} />
