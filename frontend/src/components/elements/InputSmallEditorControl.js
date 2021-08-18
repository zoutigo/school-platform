import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useQuery } from 'react-query'
import { Editor } from '@tinymce/tinymce-react'
import { useController, Controller } from 'react-hook-form'
import PropTypes from 'prop-types'
import { Grid, styled, Collapse } from '@material-ui/core'
import { apiFetchVariables } from '../../utils/api'
import tinyMceColors from '../../constants/tinyMceColors'
import AlertCollapse from './AlertCollapse'
import { StyledAlert } from './styled'

const StyledGrid = styled(Grid)(() => ({
  margin: '1rem 0px',
  padding: '0px 1rem',
}))
const StyledLabel = styled(Grid)(({ theme }) => ({
  color: theme.palette.secondary.main,
  fontSize: '0.8rem',
  margin: '1rem 0px',
}))

function InputSmallEditorControl({
  control,
  name,
  height,
  initialValue,
  label,
  ...rest
}) {
  const [alert, setAlert] = useState({
    alertText: 'null',
    severity: 'error',
    openAlert: false,
  })
  const [tinyKey, setTinyKey] = useState(null)
  const {
    field,
    fieldState: { invalid, error: formerror },
  } = useController({
    name,
    control,
    defaultValue: initialValue,
    rules: { required: false },
  })

  const { ref, onChange, value, ...inputProps } = field

  const { URL_PREFIX } = useSelector((state) => state.settings)
  const URL = `${URL_PREFIX}/images/tinymce`

  const { isLoading, isError, data, error } = useQuery(['TinyPageKey'], () =>
    apiFetchVariables()
  )

  useEffect(() => {
    if (isLoading) {
      setAlert({
        alertText: 'Telechargement de la clé ....',
        severity: 'warning',
        openAlert: true,
      })
    }
    if (isError) {
      setAlert({
        alertText: error.data.message,
        severity: 'error',
        openAlert: true,
      })
    }
    if (data) {
      setTinyKey(data.TINYMCE_KEY)
      setAlert({
        alertText: '',
        severity: 'success',
        openAlert: false,
      })
    }
    return () => {
      setAlert({
        alertText: 'null',
        severity: 'error',
        openAlert: false,
      })
      setTinyKey(null)
    }
  }, [isLoading, isError, data, error])

  return (
    <StyledGrid item container className="field">
      <Grid item container>
        <AlertCollapse {...alert} />
      </Grid>
      <StyledLabel item> {label}</StyledLabel>
      <Grid item container>
        <Controller
          {...rest}
          name="text"
          control={control}
          defaultValue=""
          render={() => (
            <Editor
              value={value}
              onEditorChange={(editor) => onChange(editor)}
              apiKey={toString(tinyKey)}
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

                font_formats: 'Comic Sans MS=comic sans ms,sans-serif',
                // plugins:
                //   'textcolor preview paste importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media template table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern noneditable help charmap  emoticons',
                toolbar:
                  'undo redo | bold italic underline strikethrough | forecolor backcolor| alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | pagebreak |  emoticons | fullscreen  preview | insertfile image  link ',
                toolbar_sticky: true,
                content_style:
                  "@import url('https://fonts.googleapis.com/css2?family=Comfortaa:wght@300;400;500;600;700&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,700;1,800;1,900&family=Swanky+and+Moo+Moo&display=swap');body { font-family: Comfortaa; } p { margin: 16px 0; } img { padding: 5px; display: inline }",
                image_class_list: [
                  { title: 'Responsive', value: 'img-responsive' },
                ],
              }}
            />
          )}
        />
      </Grid>
      <Collapse in={invalid}>
        <Grid item container>
          <StyledAlert severity="error">
            {formerror && formerror.message}
          </StyledAlert>
        </Grid>
      </Collapse>
    </StyledGrid>
  )
}

InputSmallEditorControl.defaultProps = {
  initialValue: null,
  height: 300,
}
InputSmallEditorControl.propTypes = {
  name: PropTypes.string.isRequired,
  /* eslint-disable-line*/
  control: PropTypes.shape({
    updateIsValid: PropTypes.func,
  }).isRequired,
  initialValue: PropTypes.string,
  height: PropTypes.number,
  label: PropTypes.string.isRequired,
}

export default InputSmallEditorControl
