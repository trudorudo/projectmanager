import {useEffect, useState} from 'react'
import { useEventListener } from './useEvenListener'; 
export const useWindowSize = () => {
  const getWindowSizes = () => ({
    height: window.innerHeight,
    width: window.innerWidth
  })

  const [size, setSize] = useState(getWindowSizes())

  function onResize() {
    setSize(getWindowSizes())
  }
  
  useEventListener('resize', onResize)
  // useEffect(() => {
  //   // window.addEventListener('resize', onResize)
    

  //   return () => {
  //     window.removeEventListener('resize', onResize)
  //   }
  // }, [])

  return size
}

