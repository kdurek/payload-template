import { mongooseAdapter } from '@payloadcms/db-mongodb'

import path from 'path'
import { buildConfig } from 'payload'
import sharp from 'sharp'
import { fileURLToPath } from 'url'

import { env } from '@/env'
import { media } from './collections/media'
import { pages } from './collections/pages'
import { users } from './collections/users'
import { footer } from './footer/config'
import { header } from './header/config'
import { defaultLexical } from '@/fields/default-lexical'
import { getServerSideURL } from '@/utils/get-url'
import { plugins } from '@/plugins'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: users.slug,
    components: {
      beforeDashboard: ['@/components/before-dashboard'],
    },
    autoLogin:
      env.NODE_ENV === 'development'
        ? {
            email: 'admin@example.com',
            password: 'admin',
            prefillOnly: true,
          }
        : undefined,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  // This config helps us configure global or default features that the other editors can inherit
  editor: defaultLexical,
  db: mongooseAdapter({
    url: env.DATABASE_URL,
  }),
  collections: [pages, media, users],
  cors: [getServerSideURL()].filter(Boolean),
  globals: [header, footer],
  plugins: [...plugins],
  secret: env.PAYLOAD_SECRET,
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  graphQL: {
    disable: true,
    disablePlaygroundInProduction: true,
  },
})
