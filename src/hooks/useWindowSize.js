import {useEffect, useState} from 'react'

export const useWindowSize = () => {
  const getWindowSizes = () => ({
    height: window.innerHeight,
    width: window.innerWidth
  })

  const [size, setSize] = useState(getWindowSizes())

  function onResize() {
    setSize(getWindowSizes())
  }

  useEffect(() => {
    window.addEventListener('resize', onResize)

    return () => {
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return size
}

