import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Grid, Collapse, styled } from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit'
import Fab from '@material-ui/core/Fab'
import DeleteIcon from '@material-ui/icons/Delete'
import VisibilityIcon from '@material-ui/icons/Visibility'
import Tooltip from '@material-ui/core/Tooltip'
import { useSelector } from 'react-redux'
import { useMutation } from 'react-query'
import { useUpdateMutationOptions } from '../../../../../utils/hooks'
import { apiPostChemin } from '../../../../../utils/api'
import AlertCollapse from '../../../../elements/AlertCollapse'
import CheminForm from './CheminForm'

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

function Chemin({ chemin, queryKey, setTopAlert, setShowAddForm }) {
  const { alias, filepath, description, path, _id: cheminId } = chemin
  const [showImage, setShowImage] = useState(false)
  const [showEditCheminForm, setShowEditCheminForm] = useState(false)
  const [alert, setAlert] = useState({
    openAlert: false,
    severity: 'error',
    alertText: '',
  })
  const { URL_PREFIX } = useSelector((state) => state.settings)

  const { Token } = useSelector((state) => state.user)
  useSelector((state) => state.settings)

  const { mutateAsync } = useMutation(
    apiPostChemin,
    useUpdateMutationOptions(queryKey)
  )

  const mutateChemin = async () => {
    const options = {
      headers: { 'x-access-token': Token },
    }
    try {
      await mutateAsync({
        id: cheminId,
        action: 'delete',
        options: options,
      }).then((response) => {
        console.log('response', response)
        setAlert({
          severity: 'success',
          alertText: response.message,
          openAlert: true,
        })
      })
    } catch (err) {
      console.log('err:', err)
      setAlert({
        openAlert: true,
        severity: 'error',
        alertText: err.message,
      })
    }
  }

  return (
    <StyledGrid item container>
      <Grid item container>
        <AlertCollapse
          openAlert={alert.openAlert}
          severity={alert.severity}
          alerttext={alert.alertText}
        />
      </Grid>
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
          {description}{' '}
        </Grid>
        <Collapse in={showImage} timeout="auto">
          <Grid item container justify="center">
            <img src={`${URL_PREFIX}/${filepath}`} alt={alias} />
          </Grid>
        </Collapse>
      </Grid>
      <Grid item container xs={3} justify="flex-end">
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
          setTopAlert={setTopAlert}
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
  setTopAlert: PropTypes.func.isRequired,
}
export default Chemin
