import getConfig from 'next/config'

const { publicRuntimeConfig } = getConfig()
const { apiUrl } = publicRuntimeConfig
type Opts = RequestInit & {
  params?: Record<string, string> | null
}

export async function client<T>(
  endpoint: string,
  { body, params, ...customConfig }: Opts = {}
) {
  const headers = { 'Content-Type': 'application/json' }

  const config: RequestInit = {
    method: body ? 'POST' : 'GET',
    ...customConfig,
    headers: {
      ...headers,
      ...customConfig.headers,
    },
  }

  if (body) {
    config.body = JSON.stringify(body)
  }
  const urlParams = params ? `?${new URLSearchParams(params)}` : ''
  const response = await fetch(`${apiUrl}${endpoint}${urlParams}`, config)
  const data: T = await response.json()

  if (response.ok) {
    return {
      data,
      status: response.status,
    }
  }

  const err = new Error(response.statusText)
  return Promise.reject(err.message)
}

client.post = function (
  endpoint: string,
  body: RequestInit['body'],
  customConfig: RequestInit = {}
) {
  return client(endpoint, { ...customConfig, body })
}
