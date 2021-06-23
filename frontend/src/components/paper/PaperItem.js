import { styled, Grid, Collapse } from '@material-ui/core'
import React from 'react'
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
  setTopAlert,
  setFormAction,
  setShowSearch,
}) {
  const { _id, text, file } = paperItem

  return (
    <StyledPaperItemGrid item container>
      <PaperItemHeader
        setCurrentDocument={setCurrentDocument}
        paperItem={paperItem}
      />
      <Grid item container>
        <Collapse in={currentDocument ? currentDocument._id === _id : false}>
          <PaperItemBody text={text} file={file} paper={paper} />
          <PaperItemFooter
            paper={paper}
            paperItem={paperItem}
            setShowPaperForm={setShowPaperForm}
            setShowPaperList={setShowPaperList}
            setCurrentDocument={setCurrentDocument}
            currentDocument={currentDocument}
            setTopAlert={setTopAlert}
            setFormAction={setFormAction}
            setShowSearch={setShowSearch}
          />
        </Collapse>
      </Grid>
    </StyledPaperItemGrid>
  )
}

PaperItem.defaultProps = null

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
    _id: PropTypes.string,
  }),
  setTopAlert: PropTypes.func.isRequired,
  setFormAction: PropTypes.func.isRequired,
  setShowSearch: PropTypes.func.isRequired,
  paperItem: PropTypes.shape({
    _id: PropTypes.string,
    text: PropTypes.string,
    title: PropTypes.string,
    file: PropTypes.string,
    entity: PropTypes.shape({
      name: PropTypes.string,
    }),
    createdat: PropTypes.number,
  }).isRequired,
}

export default PaperItem
