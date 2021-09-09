import { useSelector } from 'react-redux'
import { styled, Grid, Collapse } from '@material-ui/core'
import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import PaperItemHeader from './PaperItemHeader'
import PaperItemFooter from './PaperItemFooter'
import PaperItemBody from './PaperItemBody'

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
  const { id, content, files } = paperItem

  console.log('paperitem', paperItem)
  const { URL_PREFIX } = useSelector((state) => state.settings)

  const transformedFiles = useCallback(
    files && files.length > 0
      ? files.map((file) => ({
          filepath: `${URL_PREFIX}/${file.filepath}`,
          filename: file.filename,
          filetype: file.filetype,
          albumId: file.albumId,
        }))
      : [],
    [files, URL_PREFIX]
  )

  return (
    <StyledPaperItemGrid item container>
      <PaperItemHeader
        setCurrentDocument={setCurrentDocument}
        currentDocumentId={currentDocument?.id}
        paperItem={paperItem}
        paper={paper}
      />
      <Grid item container>
        <Collapse in={currentDocument ? currentDocument.id === id : false}>
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
  // paperItem: {
  //   files: [],
  //   id: null,
  //   content: null,
  //   title: null,
  // },
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
  currentDocument: PropTypes.shape({
    id: PropTypes.number,
  }),
  setFormAction: PropTypes.func.isRequired,
  setShowSearch: PropTypes.func.isRequired,
  paperItem: PropTypes.shape({
    id: PropTypes.string,
    content: PropTypes.string,
    title: PropTypes.string,
    entity: PropTypes.shape({
      name: PropTypes.string,
    }),
    files: PropTypes.arrayOf(
      PropTypes.shape({
        filename: PropTypes.string,
        filepath: PropTypes.string,
      })
    ),
    createdat: PropTypes.number,
  }).isRequired,
}

export default React.memo(PaperItem)
