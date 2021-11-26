const albumLink = (album) => {
  switch (album.entity.alias) {
    case 'cantine':
      return `/cantine/albums`
    case 'pastorale':
      return `/pastorale/albums`
    case 'ps':
      return `/petite-section/albums`
    case 'ms':
      return `/moyenne-section/albums`
    case 'gs':
      return `/grande-section/albums`

    default:
      return `/${album.entity.alias}/albums`
  }
}

module.exports = albumLink
