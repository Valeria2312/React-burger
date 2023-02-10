import * as actions from './BurgerIngridients'
import {testBodyRequest} from "../../utils/testData";
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

describe('async actions', () => {
    beforeEach(() => {
        jest.spyOn(global, "fetch").mockRejectedValue({
            json: jest.fn().mockRejectedValue({result: "OK"}),
            ok: true,
        });
    });
    afterEach(() => {
        jest.restoreAllMocks();
    })
    it('creates GET_INGREDIENTS_SUCCESS when fetching todos has been done', () => {
        const expectedActions = [
            {type: actions.GET_INGREDIENTS_REQUEST},
            {type: actions.GET_INGREDIENTS_SUCCESS, ingredients: testBodyRequest},
            {type: actions.GET_INGREDIENTS_FAILED}
        ];
        const middlewares = [thunk]
        const mockStore = configureMockStore(middlewares)
        const store = mockStore({ingredients: []})
        return store.dispatch(actions.getIngredients()).then(() => {
            expect(store.getActions()).toEqual(expectedActions)
        })
    })
})