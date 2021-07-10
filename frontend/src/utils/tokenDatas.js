const tokenDatas = (response) => {
  const token = response.headers['x-access-token']
  const splittedToken = token.split('.')
  const datas = JSON.parse(atob(splittedToken[1]))
  return {
    newToken: token,
    newDatas: datas,
  }
}

export default tokenDatas
