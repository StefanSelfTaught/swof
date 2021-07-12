import * as React from 'react'
import { mutate } from 'swr'

import {
  motion,
  useMotionValue,
  useTransform,
  useIsPresent,
} from 'framer-motion'

export default function Card(props) {
  const [engineers, setEngineers] = React.useState(null)
  const isPresent = useIsPresent()
  const x = useMotionValue(0)
  const scale = useTransform(x, [-150, 0, 150], [0.5, 1, 0.5])
  const rotate = useTransform(x, [-150, 0, 150], [-45, 0, 45], {
    clamp: false,
  })

  React.useEffect(() => {
    if (isPresent && !props.firstRender) getEngineers()
  }, [])

  const getEngineers = async () => {
    const rawResponse = await fetch(
      'https://radiant-hamlet-27832.herokuapp.com/pickEngineers'
    )
    const data = await rawResponse.json()
    setEngineers(data.engineers)
    mutate('https://radiant-hamlet-27832.herokuapp.com/engineers')
    mutate('https://radiant-hamlet-27832.herokuapp.com/shiftsTimeline')
  }

  const handleDragEnd = (event, info) => {
    if (info.offset.x < -100) {
      props.setExitX(-250)
      props.setIndex(props.index + 1)
    }
    if (info.offset.x > 100) {
      props.setExitX(250)
      props.setIndex(props.index + 1)
    }
  }

  return (
    <motion.div
      style={{
        width: 250,
        height: 450,
        position: 'absolute',
        top: 0,
        x: x,
        rotate: rotate,
        cursor: 'grab',
      }}
      whileTap={{ cursor: 'grabbing' }}
      drag={props.drag}
      dragConstraints={{
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
      }}
      onDragEnd={handleDragEnd}
      initial={props.initial}
      animate={props.animate}
      transition={props.transition}
      exit={{
        x: props.exitX,
        opacity: 0,
        scale: 0.5,
        transition: { duration: 0.2 },
      }}
    >
      <motion.div
        style={{
          width: 250,
          height: 250,
          backgroundColor: '#fff',
          borderRadius: 30,
          scale: scale,
          fontSize: 23,
          display: 'flex',
          justifyContent: 'space-evenly',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        {!!engineers ? (
          engineers.map((eng) => {
            return <div key={eng._id}>{eng.name}</div>
          })
        ) : (
          <p>No engineers yet :(</p>
        )}
      </motion.div>
    </motion.div>
  )
}
