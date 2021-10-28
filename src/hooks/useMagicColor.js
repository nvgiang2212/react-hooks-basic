import { useEffect, useRef, useState } from 'react';

useMagicColor.propTypes = {};

const COLOR_LIST = ['red', 'green', 'pink', 'violet', 'gray', 'blue', 'yellow', 'orange']

function randomColor(currentColor) {
  const currentIndex = COLOR_LIST.indexOf(currentColor)
  let newIndex = currentIndex
  while (newIndex === currentIndex) {
    newIndex = Math.trunc(Math.random() * COLOR_LIST.length)
  }
  return COLOR_LIST[newIndex]
}

function useMagicColor() {
  const [color, setColor] = useState('transparent')
  const refColor = useRef('transparent')

  useEffect(() => {
    const colorInterval = setInterval(() => {
      const newColor = randomColor(refColor.current)
      setColor(newColor)

      refColor.current = newColor
    }, 1000);
    return () => {
      if (colorInterval) clearInterval(colorInterval)
    }
  }, [])

  return color;
}

export default useMagicColor;