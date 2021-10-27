import { styled } from '@material-ui/styles'
import { Grid } from '@material-ui/core'

const StyledParametresGrid = styled(Grid)(({ theme }) => ({
  border: `solid 1px ${theme.palette.secondary.main}`,
  padding: '0.5rem',
  borderRadius: '5px',
  marginBottom: '0.5rem',
  '& >:first-child': {
    background: theme.palette.secondary.light,
    '& .title': {
      cursor: 'pointer',
      padding: '0px 0.5rem',
      '& :hover': {
        opacity: '0.2',
      },
    },
  },
}))

export default StyledParametresGrid
