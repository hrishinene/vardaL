import Countdown from 'react-countdown'
import { StatBar } from '../stats/StatBar'
import { Histogram } from '../stats/Histogram'
import { GameStats } from '../../lib/localStorage'
import { shareStatus } from '../../lib/share'
import { tomorrow } from '../../lib/words'
import { BaseModal } from './BaseModal'
import {
  STATISTICS_TITLE,
  GUESS_DISTRIBUTION_TEXT,
  GUESS_DISTRIBUTION_SUBTEXT,
  NEW_WORD_TEXT,
  SHARE_TEXT,
} from '../../constants/strings'

import {FORM_LINK} from "../../constants/settings";
type Props = {
  isOpen: boolean
  handleClose: () => void
  guesses: string[]
  gameStats: GameStats
  isGameLost: boolean
  isGameWon: boolean
  handleShare: () => void
}

export const StatsModal = ({
  isOpen,
  handleClose,
  guesses,
  gameStats,
  isGameLost,
  isGameWon,
  handleShare,
}: Props) => {
  if (gameStats.totalGames <= 0) {
    return (
      <BaseModal
        title={STATISTICS_TITLE}
        isOpen={isOpen}
        handleClose={handleClose}
      >
        <StatBar gameStats={gameStats} />
        <hr className="border-solid border-t-2 border-slate-500" />
        <p className="text-gray-800 dark:text-gray-400 text-center justify-items-center">
          हे खेळही नक्की खेळून पहा 
        </p>
        <ul className="list-none">
          <li><a href="http://www.shabdak.com" className="text-l underline decoration-indigo-500 decoration-2">लोकप्रिय जोडाक्षरी शब्दक(३)</a></li>
          <li><a href="http://shabdabandha.shabdak.com" className="text-l underline decoration-indigo-500 decoration-2">मनोरंजक बहुरंगी शब्दबंध</a></li>
        </ul>
      </BaseModal>
    )
  }
  return (
    <BaseModal
      title={STATISTICS_TITLE}
      isOpen={isOpen}
      handleClose={handleClose}
    >
      <StatBar gameStats={gameStats} />
      <h4 className="text-lg leading-6 font-medium text-gray-900 dark:text-gray-100">
        {GUESS_DISTRIBUTION_TEXT}
      </h4>
      <h5 className="text-sm leading-6 font-tiny text-gray-700 dark:text-gray-100">
        {GUESS_DISTRIBUTION_SUBTEXT}
      </h5>
      <Histogram gameStats={gameStats} />
      {(isGameLost || isGameWon) && (
        <div className="mt-5 sm:mt-6 columns-2 dark:text-white">
          <div>
            <h5>{NEW_WORD_TEXT}</h5>
            <Countdown
              className="text-lg font-medium text-gray-900 dark:text-gray-100"
              date={tomorrow}
              daysInHours={true}
            />
          </div>
          <button
            type="button"
            className="mt-2 w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
            onClick={() => {
              shareStatus(guesses, isGameLost)
              handleShare()
            }}
          >
            {SHARE_TEXT}
          </button>
          <button
              type="button"
              className="mt-2 w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:text-sm mb-4"
          >
            <a href={FORM_LINK} rel="noopener noreferrer"> तुमची प्रतिक्रिया? </a>
          </button>
        </div>
      )}
      <hr className="border-solid border-t-2 border-slate-500 mb-2" />
      <p className="text-gray-800 dark:text-gray-400 text-center justify-items-center">
        हे खेळही नक्की खेळून पहा:
      </p>
      <ul className="list-none">
        <li><a href="http://www.shabdak.com" className="text-l underline decoration-indigo-500 decoration-2">लोकप्रिय जोडाक्षरी शब्दक(३)</a></li>
        <li><a href="http://shabdabandha.shabdak.com" className="text-l underline decoration-indigo-500 decoration-2">मनोरंजक बहुरंगी शब्दबंध</a></li>
      </ul>

    </BaseModal>
  )
}
