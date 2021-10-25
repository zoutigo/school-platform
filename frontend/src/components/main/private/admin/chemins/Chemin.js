/* eslint-disable import/named */
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useSnackbar } from 'notistack'
import { Grid, Collapse, styled } from '@material-ui/core'
import { useSelector } from 'react-redux'
import EditIcon from '@material-ui/icons/Edit'
import Fab from '@material-ui/core/Fab'
import DeleteIcon from '@material-ui/icons/Delete'
import VisibilityIcon from '@material-ui/icons/Visibility'
import Tooltip from '@material-ui/core/Tooltip'
import ReactHtmlParser from 'react-html-parser'
import { apiPostChemin } from '../../../../../utils/api'
import CheminForm from './CheminForm'
import useMutate from '../../../../hooks/useMutate'
import MutateCircularProgress from '../../../../elements/MutateCircularProgress'
import getError from '../../../../../utils/getError'
import getResponse from '../../../../../utils/getResponse'

const StyledDeleteFab = styled(Fab)(({ theme }) => ({
  margin: theme.spacing(1),
  color: theme.palette.error.main,
}))
const StyledEditFab = styled(Fab)(({ theme }) => ({
  margin: theme.spacing(1),
  background: theme.palette.secondary.light,
  color: 'white',
}))
const StyledViewFab = styled(Fab)(({ theme }) => ({
  margin: theme.spacing(1),
  background: theme.palette.info.light,
  color: 'white',
}))
const StyledGrid = styled(Grid)(({ theme }) => ({
  margin: theme.spacing(1),
  background: 'whitesmoke',
}))

function Chemin({ chemin, queryKey, setShowAddForm }) {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()
  const { alias, filepath, description, path, _id: cheminId } = chemin
  const [showImage, setShowImage] = useState(false)
  const [showEditCheminForm, setShowEditCheminForm] = useState(false)

  const { URL_PREFIX } = useSelector((state) => state.settings)

  const { Token } = useSelector((state) => state.user)
  useSelector((state) => state.settings)

  const { mutateAsync, isMutating } = useMutate(queryKey, apiPostChemin)

  const mutateChemin = async () => {
    const options = {
      headers: { 'x-access-token': Token },
    }
    closeSnackbar()
    try {
      await mutateAsync({
        id: cheminId,
        action: 'delete',
        options: options,
      }).then((response) => {
        enqueueSnackbar(getResponse(response), { variant: 'success' })
      })
    } catch (err) {
      enqueueSnackbar(getError(err), { variant: 'error' })
    }
  }

  return (
    <StyledGrid item container>
      {isMutating && <MutateCircularProgress />}
      <Grid item container xs={9}>
        <Grid item container>
          <Grid item xs={4}>
            {alias}
          </Grid>
          <Grid item xs={8}>
            {path}
          </Grid>
        </Grid>
        <Grid item container>
          {ReactHtmlParser(description)}{' '}
        </Grid>
        <Collapse in={showImage} timeout="auto">
          <Grid item container justifyContent="center">
            <img src={`${URL_PREFIX}/${filepath}`} alt={alias} />
          </Grid>
        </Collapse>
      </Grid>
      <Grid item container xs={3} justifyContent="flex-end">
        <Tooltip
          title="View"
          aria-label="view"
          onClick={() => setShowImage(!showImage)}
        >
          <StyledViewFab>
            <VisibilityIcon />
          </StyledViewFab>
        </Tooltip>
        <Tooltip
          title="Edit"
          aria-label="Edit"
          onClick={() => setShowEditCheminForm(!showEditCheminForm)}
        >
          <StyledEditFab>
            <EditIcon />
          </StyledEditFab>
        </Tooltip>
        <Tooltip title="Delete" aria-label="delete" onClick={mutateChemin}>
          <StyledDeleteFab>
            <DeleteIcon />
          </StyledDeleteFab>
        </Tooltip>
      </Grid>
      <Collapse in={showEditCheminForm}>
        <CheminForm
          chemin={chemin}
          queryKey={queryKey}
          formAction="update"
          setShowAddForm={setShowAddForm}
        />
      </Collapse>
    </StyledGrid>
  )
}

Chemin.propTypes = {
  chemin: PropTypes.shape({
    _id: PropTypes.string,
    alias: PropTypes.string,
    filepath: PropTypes.string,
    description: PropTypes.string,
    path: PropTypes.string,
  }).isRequired,
  queryKey: PropTypes.arrayOf(PropTypes.string).isRequired,
  setShowAddForm: PropTypes.func.isRequired,
}
export default React.memo(Chemin)
