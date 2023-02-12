import {historyReducer, initialState} from "./wsHistoryReducer";
import * as actions from "../actions/wsHistoryActions";
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
    test("should return history reducer initial state", () => {
        expect(historyReducer(undefined, {})).toEqual(initialState)
    })
    test("should return status online WebSocket", () => {
        expect(historyReducer(initialState, {
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
        expect(historyReducer(initialState, {
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
        expect(historyReducer(initialState, {
            type: actions.wsMessage,
            payload: testDataFeed,
        })).toEqual({
            status: "offline",
            error: '',
            data: testDataFeed,
        })
    });
    test("should return error user WebSocket", () => {
        expect(historyReducer(initialState, {
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