const dotenv = require('dotenv')

dotenv.config()

module.exports = {
  apps: [
    {
      script: 'build/src/index.js',
      name: process.env.PROCESS_NAME,
      watch: false,
    },
  ],
}
