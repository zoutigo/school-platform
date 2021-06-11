import { Icon, styled, Typography } from '@material-ui/core'
import React from 'react'
import { withTheme } from '@material-ui/styles'
import PropTypes from 'prop-types'
import { StyledBaseButton } from './styled'

const StyledCustomButton = withTheme(
  styled(({ width, bgcolor, ...rest }) => <StyledBaseButton {...rest} />)({
    width: ({ width }) => width || '11rem',
    background: ({ bgcolor }) => bgcolor || 'red',
    radius: '5px',
    // '& *': {
    //   marginLeft: '2rem',
    // },
    // '& >svg': {
    //   fontSize: '3em',
    // },
  })
)
const StyledIconDiv = withTheme(
  styled(({ text, bgcolor, ...rest }) => <div {...rest} />)({
    width: ({ text }) => (text ? '20%' : '100%'),
    '& >svg': {
      fontSize: '3rem',
    },
  })
)

function CustomButton({ text, width, bgcolor, action, ...rest }) {
  const faicon = (type) => {
    switch (type) {
      case 'back':
        return 'fa fa-arrow-circle-left'
      case 'post':
        return 'fa fa-paper-plane'

      default:
        return 'fa fa-bell'
    }
  }

  return (
    <StyledCustomButton
      variant="outlined"
      type="button"
      width={width}
      bgcolor={bgcolor}
      {...rest}
    >
      <StyledIconDiv text={text}>
        <Icon className={faicon(action)} aria-hidden="true" />
      </StyledIconDiv>
      <Typography variant="button" component="span">
        {text}
      </Typography>
    </StyledCustomButton>
  )
}

CustomButton.defaultProps = {
  text: '',
  width: '250px',
  bgcolor: null,
  action: null,
}

CustomButton.propTypes = {
  text: PropTypes.string,
  width: PropTypes.string,
  bgcolor: PropTypes.string,
  action: PropTypes.string,
}

export default CustomButton