export default function hasQueryPropsChanged(prevProps, props) {
    const {
        path: prevPath,
        query: prevQuery,
        limit: prevLimit,
        startAt: prevStartAt,
        startAfter: prevStartAfter,
        endAt: prevEndAt,
        endBefore: prevEndBefore,
    } = prevProps;
    const {
        path,
        query,
        limit,
        startAt,
        startAfter,
        endAt,
        endBefore,
    } = props;
    const isSomePropChanged = path !== prevPath
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
