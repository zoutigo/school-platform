const cron = require('node-cron')

const filterAlbumEmailClients = require('../utils/filterAlbumEmailClients')
const filterPaperEmailClients = require('../utils/filterPaperEmailClients')

const emailFromEntityPost = cron.schedule(
  '00 12 * * *',

  () => {
    filterPaperEmailClients('other')
    filterAlbumEmailClients('other')
  },
  {
    scheduled: false,
    timezone: 'Europe/Paris',
  }
)

module.exports = emailFromEntityPost
