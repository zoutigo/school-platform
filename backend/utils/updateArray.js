module.exports.updateArray = (prevArray, arrayAction, value) => {
  switch (arrayAction) {
    case 'remove':
      return prevArray.filter((filter) => filter !== value)

    case 'add':
      if (!prevArray.includes(value)) {
        prevArray.push(value)
      }
      return prevArray

    default:
      return prevArray
  }
}
