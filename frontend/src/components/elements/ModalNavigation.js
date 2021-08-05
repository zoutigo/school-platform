/* eslint-disable import/named */
import React, { useCallback, useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import {
  Button,
  Collapse,
  Grid,
  IconButton,
  Tooltip,
  Typography,
} from '@material-ui/core'
import ArrowDropDownTwoToneIcon from '@material-ui/icons/ArrowDropDownTwoTone'
import ArrowDropUpTwoToneIcon from '@material-ui/icons/ArrowDropUpTwoTone'
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
  // background: theme.palette.primary.light,
  fontWeight: 'bolder',
  color: theme.palette.secondary.main,
}))
const CategoryTypo = styled(Typography)(({ theme }) => ({
  lineHeight: '3rem',
  color: theme.palette.secondary.main,
}))
const ChapterTypo = styled(Typography)(({ theme }) => ({
  lineHeight: '3rem',
  textTransform: 'capitalize',
  color: theme.palette.secondary.main,
}))
const StyledButton = styled(Button)(({ theme }) => ({
  width: '100%',
  textTransform: 'uppercase',
  height: '100%',
  background: theme.palette.error.light,
}))

const StyledDialog = styled(Dialog)(() => ({}))
const StyledDialogTitle = styled(DialogTitle)(() => ({
  background: 'transparent',
}))
const StyledDialogContent = styled(DialogContent)(() => ({
  background: 'whitesmoke',
  paddingLeft: '0.6rem',
}))
const StyledDialogActions = styled(DialogActions)(() => ({
  background: 'whitesmoke',
  height: '3rem',
}))
const StyledCategory = styled(Grid)(({ theme }) => ({
  marginTop: '0.3rem',
  '& .category-text': {
    paddingLeft: '3rem',
    background: theme.palette.primary.light,
  },
}))
const StyledChapter = styled('div')(() => ({
  padding: '0.5rem 0px 0.5rem 3rem',
  marginTop: '0.5rem',
}))
const StyledRubric = styled(Grid)(({ theme }) => ({
  marginBottom: '0.5rem',

  '& :first-child': {
    '& .text': {
      paddingRight: '1rem',
      background: theme.palette.primary.main,
    },
    '& .icon': {
      border: `solid 1px ${theme.palette.secondary.light}`,
    },
  },
}))

const Transition = React.forwardRef((props, ref) => (
  <Slide direction="up" ref={ref} {...props} />
))

const Chapter = React.memo(({ chapter, handleClose }) => (
  <StyledChapter>
    <StyledNavLink
      to={{
        pathname: chapter.path,
        state: chapter.state,
      }}
      onClick={handleClose}
    >
      <ChapterTypo variant="body1">{chapter.state.name}</ChapterTypo>
    </StyledNavLink>
  </StyledChapter>
))

Chapter.propTypes = {
  handleClose: PropTypes.func.isRequired,
  chapter: PropTypes.shape({
    path: PropTypes.string,
    state: PropTypes.shape({
      name: PropTypes.string,
    }),
  }).isRequired,
}

const Category = React.memo(({ category, handleClose }) => {
  const {
    path: categoryPath,
    state: categoryState,
    routes: chapters,
  } = category

  return (
    <StyledCategory container>
      <Grid item container className="category-text">
        <StyledNavLink
          to={{
            pathname: categoryPath,
            state: categoryState,
          }}
          onClick={handleClose}
        >
          <CategoryTypo variant="body1">{categoryState.name}</CategoryTypo>
        </StyledNavLink>
      </Grid>
      <Grid item container>
        {chapters &&
          chapters.map((chapter) => (
            <Chapter
              key={chapter.path}
              chapter={chapter}
              handleClose={handleClose}
            />
          ))}
      </Grid>
    </StyledCategory>
  )
})
Category.propTypes = {
  handleClose: PropTypes.func.isRequired,
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

const Rubric = React.memo(({ rubric, handleClose }) => {
  const [showRubric, setShowRubric] = useState(false)
  const toggle = useCallback(() => {
    setShowRubric(!showRubric)
  }, [showRubric])

  return (
    <StyledRubric container>
      <Grid item container>
        <Grid item xs={10} sm={10} className="text">
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
        </Grid>
        <Grid
          item
          xs={2}
          sm={2}
          style={{ textAlign: 'center' }}
          className="icon"
        >
          <Tooltip title={showRubric ? 'fermer' : 'ouvrir'}>
            <IconButton
              aria-label={showRubric ? 'fermer' : 'ouvrir'}
              onClick={toggle}
            >
              {showRubric ? (
                <ArrowDropUpTwoToneIcon />
              ) : (
                <ArrowDropDownTwoToneIcon />
              )}
            </IconButton>
          </Tooltip>
        </Grid>
      </Grid>
      <Collapse in={showRubric}>
        <Grid container>
          {rubric.routes &&
            rubric.routes.map((category) => (
              <Category
                key={category.path}
                category={category}
                handleClose={handleClose}
              />
            ))}
        </Grid>
      </Collapse>
    </StyledRubric>
  )
})

Rubric.propTypes = {
  handleClose: PropTypes.func.isRequired,
  rubric: PropTypes.shape({
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
        routes: PropTypes.arrayOf(
          PropTypes.shape({
            path: PropTypes.string,
            state: PropTypes.shape({
              name: PropTypes.string,
            }),
          })
        ),
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
          <Rubric rubric={rubric} handleClose={handleClose} key={rubric.path} />
        ))}
      </StyledDialogContent>
      <StyledDialogActions>
        <StyledButton onClick={handleClose}>
          <Typography variant="button">Fermer</Typography>
        </StyledButton>
      </StyledDialogActions>
    </StyledDialog>
  )
}

export default React.memo(ModalNavigation)
