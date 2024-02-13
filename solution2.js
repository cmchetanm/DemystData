#!/usr/bin/env node

const https = require("https");
const { program } = require("commander");

program
  .command("list")
  .description("Gives list of first 20 even numbered todos")
  .action(() => {
    makeOneApiRequest();
  });

program.parse();

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

module.exports = makeOneApiRequest