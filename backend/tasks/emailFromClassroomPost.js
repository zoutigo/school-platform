const cron = require('node-cron')

const filterAlbumEmailClients = require('../utils/filterAlbumEmailClients')
const filterPaperEmailClients = require('../utils/filterPaperEmailClients')

const emailFromClassroomPost = cron.schedule(
  // '30 11 * * *',
  '23 12 * * *',

  () => {
    filterPaperEmailClients('classroom')
    filterAlbumEmailClients('classroom')
  },
  {
    scheduled: false,
    timezone: 'Europe/Paris',
  }
)

module.exports = emailFromClassroomPost
