export const phoneRegex = new RegExp(
  /^[+](\d{3})\)?(\d{3})(\d{5,6})$|^(\d{10,10})$/
)

export const passwordRegex = new RegExp(
  '^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{8,}$'
)
