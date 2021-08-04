const redefineAlias = (cat = null) => {
  switch (cat) {
    case 'petite-section':
      return 'ps'
    case 'moyenne-section':
      return 'ms'
    case 'grande-section':
      return 'gs'

    default:
      return cat
  }
}

export default redefineAlias
