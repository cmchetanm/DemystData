#!/usr/bin/env node

const https = require("https");
const { program } = require("commander");

program
  .command("list")
  .description("Gives list of first 20 even numbered todos")
  .action(() => {
    makeMultipleApiRequests();
  });

program.parse();

async function makeMultipleApiRequests() {
  const baseUrl = "https://jsonplaceholder.typicode.com/todos/";
  const numberOfCalls = 40;
  const promises = [];
  const maxTries = 3;
  let attempts = 1;

  for (let i = 2; i <= numberOfCalls; i += 2) {
    const promise = new Promise((resolve, reject) => {
      const request = https.get(`${baseUrl}${i}`, (response) => {
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
      });
    });
    promises.push(promise);
  }
  while (attempts <= maxTries) {
    try {
      const responses = await Promise.all(promises);
      const result = responses.map((response) => {
        const { id, title, completed } = JSON.parse(response);
        return { id, title, completed };
      });
      console.log(result);
      break;
    } catch (error) {
      attempts++;
      if (attempts <= maxTries) {
        console.log(
          `Request failed with error: ${error.message}. Retrying after 1 second... Attempt ${attempts}`
        );
        await new Promise((resolve) => setTimeout(resolve, 1000));
      } else {
        console.log(
          `Maximum number of retries reached. Error making request to the server: ${error.message}`
        );
      }
    }
  }
}

module.exports = makeMultipleApiRequests