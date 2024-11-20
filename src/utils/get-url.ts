import { env } from '@/env'
import canUseDOM from './can-use-dom'

export const getServerSideURL = () => {
  let url = env.BASE_URL

  if (!url) {
    url = 'http://localhost:3000'
  }

  return url
}

export const getClientSideURL = () => {
  if (canUseDOM) {
    const protocol = window.location.protocol
    const domain = window.location.hostname
    const port = window.location.port

    return `${protocol}//${domain}${port ? `:${port}` : ''}`
  }

  return env.BASE_URL || ''
}
