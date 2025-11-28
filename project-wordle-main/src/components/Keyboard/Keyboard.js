import React from 'react';

const KEYBOARD_ROWS = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['Z', 'X', 'C', 'V', 'B', 'N', 'M'],
];

function Keyboard({ letterStatuses }) {
  return (
    <div className="keyboard">
      {KEYBOARD_ROWS.map((row, rowIndex) => (
        <div key={rowIndex} className="keyboard-row">
          {row.map((letter) => {
            const status = letterStatuses[letter] || 'unused';
            return (
              <span key={letter} className={`keyboard-key ${status}`}>
                {letter}
              </span>
            );
          })}
        </div>
      ))}
    </div>
  );
}

export default Keyboard;
