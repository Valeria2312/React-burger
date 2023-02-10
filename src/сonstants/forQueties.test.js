import {checkResponse, getFeedOrder} from "./ForQueries";

test("Should be ok when get response SUCCESSES", () => {
    const mockedResponse = {
        ok: true,
        json: () => "res-ok"
    }
    const response = checkResponse(mockedResponse)
expect(response).toBe("res-ok")
})

 test("Should be error when get response FAILED", async () => {

     const mockedResponse = {
         ok: false,
         status: "res-not-ok"
     }
     const response = checkResponse(mockedResponse)
     await  expect(response).rejects.toBe("Ошибка: res-not-ok")
 })
