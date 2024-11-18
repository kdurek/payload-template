// Where Homepage is a generated payload interface from a global page containing a block

import type { Page } from '@/payload-types'

// field called `layout` where every possible blocks are defined
export type BlockTypePicker<T> = Extract<Page['layout'][number], { blockType: T }>
