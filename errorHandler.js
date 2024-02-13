const errorHandler = async (attempts, maxTries, error) => {
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

module.exports = {errorHandler}