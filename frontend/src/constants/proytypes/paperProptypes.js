import PropTypes from 'prop-types'
import entityProptypes from './entityProptypes'
import fileProptypes from './fileProptypes'

const paperProptypes = PropTypes.shape({
  uuid: PropTypes.string,
  content: PropTypes.string,
  title: PropTypes.string,
  place: PropTypes.string,
  isPrivate: PropTypes.bool,
  date: PropTypes.string,
  startdate: PropTypes.string,
  enddate: PropTypes.string,
  classe_fourniture: PropTypes.string,
  entity: entityProptypes,
  files: PropTypes.arrayOf(fileProptypes),
  createdat: PropTypes.string,
  updatedAt: PropTypes.string,
})

export default paperProptypes
