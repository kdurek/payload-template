import type { Metadata } from 'next'
import { getServerSideURL } from './get-url'

const defaultOpenGraph: Metadata['openGraph'] = {
  type: 'website',
  description: 'CHANGE_ME',
  images: [
    {
      url: `${getServerSideURL()}/website-template-OG.webp`,
    },
  ],
  siteName: 'CHANGE_ME',
  title: 'CHANGE_ME',
}

export const mergeOpenGraph = (og?: Metadata['openGraph']): Metadata['openGraph'] => {
  return {
    ...defaultOpenGraph,
    ...og,
    images: og?.images ? og.images : defaultOpenGraph.images,
  }
}
