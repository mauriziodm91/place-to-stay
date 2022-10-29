const fetchData = async (
  { url, method = 'POST', token = '', body = null },
  setCurrentUser,
  setAlert
) => {
  const headers = token
    ? { 'Content-Type': 'application/json', authorization: `Bearer ${token}` }
    : { 'Content-Type': 'application/json' }
  body = body ? { body: JSON.stringify(body) } : {}

  try {
    const response = await fetch(url, { method, headers, ...body })
    const data = await response.json()
    if (!data.success) {
      if (response.status === 401) setCurrentUser(null)
      throw new Error(data.message)
    }
    return data.result
  } catch (error) {
    setAlert({ open: true, severity: 'error', message: error.message })
    console.log(error)
    return null
  }
}

export default fetchData
