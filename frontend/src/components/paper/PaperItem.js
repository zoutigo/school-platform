import { useSelector } from 'react-redux'
import { styled, Grid, Collapse } from '@material-ui/core'
import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import PaperItemHeader from './PaperItemHeader'
import PaperItemFooter from './PaperItemFooter'
import PaperItemBody from './PaperItemBody'
import paperProptypes from '../../constants/proytypes/paperProptypes'

const StyledPaperItemGrid = styled(Grid)(() => ({
  boxShadow: `rgba(0, 0, 0, 0.35) 0px 5px 15px`,
  marginBottom: '1rem',
  padding: '0.1rem 0.5rem',
  borderRadius: '6px',
}))

function PaperItem({
  paperItem,
  paper,
  setShowPaperForm,
  setShowPaperList,
  setCurrentDocument,
  currentDocument,
  setFormAction,
  setShowSearch,
}) {
  const { uuid, content, files } = paperItem
  const { URL_PREFIX } = useSelector((state) => state.settings)

  const transformedFiles = useCallback(
    files && files.length > 0
      ? files.map((file) => ({
          filepath: `${URL_PREFIX}/${file.filepath}`,
          filename: file.filename,
          filetype: file.filetype,
          uuid: file.uuid,
        }))
      : [],
    [files, URL_PREFIX]
  )
  if (!paperItem)
    return (
      <Grid item container>
        <PaperItemHeader
          setCurrentDocument={setCurrentDocument}
          currentDocumentUuid={currentDocument ? currentDocument.uuid : null}
          paperItem={paperItem}
          paper={paper}
        />
      </Grid>
    )

  return (
    <StyledPaperItemGrid item container>
      <PaperItemHeader
        setCurrentDocument={setCurrentDocument}
        currentDocumentUuid={currentDocument?.uuid}
        paperItem={paperItem}
        paper={paper}
      />
      <Grid item container>
        <Collapse in={currentDocument ? currentDocument.uuid === uuid : false}>
          <PaperItemBody
            content={content}
            files={transformedFiles}
            paper={paper}
          />
          <PaperItemFooter
            paper={paper}
            paperItem={paperItem}
            setShowPaperForm={setShowPaperForm}
            setShowPaperList={setShowPaperList}
            setCurrentDocument={setCurrentDocument}
            currentDocument={currentDocument}
            setFormAction={setFormAction}
            setShowSearch={setShowSearch}
            files={files}
          />
        </Collapse>
      </Grid>
    </StyledPaperItemGrid>
  )
}

PaperItem.defaultProps = {
  currentDocument: null,
  paperItem: null,
}

PaperItem.propTypes = {
  paper: PropTypes.shape({
    queryKey: PropTypes.arrayOf(PropTypes.string).isRequired,
    queryParams: PropTypes.string,
    paperName: PropTypes.string.isRequired,
    paperFormat: PropTypes.string.isRequired,
    paperType: PropTypes.string.isRequired,
    entityAlias: PropTypes.string.isRequired,
    isAllowedToChange: PropTypes.bool.isRequired,
  }).isRequired,
  setShowPaperForm: PropTypes.func.isRequired,
  setShowPaperList: PropTypes.func.isRequired,
  setCurrentDocument: PropTypes.func.isRequired,
  currentDocument: paperProptypes,
  setFormAction: PropTypes.func.isRequired,
  setShowSearch: PropTypes.func.isRequired,
  paperItem: paperProptypes,
}

export default React.memo(PaperItem)
