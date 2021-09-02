const TestP = require('../models/TestP')

const runTest = async () => {
  try {
    const update = await TestP.sync({ force: true })
    const test = await TestP.create({
      name: 'Difficult one',
      alias: 'difficult',
    })

    if (update && test) {
      console.log(update)
    }
  } catch (err) {
    return err
  }
}

runTest()
