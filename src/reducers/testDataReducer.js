import { UPDATE_TEST_DATA } from '../actions/types';

export default (previousState = 0, action) => {
    switch (action.type) {
        case UPDATE_TEST_DATA:
            return previousState + 1;
        default:
            return previousState;
    }
};
