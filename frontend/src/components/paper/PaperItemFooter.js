import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useTheme, ButtonGroup, Tooltip } from '@material-ui/core'
import { useSelector } from 'react-redux'
import { useMutation } from 'react-query'
import HighlightOffIcon from '@material-ui/icons/HighlightOff'
import GetAppIcon from '@material-ui/icons/GetApp'
import EditIcon from '@material-ui/icons/Edit'
import { StyledPaperFooter, StyledIconButton } from '../elements/styled'
import { apiPostPaper } from '../../utils/api'
import { useUpdateMutationOptions } from '../../utils/hooks'
import ModalValidation from '../elements/ModalValidation'

function PaperItemFooter({
  paperItem,
  paper,
  setShowPaperForm,
  setShowPaperList,
  setTopAlert,
  setFormAction,
  setShowSearch,
}) {
  const { _id: paperId, file } = paperItem
  const { isAllowedToChange, queryKey } = paper
  const theme = useTheme()
  const [openDeleteModal, setOpenDeleteModal] = useState(false)
  const [openUpdateModal, setOpenUpdateModal] = useState(false)

  const { Token } = useSelector((state) => state.user)
  useSelector((state) => state.settings)

  const { mutateAsync } = useMutation(
    apiPostPaper,
    useUpdateMutationOptions(queryKey)
  )

  const mutatePaper = async () => {
    const options = {
      headers: { 'x-access-token': Token },
    }
    try {
      await mutateAsync({
        id: paperId,
        action: 'delete',
        options: options,
      })
    } catch (err) {
      setTopAlert({
        openAlert: true,
        severity: 'error',
        alertText: err.message,
      })
    }
  }

  const handleUpdate = () => {
    setShowPaperList(false)
    setShowPaperForm(true)
    setFormAction('update')
  }

  return (
    <StyledPaperFooter item container>
      <ModalValidation
        modaltype="delete"
        open={openDeleteModal}
        setOpen={setOpenDeleteModal}
        callback={mutatePaper}
      />
      <ModalValidation
        modaltype="update"
        open={openUpdateModal}
        setOpen={setOpenUpdateModal}
        callback={handleUpdate}
      />

      <ButtonGroup>
        {file && (
          <Tooltip title="Telecharger" placement="bottom">
            <StyledIconButton bgcolor={theme.palette.secondary.main}>
              <a href={file} download style={{ color: 'inherit' }}>
                <GetAppIcon style={{ fontSize: 'inherit', color: 'inherit' }} />
              </a>
            </StyledIconButton>
          </Tooltip>
        )}
        {isAllowedToChange && (
          <Tooltip title="Modifier" placement="bottom">
            <StyledIconButton
              bgcolor={theme.palette.warning.main}
              onClick={() => setOpenUpdateModal(true)}
            >
              <EditIcon style={{ fontSize: 'inherit', color: 'inherit' }} />
            </StyledIconButton>
          </Tooltip>
        )}
        {isAllowedToChange && (
          <Tooltip title="Supprimer" placement="bottom">
            <StyledIconButton
              bgcolor={theme.palette.error.main}
              onClick={() => setOpenDeleteModal(true)}
            >
              <HighlightOffIcon
                style={{ fontSize: 'inherit', color: 'inherit' }}
              />
            </StyledIconButton>
          </Tooltip>
        )}
      </ButtonGroup>
    </StyledPaperFooter>
  )
}

PaperItemFooter.propTypes = {
  paper: PropTypes.shape({
    queryParams: PropTypes.string.isRequired,
    queryKey: PropTypes.arrayOf(PropTypes.string),
    paperName: PropTypes.string.isRequired,
    paperFormat: PropTypes.string.isRequired,
    paperType: PropTypes.string.isRequired,
    entityAlias: PropTypes.string.isRequired,
    isAllowedToChange: PropTypes.bool.isRequired,
  }).isRequired,
  setShowPaperForm: PropTypes.func.isRequired,
  setShowPaperList: PropTypes.func.isRequired,

  setTopAlert: PropTypes.func.isRequired,
  setFormAction: PropTypes.func.isRequired,
  setShowSearch: PropTypes.func.isRequired,
  paperItem: PropTypes.shape({
    _id: PropTypes.string,
    text: PropTypes.string,
    title: PropTypes.string,
    entity: PropTypes.string,
    createdat: PropTypes.number,
    file: PropTypes.string,
  }).isRequired,
}
export default PaperItemFooter
