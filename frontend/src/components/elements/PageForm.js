import React from 'react'
import PropTypes from 'prop-types'

function PageForm({ setShowForm }) {
  return (
    <div onClick={() => setShowForm(true)} role="presentation">
      Here is the page form
    </div>
  )
}

PageForm.propTypes = {
  setShowForm: PropTypes.func.isRequired,
}

export default PageForm
