import {useEffect, useState} from 'react'

export function useDoubleClick(actionDoubleClick, actionOneClick = () => null, delay = 250) {
  const [click, setClick] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => {
      if(click === 1) {
        actionOneClick()
      }
      setClick(0)
    }, delay)

    if(click === 2) {
      actionDoubleClick()
    }

    return () => clearTimeout(timer)

  }, [click, actionDoubleClick, actionOneClick, delay])


  return () => setClick( prevClick => prevClick + 1)
}