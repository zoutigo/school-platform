const albumLink = (album) => {
  switch (album.entity.alias) {
    case 'cantine':
      return `/viescolaire/cantine/albums`
    case 'pastorale':
      return `/viescolaire/pastorale/albums`
    case 'ps':
      return `/classes/petite-section/albums`
    case 'ms':
      return `/classes/moyenne-section/albums`
    case 'gs':
      return `/classes/grande-section/albums`
    case 'cp':
      return `/classes/cp/albums`
    case 'ce1':
      return `/classes/ce1/albums`
    case 'ce2':
      return `/classes/ce2/albums`
    case 'cm1':
      return `/classes/cm1/albums`
    case 'cm2':
      return `/classes/cm2/albums`
    case 'adaptation':
      return `/classes/adaptation/albums`
    case 'apel':
      return `/apelogec/apel/albums`
    case 'ogec':
      return `/apelogec/ogec/albums`

    default:
      return `/informations/actualites`
  }
}

module.exports = albumLink
