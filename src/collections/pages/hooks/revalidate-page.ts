import type { CollectionAfterChangeHook } from 'payload'

import { revalidatePath } from 'next/cache'
import type { Page } from '@/payload-types'

export const revalidatePage: CollectionAfterChangeHook<Page> = ({ doc, req: { payload } }) => {
  const path = doc.slug === 'home' ? '/' : `/${doc.slug}`

  payload.logger.info(`Revalidating page at path: ${path}`)

  revalidatePath(path)

  return doc
}
