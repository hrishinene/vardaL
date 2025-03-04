import {getGuessStatuses} from './statuses'
import {solutionIndex} from './words'
import {GAME_TITLE, GAME_URL} from '../constants/strings'
import {MAX_CHALLENGES} from '../constants/settings'
import {syllables} from "./devStrUtils";

// export const shareStatus = (guesses: string[], lost: boolean) => {
// navigator.clipboard.writeText(
// `${GAME_TITLE} ${solutionIndex} ${lost ? 'X' : guesses.length}/6\n\n` +
// generateEmojiGrid(guesses)
// )
// }

export const shareStatus = (guesses: string[], lost: boolean) => {
    // let text = `${GAME_TITLE} ${solutionIndex} ${lost ? 'X' : guesses.length}/${MAX_CHALLENGES}\n` +
    let text = `${GAME_TITLE} #${solutionIndex}\n` +
        generateEmojiGrid(guesses) +
        `\n${GAME_URL} `;
    navigator.clipboard.writeText(text).then(r => {
        // ignore for now
    })

    if (navigator.share) {
        navigator
            .share({
                text: text,
            })
            .catch(error => {
                console.error('Something went wrong', error);
            });
    }
}

export const generateEmojiGrid = (guesses: string[]) => {
    return guesses
        .map((guess) => {
            const status = getGuessStatuses(guess)
            return syllables(guess)
                .map((_, i) => {
                    switch (status[i]) {
                        case 'correct':
                            // return '🟦'
                            return '✅'
                        case 'present':
                            // return '🟧'
                            return '🟨'
                        default:
                            // return '⬜'
                            return '⬛'
                    }
                })
                .join('')
        })
        .join('\n')
}
