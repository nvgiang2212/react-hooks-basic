import React, { useState } from 'react';
import './ColorBox.scss'

function getRandomColor() {
  const COLOR_LIST = ['deeppink', 'green', 'orange', 'violet', 'blue', 'red', 'yellow'];
  const randomIndex = Math.trunc(Math.random() * COLOR_LIST.length);
  const prevIndex = COLOR_LIST.indexOf(localStorage.getItem('box_color'));
  return randomIndex !== prevIndex ? COLOR_LIST[randomIndex] : getRandomColor();

}

function ColorBox() {
  const [color, setColor] = useState((initColor) => {
    initColor = localStorage.getItem('box_color') || 'deeppink'
    return initColor
  })

  function handleBoxClick() {
    // Get random color --> set color
    const newColor = getRandomColor();
    setColor(newColor);

    localStorage.setItem('box_color', newColor)
  }

  return (
    <div className='color-box' style={{ backgroundColor: color }} onClick={handleBoxClick}>
    </div>
  );
}

export default ColorBox;