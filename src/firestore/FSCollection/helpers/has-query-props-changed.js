export default function hasQueryPropsChanged(prevProps, props) {
    const {
        collectionRef: prevCollectionRef,
        query: prevQuery,
        limit: prevLimit,
        startAt: prevStartAt,
        startAfter: prevStartAfter,
        endAt: prevEndAt,
        endBefore: prevEndBefore,
    } = prevProps;
    const {
        collectionRef,
        query,
        limit,
        startAt,
        startAfter,
        endAt,
        endBefore,
    } = props;
    const isSomePropChanged = collectionRef !== prevCollectionRef
        || query !== prevQuery
        || limit !== prevLimit
        || startAt !== prevStartAt
        || startAfter !== prevStartAfter
        || endAt !== prevEndAt
        || endBefore !== prevEndBefore;

    if (isSomePropChanged) {
        return true;
    }
    return false;
}
