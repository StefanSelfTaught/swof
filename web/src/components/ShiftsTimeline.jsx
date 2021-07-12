import * as React from 'react'
import { useShiftsTimeline } from '../fetchers'

export default function ShiftsTimeline() {
  const { shiftsTimeline, isLoading, isError } = useShiftsTimeline()

  if (isLoading) return <p>Loading ...</p>
  if (isError) return <p>Error</p>
  return (
    <div style={{marginBottom: '40px'}}>
      <p>Weeks passed: {shiftsTimeline.shiftsTimeline.weeks}</p>
      <p >Days passed: {shiftsTimeline.shiftsTimeline.days}</p>
    </div>
  )
}
