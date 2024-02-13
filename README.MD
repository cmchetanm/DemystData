# Project Setup

Install dependencies:
    npm i

Link the project:
    npm link

# Solutions

## Solution 1
Fetches the first 20 even-numbered ToDos by calling the API 20 times.

Command to execute Solution 1:
    todo-solution-1 list

## Solution 2
Fetches all ToDos from the API in a single request and then filters the first 20 even-numbered ToDos at the application level.

Command to execute Solution 2:
    todo-solution-2 list

# Solution-Description
Instead of third party library like axios, inbuilt https module is used as it proved to be faster than axios. Apart from this, multi-threaded programming has also been tried but single threaded asynchronous programming is used since it proved to be faster than multi-threaded (using worker threads) programming for smaller iteration.

# Docker Containerization
To run the application in a Docker container:

## Build the Docker image: 
docker build -t image_name .

## Run the Docker container: 
docker run image_name

Adjust the placeholder "image_name" with your actual Docker image name.

# Testing
Run test cases for both solutions: 
    npm test

Feel free to reach out if you have any questions or encounter issues.






