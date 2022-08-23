// eslint-disable-next-line camelcase
import jwt_decode from 'jwt-decode'

const tokenDatas = (response) => {
  const { token } = response.data

  const datas = jwt_decode(token)
  const { roles } = datas
  const rawRoles = roles.map((rol) => rol.name)

  datas.isAdmin = rawRoles.includes('admin')
  datas.isManager = rawRoles.includes('manager')
  datas.isModerator = rawRoles.includes('moderateur')

  return {
    newToken: token,
    newDatas: datas,
  }
}

export default tokenDatas
