import { ChartBarIcon, MoonIcon, SunIcon } from '@heroicons/react/outline'
import { useEffect, useState } from 'react'
import { Alert } from './components/alerts/Alert'
import { Grid } from './components/grid/Grid'
import { Keyboard } from './components/keyboard/Keyboard'
import { AboutModal } from './components/modals/AboutModal'
import { InfoModal } from './components/modals/InfoModal'
import { StatsModal } from './components/modals/StatsModal'
import {
  BINGO_MESSAGE,
  CORRECT_WORD_MESSAGE,
  GAME_COPIED_MESSAGE,
  GAME_TITLE,
  NOT_ENOUGH_LETTERS_MESSAGE,
  SOS_MESSAGE,
  WIN_MESSAGES,
  WORD_NOT_FOUND_MESSAGE,
} from './constants/strings'
import { MAX_CHALLENGES, MAX_WORD_LENGTH } from './constants/settings'
import { isWinningWord, isWordInWordList, solution } from './lib/words'
import { addStatsForCompletedGame, loadStats } from './lib/stats'
import {
  loadGameStateFromLocalStorage,
  saveGameStateToLocalStorage,
} from './lib/localStorage'

import './App.css'
import {
  DotsVerticalIcon,
  QuestionMarkCircleIcon,
} from '@heroicons/react/solid'
import { syllables } from './lib/devStrUtils'
import { AppMenu } from './components/menu/Menu'

const ALERT_TIME_MS = 3000

const aboutModalLast = 'aboutModalLast'

