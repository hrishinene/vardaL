import {WORDS} from "../constants/wordlist";
import {syllables} from "./devStrUtils";
import {SYLLABLE_SET} from "./statuses";
import {VALIDGUESSES} from "../constants/validGuesses";

// you can run individual tests from command line. The regex match is done based on test name or description
// npm run test -- --verbose=true --testNamePattern=covering
describe('cover: all dictionary words are covered by the current keyboard', () => {
    test("start covering", () => {
        for (let word of WORDS) {
            console.log("word to cover: " + word)
            let wordSyllables = syllables(word)
            for (let syllable of wordSyllables) {
                expect(SYLLABLE_SET.has(syllable)).toBe(true)
            }
            // console.log("Syllables " + wordSyllables + " of: " + word + " are covered by the current keyboard")
        }
    })
})

// npm run test -- --verbose=true --testNamePattern=covering
describe('cover: ensure that all words in dictionary are also valid guesses', () => {
    test('compare each dictionary word for membership', () => {
        // WORDS is a list at the moment
        let validGuesses = new Set(VALIDGUESSES)
        for (let word of WORDS) {
            expect(validGuesses.has(word)).toBeTruthy()
        }
    })
})