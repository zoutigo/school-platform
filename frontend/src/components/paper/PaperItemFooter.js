/* eslint-disable import/named */
import React, { useCallback, useState } from 'react'
import PropTypes from 'prop-types'
import { useTheme, ButtonGroup, Tooltip } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { useMutation } from 'react-query'
import HighlightOffIcon from '@material-ui/icons/HighlightOff'
import GetAppIcon from '@material-ui/icons/GetApp'
import EditIcon from '@material-ui/icons/Edit'
import { StyledPaperFooter, StyledIconButton } from '../elements/styled'
import { useUpdateMutationOptions } from '../../utils/hooks'
import ModalValidation from '../elements/ModalValidation'
import { setPaperMutateAlert } from '../../redux/alerts/AlertsActions'
import {
  errorAlertCollapse,
  successAlertCollapse,
} from '../../constants/alerts'

function PaperItemFooter({
  paperItem,
  paper,
  setShowPaperForm,
  setShowPaperList,
  files,
  setFormAction,
  setShowSearch,
}) {
  const { id: paperId } = paperItem
  const { isAllowedToChange, queryKey, poster, entityAlias } = paper
  const theme = useTheme()
  const dispatch = useDispatch()
  const [openDeleteModal, setOpenDeleteModal] = useState(false)
  const [openUpdateModal, setOpenUpdateModal] = useState(false)
  const { Token } = useSelector((state) => state.user)
  const { URL_PREFIX } = useSelector((state) => state.settings)
  useSelector((state) => state.settings)

  const { mutateAsync } = useMutation(
    poster,
    useUpdateMutationOptions(queryKey)
  )

  const mutatePaper = async () => {
    try {
      await mutateAsync({
        id: paperId,
        action: 'delete',
        Token: Token,
        body: { entityAlias },
      }).then((response) => {
        dispatch(setPaperMutateAlert(successAlertCollapse(response.message)))
      })
    } catch (err) {
      dispatch(
        setPaperMutateAlert(errorAlertCollapse(err.response.data.message))
      )
    }
  }

  const handleUpdate = () => {
    window.scrollTo(0, 0)
    setShowPaperList(false)
    setShowPaperForm(true)
    setFormAction('update')
  }

  const fileUrl = useCallback((file) => `${URL_PREFIX}/${file.filepath}`, [])

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
        {files &&
          files.map((file) => (
            <Tooltip title="Telecharger" placement="bottom" key={file.filepath}>
              <StyledIconButton bgcolor={theme.palette.secondary.main}>
                <a
                  // href={`${URL_PREFIX}/${file.filepath}`}
                  href={fileUrl(file)}
                  download
                  style={{ color: 'inherit' }}
                  target="blank"
                >
                  <GetAppIcon
                    style={{ fontSize: 'inherit', color: 'inherit' }}
                  />
                </a>
              </StyledIconButton>
            </Tooltip>
          ))}
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

PaperItemFooter.defaultProps = {
  files: null,
}

PaperItemFooter.propTypes = {
  paper: PropTypes.shape({
    queryParams: PropTypes.string.isRequired,
    queryKey: PropTypes.arrayOf(PropTypes.string),
    paperName: PropTypes.string.isRequired,
    paperFormat: PropTypes.string.isRequired,
    paperType: PropTypes.string.isRequired,
    entityAlias: PropTypes.string.isRequired,
    poster: PropTypes.func,
    isAllowedToChange: PropTypes.bool.isRequired,
  }).isRequired,
  setShowPaperForm: PropTypes.func.isRequired,
  setShowPaperList: PropTypes.func.isRequired,

  setFormAction: PropTypes.func.isRequired,
  setShowSearch: PropTypes.func.isRequired,
  paperItem: PropTypes.shape({
    id: PropTypes.string,
    text: PropTypes.string,
    title: PropTypes.string,
    entity: PropTypes.shape({
      id: PropTypes.string,
    }),
    createdat: PropTypes.number,
  }).isRequired,
  files: PropTypes.arrayOf(
    PropTypes.shape({
      filename: PropTypes.string,
      filepath: PropTypes.string,
    })
  ),
}
export default PaperItemFooter
