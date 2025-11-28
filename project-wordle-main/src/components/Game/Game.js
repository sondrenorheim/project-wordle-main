import React from 'react';

import { sample } from '../../utils';
import { WORDS } from '../../data';
import { NUM_OF_GUESSES_ALLOWED } from '../../constants';
import { checkGuess } from '../../game-helpers';
import GuessInput from '../GuessInput';
import GuessResults from '../GuessResults';
import Banner from '../Banner';
import Keyboard from '../Keyboard';

function Game() {
  // Move answer to state using callback function for initial value
  const [answer, setAnswer] = React.useState(() => {
    const initialAnswer = sample(WORDS);
    console.info({ answer: initialAnswer });
    return initialAnswer;
  });

  const [guesses, setGuesses] = React.useState([]);
  const [gameStatus, setGameStatus] = React.useState('running');

  // Calculate letter statuses for keyboard
  const letterStatuses = React.useMemo(() => {
    const statuses = {};

    guesses.forEach((guess) => {
      const result = checkGuess(guess, answer);
      if (!result) return;

      result.forEach(({ letter, status }) => {
        // Priority: correct > misplaced > incorrect
        // Don't downgrade a letter's status
        if (!statuses[letter]) {
          statuses[letter] = status;
        } else if (status === 'correct') {
          statuses[letter] = 'correct';
        } else if (status === 'misplaced' && statuses[letter] !== 'correct') {
          statuses[letter] = 'misplaced';
        }
      });
    });

    return statuses;
  }, [guesses, answer]);

  function handleGuessSubmit(guess) {
    const nextGuesses = [...guesses, guess];
    setGuesses(nextGuesses);

    if (guess.toUpperCase() === answer) {
      setGameStatus('won');
    } else if (nextGuesses.length >= NUM_OF_GUESSES_ALLOWED) {
      setGameStatus('lost');
    }
  }

  function handleRestart() {
    const newAnswer = sample(WORDS);
    console.info({ answer: newAnswer });
    setAnswer(newAnswer);
    setGuesses([]);
    setGameStatus('running');
  }

  return (
    <>
      <GuessResults guesses={guesses} answer={answer} />
      <GuessInput
        onGuessSubmit={handleGuessSubmit}
        disabled={gameStatus !== 'running'}
      />
      <Keyboard letterStatuses={letterStatuses} />
      {gameStatus === 'won' && (
        <Banner status="happy">
          <p>
            <strong>Congratulations!</strong> Got it in{' '}
            <strong>
              {guesses.length === 1 ? '1 guess' : `${guesses.length} guesses`}
            </strong>
            .
          </p>
          <button className="restart-button" onClick={handleRestart}>
            Restart Game
          </button>
        </Banner>
      )}
      {gameStatus === 'lost' && (
        <Banner status="sad">
          <p>
            Sorry, the correct answer is <strong>{answer}</strong>.
          </p>
          <button className="restart-button" onClick={handleRestart}>
            Restart Game
          </button>
        </Banner>
      )}
    </>
  );
}

export default Game;
