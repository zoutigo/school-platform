const cron = require('node-cron')
const backup = require('../service/backup')

const backupPgDb = cron.schedule(
  '45 12 * * *',

  () => {
    console.log('hello')
    backup()
  },
  {
    scheduled: false,
    timezone: 'Europe/Paris',
  }
)

module.exports = backupPgDb
