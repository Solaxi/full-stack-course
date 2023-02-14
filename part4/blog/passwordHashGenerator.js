const config = require('./utils/config')
const bcrypt = require('bcrypt')

if (process.argv.length < 3) {
  console.log('Please give pw to hash')
  process.exit(1)
}
const pw = process.argv[2]

bcrypt.hash(pw, config.SALT_ROUNDS).then(hash => {
  console.log('PasswordHash: ', hash)
})
