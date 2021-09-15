// eslint-disable-next-line camelcase
import jwt_decode from 'jwt-decode'

const tokenDatas = (response) => {
  const token = response.headers['x-access-token']

  const datas = jwt_decode(token)
  return {
    newToken: token,
    newDatas: datas,
  }
}

export default tokenDatas
