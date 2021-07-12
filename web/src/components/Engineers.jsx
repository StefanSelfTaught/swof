import * as React from 'react'
import { useEngineers } from '../fetchers'

export default function Engineers() {
  const { engineers, isLoading, isError } = useEngineers()

  if (isLoading) return <p>Loading ...</p>
  if (isError) return <p>Error</p>

  return (
    <div>
      {engineers.engineers.map((eng) => {
        return (
          <p key={eng._id}>
            {eng.name} - {eng.shift} (shift)
          </p>
        )
      })}
    </div>
  )
}
