import { mongooseAdapter } from '@payloadcms/db-mongodb'

import { redirectsPlugin } from '@payloadcms/plugin-redirects'
import { seoPlugin } from '@payloadcms/plugin-seo'
import {
  BoldFeature,
  ItalicFeature,
  LinkFeature,
  UnderlineFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import sharp from 'sharp'
import { fileURLToPath } from 'url'

import { env } from '@/env'
import { GenerateTitle, GenerateURL } from '@payloadcms/plugin-seo/types'
import { Page } from 'src/payload-types'
import { media } from './collections/media'
import { pages } from './collections/pages'
import { users } from './collections/users'
import { footer } from './footer/config'
import { header } from './header/config'
import { revalidateRedirects } from './hooks/revalidate-redirects'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const generateTitle: GenerateTitle<Page> = ({ doc }) => {
  return doc?.title ? `${doc.title} | CHANGE_ME` : 'CHANGE_ME'
}

const generateURL: GenerateURL<Page> = ({ doc }) => {
  return doc?.slug ? `${env.BASE_URL}/${doc.slug}` : env.BASE_URL
}

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
  editor: lexicalEditor({
    features: () => {
      return [
        UnderlineFeature(),
        BoldFeature(),
        ItalicFeature(),
        LinkFeature({
          enabledCollections: ['pages'],
          fields: ({ defaultFields }) => {
            const defaultFieldsWithoutUrl = defaultFields.filter((field) => {
              if ('name' in field && field.name === 'url') return false
              return true
            })

            return [
              ...defaultFieldsWithoutUrl,
              {
                name: 'url',
                type: 'text',
                admin: {
                  condition: ({ linkType }) => linkType !== 'internal',
                },
                label: ({ t }) => t('fields:enterURL'),
                required: true,
              },
            ]
          },
        }),
      ]
    },
  }),
  db: mongooseAdapter({
    url: env.DATABASE_URL,
  }),
  collections: [pages, media, users],
  cors: [env.BASE_URL].filter(Boolean),
  csrf: [env.BASE_URL].filter(Boolean),
  globals: [header, footer],
  plugins: [
    redirectsPlugin({
      collections: ['pages'],
      overrides: {
        // @ts-expect-error
        fields: ({ defaultFields }) => {
          return defaultFields.map((field) => {
            if ('name' in field && field.name === 'from') {
              return {
                ...field,
                admin: {
                  description: 'You will need to rebuild the website when changing this field.',
                },
              }
            }
            return field
          })
        },
        hooks: {
          afterChange: [revalidateRedirects],
        },
      },
    }),
    seoPlugin({
      generateTitle,
      generateURL,
    }),
  ],
  secret: env.PAYLOAD_SECRET,
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  graphQL: {
    disable: true,
  },
})
