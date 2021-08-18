// import React from 'react'
// import { useSelector } from 'react-redux'
// import { useController, Controller } from 'react-hook-form'
// import PropTypes from 'prop-types'
// import { Grid, styled, Collapse } from '@material-ui/core'
// // import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
// import Editor from 'ckeditor5-custom-build'
// import { CKEditor } from '@ckeditor/ckeditor5-react'
// import { StyledAlert } from '../styled'
// import AlertCollapse from '../AlertCollapse'

// const StyledGrid = styled(Grid)(() => ({
//   margin: '1rem 0px',
//   padding: '0px 1rem',
// }))
// const StyledLabel = styled(Grid)(({ theme }) => ({
//   color: theme.palette.secondary.main,
//   fontSize: '0.8rem',
//   margin: '1rem 0px',
// }))

// function InputCKEditorControl({
//   control,
//   name,
//   height,
//   initialValue,
//   label,
//   ...rest
// }) {
// const {
//   field,
//   fieldState: { invalid, error: formerror },
// } = useController({
//   name,
//   control,
//   defaultValue: initialValue,
//   rules: { required: false },
// })

// const { ref, onChange, value, ...inputProps } = field
// const { URL_PREFIX, Variables } = useSelector((state) => state.settings)

//   const URL = `${URL_PREFIX}/images/tinymce`
//   const plugings = Editor.builtinPlugins.map((plugin) => plugin.pluginName)
//   console.log('plugins:', plugings)
//   const editorConfiguration = {
//     toolbar: {
//       items: [
//         'undo',
//         'redo',
//         '|',
//         'Heading',
//         // 'Paragraph',
//         '|',
//         'bold',
//         'italic',
//         'underline',
//         'link',
//         'fontFamily',
//         'fontSize',
//         '|',
//         'alignment',
//         'alignment:left',
//         'alignment:right',
//         'alignment:center',
//         'alignment:justify',
//         'bulletedList',
//         'numberedList',
//         'blockQuote',
//         '|',
//         'Image',
//         'ImageToolbar',
//         'ImageUpload',
//         'imageResize',
//         'imageStyle:alignLeft',
//         'imageStyle:alignRight',
//         'imageStyle:wrapText',
//         // 'imageStyle:breakText',
//         '|',
//         'removeFormat',
//         'pageBreak',
//       ],
//     },
//     alignment: {
//       options: ['left', 'right', 'center', 'justify'],
//     },
//     placeholder: 'Ecrire ici...',
//     plugings: plugings,

//     ckfinder: {
//       uploadUrl: URL,
//       // withCredentials: true,
//     },
//     // fontSize: {
//     //   options: ['1rem', '1.5rem', '2rem', '2.5rem', '3rem'],
//     // },
//     fontFamily: {
//       options: ['comfortaa', 'cursive'],
//     },
//     image: {
//       styles: {
//         options: ['alignLeft', 'alignRight'],
//       },
//     },
//   }

//   // console.log(plugings)
//   return (
//     <StyledGrid item container className="field">
//       <Grid item container>
//         <AlertCollapse {...alert} />
//       </Grid>
//       <StyledLabel item> {label}</StyledLabel>
//       <Grid item container>
//         <Controller
//           {...rest}
//           name="text"
//           control={control}
//           defaultValue={initialValue}
//           render={() => (
//             <CKEditor
//               editor={Editor}
//               data={initialValue}
//               config={editorConfiguration}
//               onReady={(editor) => {
//                 // You can store the "editor" and use when it is needed.
//                 console.log('Editor is ready to use!', editor)
//                 const values = Array.from(editor.ui.componentFactory.names())
//                 console.log(values)
//               }}
//               onChange={(event, editor) => {
//                 const data = editor.getData()
//                 onChange(data)
//                 // console.log({ event, editor, data })
//               }}
//               onBlur={(event, editor) => {
//                 // console.log('Blur.', editor)
//               }}
//               onFocus={(event, editor) => {
//                 // console.log('Focus.', editor)
//               }}
//             />
//           )}
//         />
//       </Grid>
//       <Collapse in={invalid}>
//         <Grid item container>
//           <StyledAlert severity="error">
//             {formerror && formerror.message}
//           </StyledAlert>
//         </Grid>
//       </Collapse>
//     </StyledGrid>
//   )
// }

// InputCKEditorControl.defaultProps = {
//   initialValue: null,
//   height: 300,
// }
// InputCKEditorControl.propTypes = {
//   name: PropTypes.string.isRequired,
//   /* eslint-disable-line*/
//   control: PropTypes.shape({
//     updateIsValid: PropTypes.func,
//   }).isRequired,
//   initialValue: PropTypes.string,
//   height: PropTypes.number,
//   label: PropTypes.string.isRequired,
// }

// export default React.memo(InputCKEditorControl)
