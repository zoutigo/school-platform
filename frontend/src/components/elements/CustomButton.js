import { Icon, styled, Typography } from '@material-ui/core'
import React from 'react'
import { withTheme } from '@material-ui/styles'
import PropTypes from 'prop-types'
import { StyledBaseButton } from './styled'

const StyledCustomButton = withTheme(
  styled(({ width, bgcolor, ...rest }) => <StyledBaseButton {...rest} />)({
    width: ({ width }) => (width === '100%' ? '99%' : width || '11rem'),
    background: ({ bgcolor }) => bgcolor || 'red',
    radius: '5px',
    display: 'flex',
  })
)
const StyledIconDiv = withTheme(
  styled(({ text, bgcolor, ...rest }) => <div {...rest} />)({
    width: ({ text }) => (text ? '20%' : '90%'),
    flex: 1,
    '& >svg': {
      fontSize: '3rem',
    },
  })
)

const StyledTextDiv = styled('div')(() => ({
  flex: 8,
}))

function CustomButton({ text, width, bgcolor, action, ...rest }) {
  const faicon = (type) => {
    switch (type) {
      case 'back':
        return 'fa fa-arrow-circle-left'
      case 'post':
        return 'fa fa-paper-plane'
      case 'cancel':
        return 'fa fa-times'
      case 'confirm':
        return 'fa fa-check-circle'
      case 'toggle':
        return 'fa fa-sort'
      case 'search':
        return 'fa fa-search'

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
      <StyledTextDiv>
        <Typography variant="button" component="span">
          {text}
        </Typography>
      </StyledTextDiv>
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
