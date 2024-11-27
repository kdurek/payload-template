import React from 'react'

interface Props {
  className?: string
  loading?: 'lazy' | 'eager'
  priority?: 'auto' | 'high' | 'low'
}
export const Logo = (props: Props) => {
  const { loading: loadingFromProps, priority: priorityFromProps } = props
  const loading = loadingFromProps || 'lazy'
  const priority = priorityFromProps || 'low'
  return (
    /* eslint-disable @next/next/no-img-element */
    <img
      alt="CHANGE_ME"
      width={193}
      height={43}
      loading={loading}
      fetchPriority={priority}
      decoding="async"
      className="max-w-36"
      src="/logo.png"
    />
  )
}
