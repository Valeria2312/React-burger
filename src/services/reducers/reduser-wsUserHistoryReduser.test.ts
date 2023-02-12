import {historyUserReducer, initialState} from "./wsUserHistoryReduser";
import * as actions from "../actions/wsUserHistoryActions";
import {testDataFeed} from "../../utils/testData";

describe("Redux store and actions", () => {
    beforeEach(() => {
        jest.spyOn(global, "fetch").mockRejectedValue({
            json: jest.fn().mockRejectedValue({result: "OK"}),
            ok: true,
        });
    });
    afterEach(() => {
        jest.restoreAllMocks();
    });
    // test("should return history user reducer initial state", () => {
    //    expect(historyUserReducer(undefined,{})).toEqual(initialState)
    // })
    test("should return status online WebSocket", () => {
        expect(historyUserReducer(initialState, {
            type: actions.wsOpen,
        })).toEqual({
            status: "online",
            error: '',
            data: {
                success: false,
                orders: [],
                total: 0,
                totalToday: 0,
            },
        })
    });
    test("should return status close WebSocket", () => {
        expect(historyUserReducer(initialState, {
            type: actions.wsClose,
        })).toEqual({
            status: "close",
            error: '',
            data: {
                success: false,
                orders: [],
                total: 0,
                totalToday: 0,
            },
        })
    });
    test("should return history user WebSocket", () => {
        expect(historyUserReducer(initialState, {
            type: actions.wsMessage,
            payload: testDataFeed,
        })).toEqual({
            status: "offline",
            error: '',
            data: testDataFeed,
        })
    });
    test("should return error user WebSocket", () => {
        expect(historyUserReducer(initialState, {
            type: actions.wsError,
            payload: testDataFeed,
        })).toEqual({
            status: "offline",
            error: testDataFeed,
            data: {
                success: false,
                orders: [],
                total: 0,
                totalToday: 0,
            },
        })
    });
});