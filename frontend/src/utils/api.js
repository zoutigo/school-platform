import axios from 'axios'

const LOCALHOST = 'http://localhost:3500'

const PREFIX = process.env.NODE_ENV === 'production' ? '' : LOCALHOST

export const apiCheckEmail = async (value) => {
  const data = { email: value }

  const URL = `${PREFIX}/users/checkemail`
  try {
    const response = await axios.post(URL, data)
    if (response.status === 200) {
      return false
    }
    return true
  } catch (error) {
    return false
  }
}

export const apiRegister = async (datas) => {
  const URL = `${PREFIX}/users/register`

  const response = await axios.post(URL, datas)
  return response
}
export const apiUpdateUser = async ({ id, action, body, options }) => {
  const URL = `${PREFIX}/users?action=${action}&id=${id}`
  const response = await axios.post(URL, body, options)
  return response
}

export const apiLogin = async (datas) => {
  const URL = `${PREFIX}/users/login`
  const response = await axios.post(URL, datas)
  return response
}

export const apiFecthUserDatas = async (id) => {
  const url = `${PREFIX}/users/${id}`

  const result = await fetch(url).then((res) => res)

  return result.json()
}

export const apiFecthEntity = async (param) => {
  const URL = `${PREFIX}/entities?${param}`
  const { data } = await axios.get(URL)

  return data
}
export const apiPostEntity = async ({ id, action, body, options }) => {
  const URL = `${PREFIX}/entities?action=${action}&id=${id}`
  const { data } = await axios.post(URL, body, options)
  return data
}

export const apiFetchEvents = async (param) => {
  const URL = `${PREFIX}/events?${param}`
  const { data } = await axios.get(URL)

  return data
}

export const apiPostEvents = async ({ id, action, body, options }) => {
  const URL = `${PREFIX}/events?action=${action}&id=${id}`
  const { data } = await axios.post(URL, body, options)
  return data
}

export const apiFecthPage = async (params) => {
  const URL = `${PREFIX}/pages?${params}`
  const { data } = await axios.get(URL)

  return data
}

export const apiPostPage = async ({ id, body, options, action }) => {
  const URL = `${PREFIX}/pages?action=${action}&id=${id}`
  const result = await axios.post(URL, body, options)
  return result
}

export const apiPostPaper = async ({ id, body, options, action }) => {
  const URL = `${PREFIX}/papers?action=${action}&id=${id}`
  const result = await axios.post(URL, body, options)
  return result
}

export const apiFetchPaper = async (params) => {
  const URL = `${PREFIX}/papers/?${params}`
  const { data } = await axios.get(URL)

  return data
}

export const apiFetchVariables = async () => {
  const URL = `${PREFIX}/variables`
  const { data } = await axios.get(URL)

  return data
}

export const apiVerifyEmail = async (params) => {
  const URL = `${PREFIX}/users/verification-email?${params}`
  const { data } = await axios.get(URL)

  return data
}

export const apiPostFile = async ({ id, body, options, action }) => {
  const URL = `${process.env.REACT_APP_ENDPOINT}/files?action=${action}&id=${id}`
  const formdata = new FormData()
  const { month, startdate, enddate } = body
  if (month) {
    formdata.append('month', body.month)
  }
  if (startdate) {
    formdata.append('month', body.startdate)
  }
  if (enddate) {
    formdata.append('month', body.enddate)
  }

  formdata.append('file', body.file)
  formdata.append('type', 'newsletter')

  const { data } = await fetch(URL, {
    method: 'POST',
    headers: new Headers(options.headers),
    body: formdata,
  })
  return data
}

export const apiFecthFile = async (param) => {
  const URL = `${process.env.REACT_APP_ENDPOINT}/files?${param}`
  const { data } = await axios.get(URL)

  return data
}

export const apiPostChemin = async ({ id, body, options, action, token }) => {
  const URL = `${PREFIX}/chemins?action=${action}&id=${id}`
  const formdata = new FormData()

  if (body && body.alias) {
    formdata.append('alias', body.alias)
  }
  if (body && body.path) {
    formdata.append('path', body.path)
  }
  if (body && body.description) {
    formdata.append('description', body.description)
  }
  if (body && body.file) {
    formdata.append('file', body.file)
  }

  const result = await fetch(URL, {
    method: 'POST',
    headers: new Headers(options.headers),
    body: formdata,
  })

  return result
}

export const apiFetchChemin = async () => {
  const URL = `${PREFIX}/chemins`
  const { data } = await axios.get(URL)

  return data
}

export const apiPostPreInscription = async ({ id, body, options, action }) => {
  const URL = `${PREFIX}/preinscriptions?action=${action}&id=${id}`
  const formdata = new FormData()

  if (body && body.childFirstname) {
    formdata.append('childFirstname', body.childFirstname)
  }
  if (body && body.classroomAlias) {
    formdata.append('classroomAlias', body.classroomAlias)
  }

  if (body && body.message) {
    formdata.append('message', body.message)
  }

  if (body && body.file) {
    formdata.append('file', body.file)
  }

  const result = await fetch(URL, {
    method: 'POST',
    headers: new Headers(options.headers),
    body: formdata,
  })

  return result
}
