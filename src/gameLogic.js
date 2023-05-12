// src/gameLogic.js
export function generateSecretNumber() {
    let secret = '';
    while (secret.length < 4) {
        const digit = Math.floor(Math.random() * 10).toString();
        if (!secret.includes(digit)) {
            secret += digit;
        }
    }
    return secret;
}

export function calculateBullsAndCows(guess, secret) {
    let bulls = 0;
    let cows = 0;

    for (let i = 0; i < guess.length; i++) {
        if (guess[i] === secret[i]) {
            bulls++;
        } else if (secret.includes(guess[i])) {
            cows++;
        }
    }

    return { bulls, cows };
}
