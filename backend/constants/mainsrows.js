require('dotenv').config()

module.exports.cardsAlbum = {
  name: 'Cartes Chemins',
  alias: 'cards',
  description: 'Album des images de cartes',
  isPrivate: false,
  isActive: true,
}
module.exports.papersAlbumDatas = {
  name: 'Papers Album',
  alias: 'papers',
  description: 'Album des fichiers papers',
  isPrivate: false,
  isActive: true,
}
module.exports.editorAlbumDatas = {
  name: 'Editor',
  alias: 'editor',
  description: 'Album des images de editor',
  isPrivate: false,
  isActive: true,
}
module.exports.adminEntity = {
  name: 'Administration',
  alias: 'admin',
  content: 'Entité principale du site',
  email: process.env.ADMIN_EMAIL,
}
module.exports.secretariatEntityDatas = {
  name: 'secretariat',
  alias: 'secretariat',
  email: 'saint-augustin@gmail.com',
}
