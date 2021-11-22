const paperLink = (paper) => {
  switch (paper.type) {
    case 'article':
      return `/informations/article`
    case 'activite':
      return `/informations/actualites/activites`
    case 'parent-info':
      return `/informations/actualites/infosparents`
    case 'newsletter':
      return `/informations/actualites/newsletter`
    case 'menu':
      return `/viescolaire/cantine/menus`
    case 'breve':
      return `/viescolaire/cantine/breves`
    case 'fourniture':
      return `/informations/fournitures`

    default:
      return `/informations/actualites`
  }
}

module.exports = paperLink
