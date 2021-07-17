import {
  Chip,
  Collapse,
  Grid,
  styled,
  Typography,
  useMediaQuery,
} from '@material-ui/core'
import FaceIcon from '@material-ui/icons/Face'
import SwapVerticalCircleIcon from '@material-ui/icons/SwapVerticalCircle'
import React from 'react'
import { useTheme, withTheme } from '@material-ui/styles'

import { StyledHomeGrid } from '../../elements/styled'
import Title from '../../elements/Title'

const zeroPara = `
  Bienveillance et entraide. Un projet que l'ensemble de l'équipe éducative installe au coeur de l'école.
  `
const firstPara = `
  L'école St Augustin, école catholique sous contrat d'association
  avec l'état, se situe au coeur de Crémieu, cité médiévale iséroise,
  à une cinquantaine de kilomètres au sud-est de Lyon.
  `
const secondPara = `
  Toute l'équipe pédagogique a à coeur un encadrement et un
  enseignement prenant en compte chaque enfant : ateliers,
  décloisonnements, différenciations (aides pédagogiques, bilans
  pédagogiques, conseils, contrats, groupes de travail, soutien,
  partenariat avec les parents ...).`

const thirdPara = `
  Je vous invite à découvrir les 8 classes de l'établissement (3 classes de maternelle et 5 classes de primaire) avec ce que vivent
  ses 218 élèves, son équipe éducative, comprendre sa politique et son
  organisation avec ses projets, son OGEC, son APEL...`

const onText = `Compris. Je ferme.`
const offText = `Le mot du Directeur.`

const StyledParagraph = styled(Typography)(() => ({
  margin: '1em 0px',
}))

const StyledIntroductionContainer = styled(StyledHomeGrid)(({ theme }) => ({
  background: theme.palette.secondary.main,
  '& >div:last-child': {
    textAlign: 'right',
    color: theme.palette.primary.main,
  },
}))

const StyledTitleBloc = styled(Grid)(() => ({
  textAlign: 'justify',
}))
const StyledParagraphsBloc = styled(Grid)(() => ({}))

const TextBloc = styled(Grid)(() => ({
  color: 'white',
  textAlign: 'justify',
}))

const SignatureBloc = styled(Grid)(({ theme }) => ({
  color: theme.palette.primary.main,
}))

const StyledChipContainer = withTheme(
  styled(({ clicked, theme, ...rest }) => <Grid {...rest} />)({
    paddingTop: '1rem !important',
    '& .MuiChip-root': {
      width: '200px',
    },
    '& .MuiChip-icon': {
      marginRight: '0.5rem !important',
    },
    '& .MuiChip-deleteIcon': {
      marginLeft: '0.5rem',
      color: ({ clicked, theme: { palette } }) =>
        clicked ? palette.error.main : palette.success.main,
    },
    '& .MuiChip-clickableColorPrimary': {
      color: ({ theme: { palette } }) => palette.secondary.main,
    },
  })
)

function Introduction() {
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.up('sm'))

  const [checked, setChecked] = React.useState(false)
  const [buttonText, setButtonText] = React.useState(offText)

  const handleClick = () => {
    setChecked((prev) => !prev)
  }

  React.useEffect(() => {
    if (checked) {
      setButtonText(onText)
    }
    return () => {
      setButtonText(offText)
    }
  }, [checked])

  return (
    <StyledIntroductionContainer container>
      <StyledTitleBloc item container>
        <Title
          title={"L'Ecole Saint Augustin vous souhaite la bienvenue !"}
          textcolor={theme.palette.primary.main}
        />
      </StyledTitleBloc>
      <StyledChipContainer item container justify="flex-end" clicked={checked}>
        {!matches && (
          <Chip
            icon={<FaceIcon />}
            label={buttonText}
            clickable
            color="primary"
            onClick={handleClick}
            onDelete={handleClick}
            deleteIcon={<SwapVerticalCircleIcon />}
          />
        )}
      </StyledChipContainer>
      <Collapse in={checked || matches}>
        <StyledParagraphsBloc item container>
          <TextBloc item>
            <StyledParagraph variant="body1">{zeroPara}</StyledParagraph>
            <StyledParagraph variant="body1">{firstPara}</StyledParagraph>
            <StyledParagraph variant="body1">{secondPara}</StyledParagraph>
            <StyledParagraph variant="body1">{thirdPara}</StyledParagraph>
          </TextBloc>
          <SignatureBloc item container justify="flex-end">
            <StyledParagraph variant="subtitle1">
              Frédéric CINTAS , le directeur.
            </StyledParagraph>
          </SignatureBloc>
        </StyledParagraphsBloc>
      </Collapse>
    </StyledIntroductionContainer>
  )
}

export default Introduction
