const { program } = require("commander");

const cliCommand = (argv) => {

  program
  .command(argv[0])
  .description(argv[1])
  .action((params, options, command) => {
    argv[2].call()
  })
  .parse()
  return program
}

module.exports = { cliCommand }