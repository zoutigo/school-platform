const { execute } = require('@getvim/execute')
const dotenv = require('dotenv').config()
const compress = require('gzipme')
const fs = require('fs')

require('dotenv').config()

const username = process.env.PGDB_USER
const password = process.env.PGDB_PASSWORD
const database = process.env.PGDB_NAME
const dbHost = process.env.PGDB_HOST
const dbPort = process.env.PGDB_PORT

const date = new Date()
const today = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`
// const backupFile = `db-backup-${today}.tar`
const dbbackupfile = `db-backup-${today}.sql`

const backup = () => {
  const dir = './files/backups'
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir)
  }
  execute(
    // `PGPASSWORD=${password} pg_dump -U ${username} -h ${dbHost} -p ${dbPort} -f ${backupFile} -F t -d ${database}`
    // `pg_dump PGPASSWORD="valery54" -h localhost -p 5432 -U postgres -d augustin -f augustin205.sql`
    `PGPASSWORD=${password} pg_dump --no-owner -h ${dbHost} -p ${dbPort} -U ${username} ${database} > ./files/backups/${dbbackupfile}`
  )
    .then(async () => {
      // await compress(backupFile)
      // fs.unlinkSync(backupFile)
      console.log('backup created')
    })
    .catch((err) => {
      console.log(err)
    })
}

module.exports = backup
