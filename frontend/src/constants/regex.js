// const phonePattern = /^[+](d{3}))?(d{3})(d{5,6})$|^(d{10,10})$/
// export const passwordPattern = `^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{8,}$`
// export const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$/

// export const phoneRegex = new RegExp(
//   /^[+](\d{3})\)?(\d{3})(\d{5,6})$|^(\d{10,10})$/
// )
// export const emailRegex = new RegExp(emailPattern)

export const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/
export const passwordPattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{8,}$/
export const passwordRegex = new RegExp(passwordPattern)
