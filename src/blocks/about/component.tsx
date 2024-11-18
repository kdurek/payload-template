import React from 'react'

import { Media } from '@/components/media'
import { BlockWrapper } from '@/blocks/block-wrapper'
import type { BlockTypePicker } from '@/utils/type-helpers'
import { BlockHeader } from '@/blocks/block-header'

export const AboutBlock: React.FC<BlockTypePicker<'about'>> = ({ title, description, media }) => {
  return (
    <BlockWrapper className="flex flex-col gap-6 lg:flex-row lg:items-center lg:gap-12">
      <div className="flex-1">
        <BlockHeader title={title} />
        <div className="mt-6 max-w-[60ch] text-lg text-muted-foreground lg:mt-12">
          {description}
        </div>
      </div>
      {media && typeof media === 'object' && (
        <Media
          className="aspect-video overflow-hidden rounded-md lg:w-3/5"
          imgClassName="size-full object-cover"
          resource={media}
        />
      )}
    </BlockWrapper>
  )
}