function App() {
  const prefersDarkMode = window.matchMedia(
    '(prefers-color-scheme: dark)'
  ).matches

  const [currentGuess, setCurrentGuess] = useState('')
  const [isGameWon, setIsGameWon] = useState(false)
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false)

  const showAboutModalOnLoad = (): boolean => {
    let lastDate = localStorage.getItem(aboutModalLast)
    if (!lastDate) {
      return true
    }
    let diff = Math.floor(
      (Date.parse(new Date().toString()) - Date.parse(lastDate)) / 86400000
    )
    return diff > 15 // show it every 15 days or so
  }

  const [isAboutModalOpen, setIsAboutModalOpen] = useState(
    showAboutModalOnLoad()
  )
  const [isNotEnoughLetters, setIsNotEnoughLetters] = useState(false)
  const [isStatsModalOpen, setIsStatsModalOpen] = useState(false)
  const [isWordNotFoundAlertOpen, setIsWordNotFoundAlertOpen] = useState(false)
  const [isGameLost, setIsGameLost] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem('theme')
      ? localStorage.getItem('theme') === 'dark'
      : prefersDarkMode
      ? true
      : false
  )
  const [successAlert, setSuccessAlert] = useState('')
  const [guesses, setGuesses] = useState<string[]>(() => {
    const loaded = loadGameStateFromLocalStorage()
    if (loaded?.solution !== solution) {
      return []
    }
    const gameWasWon = loaded.guesses.includes(solution)
    if (gameWasWon) {
      setIsGameWon(true)
    }
    if (loaded.guesses.length === MAX_CHALLENGES && !gameWasWon) {
      setIsGameLost(true)
    }
    return loaded.guesses
  })

  const [stats, setStats] = useState(() => loadStats())

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDarkMode])

  const handleDarkMode = (isDark: boolean) => {
    setIsDarkMode(isDark)
    localStorage.setItem('theme', isDark ? 'dark' : 'light')
  }
  const handleAboutModalClose = () => {
    localStorage.setItem(aboutModalLast, new Date().toString())
    setIsAboutModalOpen(false)
  }

  useEffect(() => {
    saveGameStateToLocalStorage({ guesses, solution })
  }, [guesses])

  useEffect(() => {
    function getWinMessage(guesses: string[], messages: string[]) {
      // could use unit testing, but it is pretty straightforward!
      let glen = guesses.length
      if (glen === 1) {
        return BINGO_MESSAGE
      }
      if (glen === MAX_CHALLENGES) {
        return SOS_MESSAGE
      }
      return messages[Math.floor((glen * messages.length) / MAX_CHALLENGES)]
    }

    if (isGameWon) {
      setSuccessAlert(getWinMessage(guesses, WIN_MESSAGES))
      setTimeout(() => {
        setSuccessAlert('')
        setIsStatsModalOpen(true)
      }, ALERT_TIME_MS)
    }
    if (isGameLost) {
      setTimeout(() => {
        setIsStatsModalOpen(true)
      }, ALERT_TIME_MS)
    }
  }, [isGameWon, isGameLost, guesses])

  const onChar = (value: string) => {
    if (
      syllables(currentGuess).length < MAX_WORD_LENGTH &&
      guesses.length < MAX_CHALLENGES &&
      !isGameWon
    ) {
      setCurrentGuess(`${currentGuess}${value}`)
    }
  }

  const onDelete = () => {
    const p = syllables(currentGuess).slice(0, -1).join('')
    setCurrentGuess(p)
  }

  const onEnter = () => {
    if (isGameWon || isGameLost) {
      return
    }
    if (!(syllables(currentGuess).length === MAX_WORD_LENGTH)) {
      setIsNotEnoughLetters(true)
      return setTimeout(() => {
        setIsNotEnoughLetters(false)
      }, ALERT_TIME_MS)
    }
    if (!isWordInWordList(currentGuess)) {
      setIsWordNotFoundAlertOpen(true)
      return setTimeout(() => {
        setIsWordNotFoundAlertOpen(false)
      }, ALERT_TIME_MS)
    }

    const winningWord = isWinningWord(currentGuess)
    if (
      syllables(currentGuess).length === MAX_WORD_LENGTH &&
      guesses.length < MAX_CHALLENGES &&
      !isGameWon
    ) {
      setGuesses([...guesses, currentGuess])
      setCurrentGuess('')

      if (winningWord) {
        setStats(addStatsForCompletedGame(stats, guesses.length))
        return setIsGameWon(true)
      }

      if (guesses.length === MAX_CHALLENGES - 1) {
        setStats(addStatsForCompletedGame(stats, guesses.length + 1))
        setIsGameLost(true)
      }
    }
  }

  return (
    <div className="w-full absolute flex flex-col overflow-hidden h-full">
      <div className="flex container mt-2">
        <AppMenu dark={isDarkMode} />
        <h1 className="text-3xl ml-4 grow font-bold dark:text-white text-center">
          {GAME_TITLE}
        </h1>
        <div className="flex justify-items-end">
          {isDarkMode ? (
            <SunIcon
              className="h-6 w-6 mr-2 cursor-pointer dark:stroke-white"
              onClick={() => handleDarkMode(!isDarkMode)}
            />
          ) : (
            <MoonIcon
              className="h-6 w-6 mr-2 cursor-pointer"
              onClick={() => handleDarkMode(!isDarkMode)}
            />
          )}
          <QuestionMarkCircleIcon
            className="h-6 w-6 mr-2 cursor-pointer dark:stroke-white"
            onClick={() => setIsInfoModalOpen(true)}
          />
          <ChartBarIcon
            className="h-6 w-6 mr-3 cursor-pointer dark:stroke-white"
            onClick={() => setIsStatsModalOpen(true)}
          />
          <DotsVerticalIcon
            className="h-6 w-6 mr-3 cursor-pointer dark:stroke-white"
            onClick={() => setIsAboutModalOpen(true)}
          />
        </div>
      </div>
      <hr className="border-solid border-t-2 border-slate-500" />
      <Grid guesses={guesses} currentGuess={currentGuess} />
      <Keyboard
        onChar={onChar}
        onDelete={onDelete}
        onEnter={onEnter}
        guesses={guesses}
      />
      <InfoModal
        isOpen={isInfoModalOpen}
        handleClose={() => setIsInfoModalOpen(false)}
      />
      <StatsModal
        isOpen={isStatsModalOpen}
        handleClose={() => setIsStatsModalOpen(false)}
        guesses={guesses}
        gameStats={stats}
        isGameLost={isGameLost}
        isGameWon={isGameWon}
        handleShare={() => {
          setSuccessAlert(GAME_COPIED_MESSAGE)
          return setTimeout(() => setSuccessAlert(''), ALERT_TIME_MS)
        }}
      />
      <AboutModal
        isOpen={isAboutModalOpen}
        handleClose={() => handleAboutModalClose()}
      />

      {/*<button*/}
      {/*  type="button"*/}
      {/*  className="mx-auto mt-8 flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 select-none"*/}
      {/*  onClick={() => setIsAboutModalOpen(true)}*/}
      {/*>*/}
      {/*  {ABOUT_GAME_MESSAGE}*/}
      {/*</button>*/}

      <Alert message={NOT_ENOUGH_LETTERS_MESSAGE} isOpen={isNotEnoughLetters} />
      <Alert
        message={WORD_NOT_FOUND_MESSAGE}
        isOpen={isWordNotFoundAlertOpen}
      />
      <Alert message={CORRECT_WORD_MESSAGE(solution)} isOpen={isGameLost} />
      <Alert
        message={successAlert}
        isOpen={successAlert !== ''}
        variant="success"
      />
    </div>
  )
}

export default App
