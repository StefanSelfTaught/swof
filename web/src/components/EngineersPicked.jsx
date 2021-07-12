import * as React from 'react'
import { mutate } from 'swr'

export default function EngineersPicked() {
  const [engineers, setEngineers] = React.useState(null)

  React.useEffect(() => {
    ;(async () => {
      const rawResponse = await fetch(
        'http://localhost:3001/lastShift'
      )
      const data = await rawResponse.json()
      setEngineers([
        { name: data.lastShift.firstEngineer },
        { name: data.lastShift.secondEngineer },
      ])
    })()
  }, [])

  const handleButtonClick = async () => {
    const rawResponse = await fetch(
      'http://localhost:3001/pickEngineers'
    )
    const data = await rawResponse.json()
    setEngineers(data.engineers)
    mutate('http://localhost:3001/engineers')
    mutate('http://localhost:3001/shiftsTimeline')
  }

  return (
    <>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-evenly',
          marginTop: '40px',
        }}
      >
        {!!engineers ? (
          engineers.map((eng, i) => {
            return <p key={i}>{eng.name}</p>
          })
        ) : (
          <p>No engineers yet :(</p>
        )}
      </div>
      <button
        onClick={handleButtonClick}
        style={{ margin: '40px 0' }}
      >
        Pick Engineers
      </button>
    </>
  )
}
