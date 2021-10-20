import { styled } from '@material-ui/styles'
import { Button } from '@material-ui/core'

const StyledBasicButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(1),
  height: '3rem',
}))

export default StyledBasicButton
