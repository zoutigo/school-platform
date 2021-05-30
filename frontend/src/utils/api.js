import axios from 'axios'

export const apiCheckEmail = async (value) => {
  const data = { email: value }
  const url = 'https://ecole-saint-augustin.herokuapp.com/users/checkemail'
  try {
    const response = await axios.post(url, data)
    if (response.status === 200) {
      return false
    }
    return true
  } catch (error) {
    return false
  }
}

export const apiRegister = async (datas) => {
  const url = 'https://ecole-saint-augustin.herokuapp.com/users'

  try {
    const req = await axios.post(url, datas)
    return req
  } catch (err) {
    return err
  }
}
export const apiLogin = async (datas) => {
  const url = 'https://ecole-saint-augustin.herokuapp.com/users/login'

  try {
    const req = await axios.post(url, datas)
    return req
  } catch (err) {
    return err
  }
}

export const apiFecthUserDatas = async (id) => {
  const url = `http://localhost:3500/users/${id}`

  const result = await fetch(url).then((res) => res)

  return result.json()

  // axios.get(url).then((res) => res)
}

export const apiFecthTeam = async () => {
  const URL = `${process.env.REACT_APP_ENDPOINT}/users/team`
  const result = await axios.get(URL)
  return result
}

export const apiFecthAllPages = async () => {
  const URL = `${process.env.REACT_APP_ENDPOINT}/pages`
  const { data } = await axios.get(URL)
  return data
}

export const apiUpdatePage = async (obj) => {
  const URL = `${process.env.REACT_APP_ENDPOINT}/pages/${obj.id}`
  const { data } = await axios.put(URL, obj.body, obj.options)
  return data
}
export const apiUpdateClassroom = async ({ id, body, options }) => {
  const URL = `${process.env.REACT_APP_ENDPOINT}/classrooms/${id}`
  const { data } = await axios.put(URL, body, options)
  return data
}

export const apiFecthClassroom = async (param) => {
  const URL = `${process.env.REACT_APP_ENDPOINT}/classrooms/${param}`
  const { data } = await axios.get(URL)

  return data
}
export const apiFetchPaper = async (param) => {
  const URL = `${process.env.REACT_APP_ENDPOINT}/papers/?${param}`
  const { data } = await axios.get(URL)

  return data
}

export const apiFetchEvents = async (param) => {
  const URL = `${process.env.REACT_APP_ENDPOINT}/events?${param}`
  const { data } = await axios.get(URL)

  return data
}

export const apiPostEvents = async ({ id, action, body, options }) => {
  const URL = `${process.env.REACT_APP_ENDPOINT}/events?action=${action}&id=${id}`
  const { data } = await axios.post(URL, body, options)
  return data
}

export const apiFecthPage = async (param) => {
  const URL = `${process.env.REACT_APP_ENDPOINT}/pages?${param}`
  const { data } = await axios.get(URL)

  return data
}

export const apiPostPaper = async ({ id, body, options, action }) => {
  const URL = `${process.env.REACT_APP_ENDPOINT}/papers?action=${action}&id=${id}`
  const { data } = await axios.post(URL, body, options)
  return data
}

export const apiPostPage = async ({ id, body, options, action }) => {
  const URL = `${process.env.REACT_APP_ENDPOINT}/pages?action=${action}&id=${id}`
  const result = await axios.post(URL, body, options)
  return result
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
