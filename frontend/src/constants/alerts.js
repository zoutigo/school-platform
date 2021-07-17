/* eslint-disable import/prefer-default-export */
export const initialAlertCollapse = {
  openAlert: false,
  alertText: '',
  severity: 'error',
}
export const loadingAlertCollapse = {
  openAlert: true,
  alertText: 'Chargement en cours ...',
  severity: 'warning',
}
export const errorAlertCollapse = (errortext) => ({
  openAlert: true,
  alertText: errortext,
  severity: 'error',
})
export const successAlertCollapse = (errortext) => ({
  openAlert: true,
  alertText: errortext,
  severity: 'success',
})
