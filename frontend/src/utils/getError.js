/* eslint-disable no-nested-ternary */
// eslint-disable-next-line arrow-body-style

const getError = (err) =>
  err.response && err.response.data && err.response.data.message
    ? err.response.data.message
    : err.message

export default getError
