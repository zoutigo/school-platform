import tinyMceColors from './tinyMceColors'

const tinyMceSmallEditorParams = {
  menubar: false,
  branding: false,
  selector: 'textarea',
  forced_root_block: '',
  browser_spellcheck: true,
  textcolor_cols: '6',
  textcolor_rows: '5',
  textcolor_map: tinyMceColors,
  height: 200,
  width: '90vw',
  force_br_newlines: true,
  force_p_newlines: false,

  plugins:
    'lists textcolor  importcss autolink directionality link  hr pagebreak nonbreaking anchor  advlist wordcount imagetools textpattern noneditable charmap  emoticons autoresize',
  toolbar:
    'bold italic underline strikethrough | forecolor backcolor fontselect fontsizeselect formatselect  removeformat | alignleft aligncenter alignright alignjustify | outdent indent | pagebreak | emoticons | insertfile image  link ',
  toolbar_sticky: true,
  content_style:
    "@import url('https://fonts.googleapis.com/css2?family=Comfortaa:wght@300;400;500;600;700&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,700;1,800;1,900&family=Swanky+and+Moo+Moo&display=swap');body { font-family: Comfortaa; font-size:14px } p { margin: 16px 0; } img { padding: 5px; display: inline }",
}

export default tinyMceSmallEditorParams
