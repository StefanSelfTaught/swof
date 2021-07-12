import * as React from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Card from './components/Card'
import Engineers from './components/Engineers'
import ShiftsTimeline from './components/ShiftsTimeline'
import EngineersPicked from './components/EngineersPicked'

export default function App() {
  const [index, setIndex] = React.useState(0)
  const firstRender = React.useRef(true)
  const [exitX, setExitX] = React.useState('100%')

  React.useEffect(() => {
    firstRender.current = false
  }, [])

  return (
    <>
      <div className='container'>
        <div className='right-part'>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              marginRight: '190px',
              marginTop: '50px',
            }}
          >
            <motion.div
              style={{
                width: 150,
                height: 150,
                position: 'relative',
              }}
            >
              <AnimatePresence initial={false}>
                <Card
                  test={'testaaa'}
                  firstRender={firstRender.current}
                  key={index + 1}
                  initial={{
                    scale: 0,
                    y: 105,
                    opacity: 0,
                  }}
                  animate={{
                    scale: 0.75,
                    y: 30,
                    opacity: 0.5,
                  }}
                  transition={{
                    scale: { duration: 0.2 },
                    opacity: { duration: 0.4 },
                  }}
                />
                <Card
                  test={'test'}
                  firstRender={firstRender.current}
                  key={index}
                  animate={{
                    scale: 1,
                    y: 0,
                    opacity: 1,
                  }}
                  transition={{
                    type: 'spring',
                    stiffness: 300,
                    damping: 20,
                    opacity: {
                      duration: 0.2,
                    },
                  }}
                  exitX={exitX}
                  setExitX={setExitX}
                  index={index}
                  setIndex={setIndex}
                  drag='x'
                />
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
        <div className='left-part'>
          <EngineersPicked />
          <ShiftsTimeline />
          <Engineers />
        </div>
      </div>
    </>
  )
}
