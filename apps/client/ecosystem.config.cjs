const dotenv = require('dotenv')

dotenv.config()

module.exports = {
  apps: [
    {
      script: 'build/index.js',
      name: process.env.PROCESS_NAME,
      watch: false,
    },
  ],
}
