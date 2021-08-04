import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Typography } from '@material-ui/core'
import Dialog from '@material-ui/core/Dialog'
import Slide from '@material-ui/core/Slide'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import { styled } from '@material-ui/styles'
import DialogTitle from '@material-ui/core/DialogTitle'
import { openSmallScreenNav } from '../../redux/settings/SettingsActions'
import { useRigths, useRoutesInfos } from '../../utils/hooks'
import { StyledNavLink } from './styled'

const RubricTypo = styled(Typography)(({ theme }) => ({
  background: theme.palette.primary.light,
  fontWeight: 'bolder',
}))
const CategoryTypo = styled(Typography)(({ theme }) => ({
  lineHeight: '3rem',
}))
const ChapterTypo = styled(Typography)(({ theme }) => ({
  lineHeight: '3rem',
}))
const StyledButton = styled(Button)(({ theme }) => ({
  width: '100%',
  textTransform: 'uppercase',
  height: '100%',
  background: theme.palette.error.light,
}))

const StyledDialog = styled(Dialog)(() => ({}))
const StyledDialogTitle = styled(DialogTitle)(({ theme }) => ({
  background: theme.palette.primary.main,
}))
const StyledDialogContent = styled(DialogContent)(({ theme }) => ({
  background: 'whitesmoke',
  paddingLeft: '0.5rem',
  '& .rubric': {
    padding: '0.2rem 0px',
    borderBottom: `solid 1px ${theme.palette.secondary.light}`,
  },
}))
const StyledDialogActions = styled(DialogActions)(({ theme }) => ({
  background: 'whitesmoke',
  height: '3rem',
}))
const StyledCategory = styled('div')(({ theme }) => ({
  padding: '0.5rem 0px 0.5rem 2rem',
}))
const StyledChapter = styled('div')(({ theme }) => ({
  padding: '0.5rem 0px 0.5rem 3rem',
  marginTop: '0.5rem',
}))

const Transition = React.forwardRef((props, ref) => (
  <Slide direction="up" ref={ref} {...props} />
))

const Chapter = React.memo(({ chapter }) => (
  <StyledChapter>
    <StyledNavLink
      to={{
        pathname: chapter.path,
        state: chapter.state,
      }}
    >
      <ChapterTypo variant="body1">{chapter.state.name}</ChapterTypo>
    </StyledNavLink>
  </StyledChapter>
))

Chapter.propTypes = {
  chapter: PropTypes.shape({
    path: PropTypes.string,
    state: PropTypes.shape({
      name: PropTypes.string,
    }),
  }).isRequired,
}

const Category = React.memo(({ category }) => {
  const {
    path: categoryPath,
    state: categoryState,
    routes: chapters,
  } = category

  return (
    <StyledCategory>
      <StyledNavLink
        to={{
          pathname: categoryPath,
          state: categoryState,
        }}
      >
        <CategoryTypo variant="body1">{categoryState.name}</CategoryTypo>
      </StyledNavLink>
      {chapters &&
        chapters.map((chapter) => (
          <Chapter key={chapter.path} chapter={chapter} />
        ))}
    </StyledCategory>
  )
})
Category.propTypes = {
  category: PropTypes.shape({
    path: PropTypes.string,
    state: PropTypes.shape({
      name: PropTypes.string,
    }),
    routes: PropTypes.arrayOf(
      PropTypes.shape({
        path: PropTypes.string,
        state: PropTypes.shape({
          name: PropTypes.string,
        }),
      })
    ),
  }).isRequired,
}

function ModalNavigation() {
  const dispatch = useDispatch()
  const { rubricsList } = useRoutesInfos()
  const { SmallScreenNavIsOpened } = useSelector((state) => state.settings)
  const { userLevel } = useRigths()

  const rubrics = useCallback(
    rubricsList.map(({ path, state, routes }) => ({ path, state, routes })),
    [rubricsList]
  )

  const filteredRubrics = useCallback(() => {
    const userExclusions = ['login', 'register']
    const visitorExclusions = ['private']
    const filtered = userLevel
      ? rubrics.filter((rubric) => !userExclusions.includes(rubric.state.alias))
      : rubrics.filter(
          (rubric) => !visitorExclusions.includes(rubric.state.alias)
        )

    return filtered
  }, [rubrics])

  const handleClose = useCallback(() => {
    dispatch(openSmallScreenNav(false))
  }, [])

  return (
    <StyledDialog
      fullScreen
      scroll="paper"
      open={SmallScreenNavIsOpened}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      <StyledDialogTitle id="alert-dialog-slide-title">
        Où souhaitez vous aller ?
      </StyledDialogTitle>
      <StyledDialogContent dividers>
        {filteredRubrics().map((rubric) => (
          <div className="rubric">
            <StyledNavLink
              to={{
                pathname: rubric.path,
                state: rubric.state,
              }}
              onClick={handleClose}
            >
              <RubricTypo variant="h3">
                {' '}
                &nbsp;&nbsp;{rubric.state.name}
              </RubricTypo>
            </StyledNavLink>

            <StyledCategory>
              {rubric.routes &&
                rubric.routes.map((category) => (
                  <Category key={category.path} category={category} />
                ))}
            </StyledCategory>
          </div>
        ))}
      </StyledDialogContent>
      <StyledDialogActions>
        {/* <CustomButton width="100%" action="cancel" text="FERMER" /> */}
        <StyledButton onClick={handleClose}>
          <Typography variant="button">Fermer</Typography>
        </StyledButton>
      </StyledDialogActions>
    </StyledDialog>
  )
}

export default React.memo(ModalNavigation)
