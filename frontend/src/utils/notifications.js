import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export const notifyFailure = (message) =>
  toast.error(message, {
    position: 'top-left',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  })
export const notifySuccess = (message) =>
  toast.success(message, {
    position: 'top-left',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  })

export const notifyApiFailure = (error) => {
  if (error) {
    switch (error.response.status) {
      case 498:
        notifyFailure(
          "vous n'avez été deconnectés. Enregistrez votre texte et reconnectetez vous"
        )
        break

      default:
        notifyFailure(`une erreur s'est produite: 
        ${error}
        `)
    }
  }
}
