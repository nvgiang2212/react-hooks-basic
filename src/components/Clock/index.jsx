import React from 'react';
import useClock from '../../hooks/useClock';

Clock.propTypes = {}

function Clock() {
  const { timeString } = useClock()

  return (
    <h1 style={{ fontSize: '42px' }}>{timeString}</h1>
  );
}

export default Clock;