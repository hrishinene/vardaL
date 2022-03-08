import {syllables} from "./devStrUtils";
import {WORDS} from "../constants/wordlist";
import {MAX_WORD_LENGTH} from "../constants/settings";


describe('syllables function', () => {
    test("when given अक्षर it returns 'अ', 'क्ष', 'र'", () => {
        const s = "अक्षर"
        const exp = ['अ', 'क्ष', 'र']
        expect(syllables(s)).toEqual(exp)
    })
    test("when given शब्दक it returns 'श', 'ब्द', 'क'", () => {
        const s = "शब्दक"
        const exp = ['श', 'ब्द', 'क']
        expect(syllables(s)).toEqual(exp)
    })
    test("when given अन्याय it returns 'अ', 'न्या', 'य'", () => {
        const s = "अन्याय"
        const exp = ['अ', 'न्या', 'य']
        expect(syllables(s)).toEqual(exp)
    })
    test("when given अंबर it returns 'अं', 'ब', 'र'", () => {
        const s = "अंबर"
        const exp = ['अं', 'ब', 'र']
        console.log(syllables(s))
        expect(syllables(s)).toEqual(exp)
    })
    test("when given शंकर it returns 'शं', 'क', 'र'", () => {
        const s = "शंकर"
        const exp = ['शं', 'क', 'र']
        console.log(syllables(s))
        expect(syllables(s)).toEqual(exp)
    })
    test("The words in dictionary are unique", () => {
        // this is a temporary test, the dictionary could be a set
        var words = new Set(WORDS)
        expect(words.size).toEqual(WORDS.length)
    })
    test("There should be no dups in the dictionary", () => {
        WORDS.sort(); // lexical sorting
        for (let i = 1; i < WORDS.length; i++) {
            expect(WORDS[i]).not.toEqual(WORDS[i - 1])
        }
    })
})

describe("comprehensive dictionary test", () => {
    test("each dictionary word is a concatenation of its syllables", () => {
        let length = WORDS.length;
        for (let i = 0; i < length; i++) {
            let word: string = WORDS[i]
            let ss: string[] = syllables(word)
            // let's, for now, assert that each word has MAX_WORD_LENGTH syllables
            expect(ss.length).toEqual(MAX_WORD_LENGTH)
            expect(ss.join('')).toEqual(word)
            console.log(word + " passes " + (i + 1) + "/" + length)
        }
    })
})