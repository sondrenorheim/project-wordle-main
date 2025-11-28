import React from 'react';

function GuessInput({ onGuessSubmit, disabled }) {
  const [guess, setGuess] = React.useState('');

  function handleSubmit(event) {
    event.preventDefault();

    if (guess.length !== 5) {
      return;
    }

    onGuessSubmit(guess);
    setGuess('');
  }

  return (
    <form className="guess-input-wrapper" onSubmit={handleSubmit}>
      <label htmlFor="guess-input">Enter guess:</label>
      <input
        id="guess-input"
        type="text"
        value={guess}
        disabled={disabled}
        onChange={(event) => {
          const nextGuess = event.target.value.toUpperCase();
          setGuess(nextGuess);
        }}
        pattern="[A-Z]{5}"
        title="5 letter word"
        maxLength={5}
        required
      />
    </form>
  );
}

export default GuessInput;
