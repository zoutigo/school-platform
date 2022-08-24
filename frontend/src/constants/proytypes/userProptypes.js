import PropTypes from 'prop-types'

const userPropTypes = PropTypes.shape({
  uuid: PropTypes.string,
  email: PropTypes.string,
  lastname: PropTypes.string,
  firstname: PropTypes.string,
  gender: PropTypes.string,
  isVerified: PropTypes.bool,
  entities: PropTypes.arrayOf(
    PropTypes.shape({
      uuid: PropTypes.string.isRequired,
    })
  ),
  roles: PropTypes.arrayOf(
    PropTypes.shape({
      uuid: PropTypes.string.isRequired,
    })
  ),
})

export default userPropTypes
