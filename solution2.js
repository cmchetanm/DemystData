#!/usr/bin/env node

const https = require("https");
const {cliCommand} = require("./cli")
const {errorHandler} = require("./errorHandler")

cliCommand(["list", 'Gives list of first 20 even numbered todos', makeOneApiRequest])

async function makeOneApiRequest() {
  const maxTries = 3;
  let attempts = 1;
  const promise = new Promise((resolve, reject) => {
    const request = https.get(
      "https://jsonplaceholder.typicode.com/todos",
      (response) => {
        let data = "";
        response.on("data", (chunk) => {
          data += chunk;
        });
        response.on("end", () => {
          resolve(data);
        });
        request.on("error", (error) => {
          reject(error);
        });
      }
    );
  });
  while (attempts <= maxTries) {
    try {
      const responses = JSON.parse(await promise);
      const result = responses.filter((response) => {
        return response.id % 2 === 0 && response.id < 41;
      });
      console.log(result);
      break;
    } catch (error) {
      attempts++
      await errorHandler(attempts, maxTries, error)
    }
  }
}

module.exports = makeOneApiRequest