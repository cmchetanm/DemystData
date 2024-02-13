const https = require("https")
const makeOneApiRequest = require('./solution2');

jest.mock("https");
console.log = jest.fn();

describe("makeOneApiRequest", () => {

    it("should make one request", async () => {
        const mockData = JSON.stringify([{id:2, title:"ToDo", completed: true}])
        https.get.mockImplementation((url, handler) => {
            handler({
                on: (event, callback) => {
                    if(event === "data") {
                        callback(mockData)
                    } else if (event === 'end') {
                        callback()
                    }
                }
            })
        })
        await makeOneApiRequest()
        expect(https.get).toHaveBeenCalledTimes(1)
        expect(console.log).toHaveBeenCalledTimes(1)
    })

    it("should retry 3 times in case of failed request", async() => {
        https.get.mockImplementation((url, handler) => {
            handler({
                on: (event, callback) => {
                    if(event === 'error') {
                        callback(new Error('Mock error'))
                    }
                }
            })
        })
        await makeOneApiRequest()
        expect(https.get).toHaveBeenCalledTimes(1)
        expect(console.log).toHaveBeenCalledTimes(3)
    })
})
