import React from 'react'
import PropTypes from 'prop-types'
import { Grid } from '@material-ui/core'
import { useQuery } from 'react-query'
import { Editor } from '@tinymce/tinymce-react'
import tinyMceColors from '../../constants/tinyMceColors'
import { StyledEditorGrid } from './styled'
import { apiFetchVariables } from '../../utils/api'
import AlertCollapse from './AlertCollapse'

const LOCALHOST = 'http://localhost:3500'

const PREFIX = process.env.NODE_ENV === 'production' ? '' : LOCALHOST
const URL = `${PREFIX}/images/tinymce`

function TinyPageEditor({ onChange, value, height }) {
  const handleEditorChange = (editor) => onChange(editor)

  const { isLoading, isError, data, error } = useQuery(['TinyPageKey'], () =>
    apiFetchVariables()
  )

  if (isError)
    return (
      <Grid item container>
        <AlertCollapse
          alertText={error.response.message}
          openAlert
          severity="error"
        />
      </Grid>
    )
  if (isLoading)
    return (
      <Grid item container>
        <AlertCollapse
          alertText="Telechargement ..."
          openAlert
          severity="warning"
        />
      </Grid>
    )

  return (
    <StyledEditorGrid item container>
      <Editor
        value={value}
        onEditorChange={handleEditorChange}
        apiKey={data ? data.TINYMCE_KEY : null}
        cloudChannel="dev"
        init={{
          branding: false,
          selector: 'textarea',
          forced_root_block: '',
          browser_spellcheck: true,
          textcolor_cols: '6',
          textcolor_rows: '5',
          textcolor_map: tinyMceColors,
          images_upload_url: URL,
          height: height,
          force_br_newlines: true,
          force_p_newlines: false,
          image_caption: true,

          font_formats:
            'Andale Mono=andale mono,times; Arial=arial,helvetica,sans-serif; Arial Black=arial black,avant garde; Book Antiqua=book antiqua,palatino; Comic Sans MS=comic sans ms,sans-serif; Courier New=courier new,courier; Georgia=georgia,palatino; Helvetica=helvetica; Tahoma=tahoma,arial,helvetica,sans-serif',
          plugins:
            'textcolor print preview paste importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern noneditable help charmap  emoticons',
          toolbar:
            'undo redo | bold italic underline strikethrough | forecolor backcolor fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile image media template link anchor codesample ',
          toolbar_sticky: true,
          content_style:
            "@import url('https://fonts.googleapis.com/css2?family=Comfortaa:wght@300;400;500;600;700&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,700;1,800;1,900&family=Swanky+and+Moo+Moo&display=swap');body { font-family: Comfortaa; } p { margin: 16px 0; } img { padding: 5px; display: inline }",
          image_class_list: [{ title: 'Responsive', value: 'img-responsive' }],
        }}
      />
    </StyledEditorGrid>
  )
}

TinyPageEditor.defaultProps = {
  height: 350,
}

TinyPageEditor.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  height: PropTypes.number,
}

export default TinyPageEditor
