import {WORDS} from '../constants/wordlist'
import {VALIDGUESSES} from '../constants/validGuesses'
import {RANDOM_DATE} from "../constants/settings";

export const isWordInWordList = (word: string) => {
    return (
        WORDS.includes(word.toLowerCase()) ||
        VALIDGUESSES.includes(word.toLowerCase())
    )
}

export const isWinningWord = (word: string) => {
    return solution === word
}

const epoch = new Date('March 9, 2022 00:00:00');
const epochMs = epoch.valueOf()

const generateRandomPastDate = (): number => { // thanks to https://stackoverflow.com/a/60180035/437506
    const fromTime = epoch.getTime();
    const toTime = new Date().getTime();
    return new Date(fromTime + Math.random() * (toTime - fromTime)).valueOf();
}

export function findDaysDifference(start : Date, end : Date) : number {
    const normalizedStart = new Date(start.getFullYear(), start.getMonth(), start.getDate());
    const normalizedEnd = new Date(end.getFullYear(), end.getMonth(), end.getDate());
    var days = Math.round((normalizedEnd.getTime() - normalizedStart.getTime()) / (1000 * 60 * 60 * 24));
    return days;
  }
  
  export function findDaysDifferenceFromToday(date : Date) : number {
    return findDaysDifference(new Date(), date);
  }
  
export const getWordOfDay = () => {
    const url = new URL(window.location.href);

    // January 1, 2022 Game Epoch
    var todayDate = new Date();
    var todayParam = url.searchParams.get("today");
    if (todayParam) {
      todayDate = new Date(todayParam+"T00:00:00"); // Convert to Local
      // don't allow future dates

      if (findDaysDifference(todayDate, new Date()) < 0)
        todayDate = new Date();
    }

    const now = todayDate.getTime() // Date.now()
    const msInDay = 86400000
    const today = Math.floor((now - epochMs) / msInDay)
    const nextday = (today + 1) * msInDay + epochMs
    let picked: number
    if (RANDOM_DATE) {
        picked = generateRandomPastDate()
    } else {
        picked = today
    }

    let word = WORDS[picked % WORDS.length];
    return {
        solution: word,
        solutionIndex: today,
        tomorrow: nextday,
    }
}

export const {solution, solutionIndex, tomorrow} = getWordOfDay()
