import fetchCollection from '../fetch-collection';
import resolveCollection from '../../services/resolve-collection';
import isFirstTime from '../../reducer/getters/is-first-time';

jest.mock('../../services/resolve-collection', () => jest.fn());
jest.mock('../../reducer/getters/is-first-time', () => jest.fn());

const dispatch = jest.fn();
const getState = jest.fn();
const opts = {
    path: 'users-collection',
    limit: 10,
};

beforeEach(() => {
    dispatch.mockReset();
    getState.mockReset();
    isFirstTime.mockReset();
    isFirstTime.mockReturnValue(true);
    resolveCollection.mockReset();
    resolveCollection.mockReturnValue(Promise.resolve('collection data'));
});

describe('fetchCollection action', () => {
    it('should dispatch START_LOADING_COLLECTION', () => {
        fetchCollection(opts)(dispatch, getState);
        expect(dispatch.mock.calls[0][0]).toEqual({
            type: 'START_LOADING_COLLECTION',
            id: 'users-collection',
        });
    });
    it('should call resolveCollection', () => {
        fetchCollection(opts)(dispatch, getState);
        expect(resolveCollection).toHaveBeenCalledWith({
            path: 'users-collection',
            limit: 10,
        });
    });
    it('should dispatch LOAD_COLLECTION', () => {
        expect.assertions(2);
        return fetchCollection(opts)(dispatch, getState)
            .then(() => {
                expect(dispatch.mock.calls[1][0]).toEqual({
                    type: 'LOAD_COLLECTION',
                    id: 'users-collection',
                    data: 'collection data',
                });
                expect(dispatch).toHaveBeenCalledTimes(2);
            });
    });
    it('should dispatch ERROR_COLLECTION when there is an error', () => {
        expect.assertions(2);
        const ERROR = 'server error';
        resolveCollection.mockReturnValue(Promise.reject(ERROR));

        return fetchCollection(opts)(dispatch, getState)
            .then(() => {
                expect(dispatch.mock.calls[1][0]).toEqual({
                    type: 'ERROR_COLLECTION',
                    id: 'users-collection',
                    error: 'server error',
                });
                expect(dispatch).toHaveBeenCalledTimes(2);
            });
    });
    it('should not call dispatch when is not first time', () => {
        isFirstTime.mockReturnValue(false);
        fetchCollection(opts)(dispatch, getState);
        expect(dispatch).toHaveBeenCalledTimes(0);
    });
});
