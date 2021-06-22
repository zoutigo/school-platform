import { Grid, styled } from '@material-ui/core'
import React from 'react'
import PropTypes from 'prop-types'
import ReactHtmlParser from 'react-html-parser'

const StyledClassroomContainer = styled(Grid)(() => ({
  padding: '0.1em !important',
}))
const StyledImageContainer = styled(Grid)(() => ({
  '& img': {
    width: '100%',
    maxHeight: '70vh',
    objectFit: 'cover',
  },
  padding: '0.5em !important',
}))
const StyledTextContainer = styled('div')(() => ({
  padding: '0.5em',
  background: 'whitesmoke',
}))

function ClassroomSummary({ image, text, alias }) {
  return (
    <StyledClassroomContainer item container>
      <StyledImageContainer item container>
        {image && <img src={image} alt={alias} />}
      </StyledImageContainer>

      <Grid item>
        <StyledTextContainer>{ReactHtmlParser(text)}</StyledTextContainer>
      </Grid>
    </StyledClassroomContainer>
  )
}
ClassroomSummary.defaultProps = {
  image: null,
}

ClassroomSummary.propTypes = {
  text: PropTypes.string.isRequired,
  alias: PropTypes.string.isRequired,
  image: PropTypes.string,
}

export default ClassroomSummary
