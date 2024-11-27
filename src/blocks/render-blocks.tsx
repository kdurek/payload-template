import React, { Fragment } from 'react'

import type { Page } from '@/payload-types'

import { AboutBlock } from '@/blocks/about/component'
import { MediaBlock } from '@/blocks/media-block/component'

const blockComponents = {
  about: AboutBlock,
  mediaBlock: MediaBlock,
}

export const RenderBlocks: React.FC<{
  blocks: Page['layout'][0][]
}> = (props) => {
  const { blocks } = props

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (hasBlocks) {
    return (
      <div className="py-6 lg:py-12">
        {blocks.map((block, index) => {
          const { blockType } = block

          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType]

            if (Block) {
              return (
                // @ts-expect-error
                <Block key={index} {...block} />
              )
            }
          }
          return null
        })}
      </div>
    )
  }

  return null
}
