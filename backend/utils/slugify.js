const slugify = (Text) =>
  Text.toLowerCase()
    .replace(/ /g, '-')
    .replace(/[^\w-]+/g, '')

module.exports = slugify
