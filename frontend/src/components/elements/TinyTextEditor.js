import React from 'react'
import { Editor } from '@tinymce/tinymce-react'
import PropTypes from 'prop-types'
import { StyledEditorGrid } from './styled'

function TinyTextEditor({ onChange, value }) {
  return (
    <StyledEditorGrid item container>
      <Editor
        value={value}
        onEditorChange={(editor) => {
          onChange(editor)
        }}
        apiKey={process.env.REACT_APP_TINYMCE_KEY}
        cloudChannel="dev"
        init={{
          branding: false,
          selector: 'textarea',
          forced_root_block: 'div',
          browser_spellcheck: true,
          textcolor_cols: '5',
          textcolor_rows: '4',
          height: 200,
          plugins:
            'print preview paste importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern noneditable help charmap  emoticons',
          toolbar:
            'undo redo | bold italic underline strikethrough | forecolor backcolor fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile image media template link anchor codesample | ltr rtl',
          toolbar_sticky: true,
          content_style:
            'body { font-family:Helvetica,Arial,sans-serif; font-size:18px ; z-index:1000 }',
          image_class_list: [{ title: 'Responsive', value: 'img-responsive' }],
        }}
      />
    </StyledEditorGrid>
  )
}

TinyTextEditor.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
}

export default TinyTextEditor
