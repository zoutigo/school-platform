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

function TinyTexteEditor({ onChange, value, height }) {
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
          menubar: false,
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

          plugins:
            'textcolor  importcss autolink directionality  image link  hr pagebreak nonbreaking anchor  advlist wordcount imagetools textpattern noneditable charmap  emoticons',
          toolbar:
            'bold italic underline strikethrough | forecolor backcolor fontselect fontsizeselect formatselect  removeformat | alignleft aligncenter alignright alignjustify | outdent indent | pagebreak | emoticons | insertfile image  link ',
          toolbar_sticky: true,
          content_style:
            "@import url('https://fonts.googleapis.com/css2?family=Comfortaa:wght@300;400;500;600;700&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,700;1,800;1,900&family=Swanky+and+Moo+Moo&display=swap');body { font-family: Comfortaa; font-size:14px } p { margin: 16px 0; } img { padding: 5px; display: inline }",
          image_class_list: [{ title: 'Responsive', value: 'img-responsive' }],
        }}
      />
    </StyledEditorGrid>
  )
}

TinyTexteEditor.defaultProps = {
  height: 350,
}

TinyTexteEditor.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  height: PropTypes.number,
}

export default TinyTexteEditor
