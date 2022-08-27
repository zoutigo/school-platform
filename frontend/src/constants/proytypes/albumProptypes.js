import PropTypes from 'prop-types'
import fileProptypes from './fileProptypes'

const albumProptypes = PropTypes.shape({
  uuid: PropTypes.string.isRequired,
  isPrivate: PropTypes.bool.isRequired,
  slug: PropTypes.string.isRequired,
  descr: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  files: PropTypes.arrayOf(fileProptypes),
})

export default albumProptypes
