// eslint-disable-next-line camelcase
import jwt_decode from 'jwt-decode'

const tokenDatas = (response) => {
  const token = response.headers['x-access-token']
  // const splittedToken = token.split('.')
  // const datas = JSON.parse(atob(splittedToken[1]))
  const datas = jwt_decode(token)
  return {
    newToken: token,
    newDatas: datas,
  }
}

export default tokenDatas
