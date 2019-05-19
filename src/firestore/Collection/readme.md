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
