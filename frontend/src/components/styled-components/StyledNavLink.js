import { styled } from '@material-ui/styles'
import { NavLink } from 'react-router-dom'

const StyledNavLink = styled(NavLink)(({ theme }) => ({
  color: 'inherit',
  textDecoration: 'inherit',
  '& span': {
    color: theme.palette.primary.main,
  },
}))

export default StyledNavLink
