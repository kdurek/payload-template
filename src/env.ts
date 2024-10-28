import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

export const env = createEnv({
  server: {
    BASE_URL: z.string().url(),
    DATABASE_URL: z
      .string()
      .url()
      .refine(
        (str) => !str.includes('YOUR_MONGO_URL_HERE'),
        'You forgot to change the default URL',
      ),
    PAYLOAD_SECRET: z.string(),
    NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  },
  client: {},
  shared: {
    NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  },
  experimental__runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
  },
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
  emptyStringAsUndefined: true,
})
