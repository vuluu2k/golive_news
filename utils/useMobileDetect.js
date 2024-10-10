import { useEffect, useState } from 'react'

export default function useIsTouchDevice() {
  const [isTouch, setIsTouch] = useState(false)
  useEffect(() => {
    const { isAndroid, isIPhone13, isWinPhone, isMobileSafari } = require('react-device-detect')
    setIsTouch(isTouch || isAndroid || isIPhone13 || isWinPhone || isMobileSafari)
  }, [isTouch])

  return isTouch
}