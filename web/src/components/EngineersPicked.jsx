import * as React from 'react'
import { mutate } from 'swr'

export default function EngineersPicked() {
  const [engineers, setEngineers] = React.useState(null)

  React.useEffect(() => {
    ;(async () => {
      const rawResponse = await fetch(
        'https://radiant-hamlet-27832.herokuapp.com/lastShift'
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
      'https://radiant-hamlet-27832.herokuapp.com/pickEngineers'
    )
    const data = await rawResponse.json()
    setEngineers(data.engineers)
    mutate('https://radiant-hamlet-27832.herokuapp.com/engineers')
    mutate('https://radiant-hamlet-27832.herokuapp.com/shiftsTimeline')
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
