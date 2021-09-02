const TestP = require('../models/TestP')

const runTest = async () => {
  try {
    const update = await TestP.sync({ force: true })
    const test = await TestP.create({
      name: 'Difficult one',
      alias: 'difficult',
    })

    const result = await TestP.findAll()

    if ((update && test, result)) {
      console.log('the result is', result)
    }
  } catch (err) {
    return err
  }
}

runTest()
