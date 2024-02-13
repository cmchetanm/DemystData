const https = require("https");
const makeMultipleApiRequests = require("./solution1");

jest.mock("https");
console.log = jest.fn();

describe("makeMultipleApiRequests", () => {

  it("should make multiple requests", async () => {
    const mockData = JSON.stringify({ id: 1, title: "ToDo", completed: true });
    https.get.mockImplementation((url, handler) => {
      handler({
        on: (event, callback) => {
          if (event === "data") {
            callback(mockData);
          } else if (event === "end") {
            callback();
          }
        },
      });
    });
    await makeMultipleApiRequests();
    expect(https.get).toHaveBeenCalledTimes(20);
    expect(console.log).toHaveBeenCalledTimes(1);
  });

  it("should retry 3 times in case of failed request", async() => {
    https.get.mockImplementation((url, handler) => {
        handler({
            on: (event, callback) => {
                if(event === 'error') {
                    callback(new Error ("Mocked Error"))
                }
            }
        })
    })
    await makeMultipleApiRequests()
    expect(console.log).toHaveBeenCalledTimes(3)
  })
});
