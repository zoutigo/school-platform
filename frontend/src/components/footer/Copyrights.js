import { Box, styled, Typography } from '@material-ui/core'
import React from 'react'

const StyledContainer = styled(Box)(() => ({
  '& div': {
    display: 'inline-block ',
    marginRight: '2rem',
  },
}))

function Copyrights() {
  return (
    <StyledContainer>
      <Box>
        <Typography variant="caption">
          Copyright ©Ecole Saint Augustin 2021.
        </Typography>
      </Box>
      <Box>
        <Typography variant="caption">Tous droits réservés.</Typography>
      </Box>
      <Box>
        <Typography variant="caption">Conception bénévole.</Typography>
      </Box>
    </StyledContainer>
  )
}

export default Copyrights
