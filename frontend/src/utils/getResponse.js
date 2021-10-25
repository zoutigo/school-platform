/* eslint-disable no-nested-ternary */
const getResponse = (res) => {
  const reponseText = res.data
    ? res.data.message
      ? res.data.message
      : res.message
    : res.message

  return reponseText
}

export default getResponse
