export const setUser = (user) => {
  localStorage.setItem('user', JSON.stringify(user))
}
export const getUser = () => {
  return JSON.parse(localStorage.getItem('user'))
}

export const setLang = (lang) => {
  localStorage.setItem('lang', JSON.stringify(lang))
}

export const getLang = () => {
  return JSON.parse(localStorage.getItem('lang'))
}

export const setRemember = (user, token) => {
  console.log('set')
  localStorage.setItem('remember', JSON.stringify({ user, token }))
}

export const getRemember = () => {
  const getted = JSON.parse(localStorage.getItem('remember'))
  console.log(getted)
  return getted
}

export const setCharLaunch = (character) => {
  localStorage.setItem('character', JSON.stringify(character))
}

export const getCharLaunch = () => {
  return JSON.parse(localStorage.getItem('character'))
}

export const setIP = (ip) => {
  localStorage.setItem('ip', JSON.stringify(ip))
}

export const getIP = () => {
  return JSON.parse(localStorage.getItem('ip')) || "127.0.0.1"
}

export const setLanguage = (language) => {
  localStorage.setItem('language', JSON.stringify(language))
}

export const getLanguage = () => {
  return JSON.parse(localStorage.getItem('language'))
}
