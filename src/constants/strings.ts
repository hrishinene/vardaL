import {MAX_WORD_LENGTH} from "./settings";
import GitInfo from 'react-git-info/macro';

export const GAME_TITLE = 'शब्दक-१'
// export const GAME_SUBTITLE = GitInfo().branch?.toLowerCase() === 'prod'? '' : 'beta'
export const GAME_VERSION = GitInfo().commit.shortHash || 'unknown'
export const GAME_URL = 'shabdak1.shabdak.com'  // TODO #17
export const WIN_MESSAGES = ['फारच छान, हा शब्द लगेच आला!', 'अरे वा! मस्त!', 'उत्तम, पण थोडा वेळ लागला का?']
export const GAME_COPIED_MESSAGE = 'आता व्हॉट्सॅप् वर पेस्ट करा'
export const ABOUT_GAME_MESSAGE = `रसिकहो, नमस्कार!`
export const NOT_ENOUGH_LETTERS_MESSAGE = `निदान ${MAX_WORD_LENGTH} तरी अक्षरं हवीत!`
export const CORRECT_WORD_MESSAGE = (solution: string) =>
    `आजचा शब्द आहे "${solution}"! हरकत नाही, प्रयत्ने वाळूचे ...`
export const ENTER_TEXT = '\u2713'
export const DELETE_TEXT = '\u232B'
export const WORD_NOT_FOUND_MESSAGE = `हा कुठला शब्द? दुसरा निवडा! (${DELETE_TEXT} कळ वापरा)`
export const STATISTICS_TITLE = 'काही आकडे'
export const GUESS_DISTRIBUTION_TEXT = 'तुमचे प्रयत्न असे होते'
export const GUESS_DISTRIBUTION_SUBTEXT = '(उजवीकडे: ओळखलेली शब्दसंख्या, डावीकडे: लागलेले प्रयत्न)'
export const NEW_WORD_TEXT = 'पुन्हा आपली भेट'
export const SHARE_TEXT = 'व्हॉट्सॅप् वर कळवा!'
export const TOTAL_TRIES_TEXT = 'तुमचे शब्द ओळखण्याचे एकूण प्रयत्न'
export const SUCCESS_RATE_TEXT = 'कितीदा ओळखलात?'
export const CURRENT_STREAK_TEXT = 'सध्या सलग कितीदा ओळखताय?'
export const BEST_STREAK_TEXT = 'सगळ्यात जास्त सलग कितीदा ओळखलात?'
export const BINGO_MESSAGE = 'पहिल्या फटक्यात! भले शाब्बास! अचाट काम! ㊗'
export const SOS_MESSAGE = 'वाचलात!'
