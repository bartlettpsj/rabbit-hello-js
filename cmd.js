const commandLineArgs = require('command-line-args')
const util = require('util')

const optionDefinitions = [
  { name: 'verbose', alias: 'v', type: Boolean, defaultValue: false},
  { name: 'user', alias: 'u', type: String, defaultValue: 'paul' },
  { name: 'pass', alias: 'p', type: String, defaultValue: 'porky123' },
  { name: 'vhost', alias: 'h', type: String, defaultValue: 'paul' },
  { name: 'server', alias: 's', type: String, defaultValue: 'localhost' }
]

const options = commandLineArgs(optionDefinitions)

module.exports = {
  makeUrl: function () {
    return util.format('amqp://%s:%s@%s/%s', options.user, options.pass, options.server, options.vhost);
  }
}
