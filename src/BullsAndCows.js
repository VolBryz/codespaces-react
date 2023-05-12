// src/BullsAndCows.js
import React, { useState } from 'react';
import { generateSecretNumber, calculateBullsAndCows } from './gameLogic';
import styles from './BullsAndCows.module.css';
function BullsAndCows() {
    const [secret, setSecret] = useState(generateSecretNumber());
    const [guess, setGuess] = useState('');
    const [attempts, setAttempts] = useState([]);
    const [gameOver, setGameOver] = useState(false);

    function handleChange(e) {
        const value = e.target.value;
        if (value.length <= 4 && /^\d*$/.test(value)) {
            setGuess(value);
        }
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (guess.length !== 4) return;

        const result = calculateBullsAndCows(guess, secret);
        setAttempts([...attempts, { guess, ...result }]);

        if (result.bulls === 4) {
            setGameOver(true);
        } else {
            setGuess('');
        }
    }

    function handleRestart() {
        setSecret(generateSecretNumber());
        setGuess('');
        setAttempts([]);
        setGameOver(false);
    }

    return (
        <div className={styles.container}>
          <h1 className={styles.title}>Bulls and Cows</h1>
          <form onSubmit={handleSubmit} className={styles.form}>
            <input
              type="text"
              value={guess}
              onChange={handleChange}
              maxLength="4"
              disabled={gameOver}
              className={styles.input}
            />
            <button type="submit" disabled={gameOver} className={styles.button}>
              Guess
            </button>
          </form>
          {attempts.map((attempt, index) => (
            <p key={index} className={styles.attempt}>
              {attempt.guess}: {attempt.bulls} bulls, {attempt.cows} cows
            </p>
          ))}
          {gameOver && (
            <>
              <p className={styles.gameOver}>You won in {attempts.length} attempts!</p>
              <button onClick={handleRestart} className={styles.button}>
                Restart
              </button>
            </>
          )}
        </div>
      );
}

export default BullsAndCows;
