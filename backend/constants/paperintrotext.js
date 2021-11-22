const paperintrotext = (paper) => {
  switch (paper.type) {
    case 'article':
      return `Un nouvel article a été posté`
    case 'activite':
      return `Une nouvelle activité a été postée par:   ${paper.entity.name}`
    case 'parent-info':
      return `Une nouvelle information pour les parents a été postée`
    case 'newsletter':
      return `Une nouvelle newletter est en ligne`
    case 'menu':
      return `Le nouveau menu de la cantine est en ligne`
    case 'breve':
      return `La nouvelle brève de la cantine est en ligne`
    case 'fourniture':
      return `La nouvelle liste des fournitures pour : ${paper.entity.name} est en ligne`

    default:
      return `un nouveau papier a été posté`
  }
}

module.exports = paperintrotext
