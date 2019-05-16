import registerCollection from '../register-collection';
import fetchCollection from '../fetch-collection';

jest.mock('../fetch-collection', () => jest.fn());

const dispatch = jest.fn();
const opts = {
    path: 'users',
    limit: 10,
};

beforeEach(() => {
    dispatch.mockReset();
});

describe('registerCollection action', () => {
    it('should dispatch REGISTER_COLLECTION', () => {
        registerCollection(opts)(dispatch);
        expect(dispatch.mock.calls[0][0]).toEqual({
            type: 'REGISTER_COLLECTION',
            id: 'users',
        });
    });
    it('should dispatch fetchCollection', () => {
        registerCollection(opts)(dispatch);
        expect(fetchCollection).toHaveBeenCalledWith({
            path: 'users',
            limit: 10,
        });
        expect(dispatch).toHaveBeenCalledTimes(2);
    });
});
