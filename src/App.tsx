import {
  // InformationCircleIcon,
  ChartBarIcon,
  SunIcon,
  MoonIcon,
} from '@heroicons/react/outline'
import { useState, useEffect } from 'react'
import { Alert } from './components/alerts/Alert'
import { Grid } from './components/grid/Grid'
import { Keyboard } from './components/keyboard/Keyboard'
import { AboutModal } from './components/modals/AboutModal'
import { InfoModal } from './components/modals/InfoModal'
import { StatsModal } from './components/modals/StatsModal'
import {
  GAME_TITLE,
  WIN_MESSAGES,
  GAME_COPIED_MESSAGE,
  // ABOUT_GAME_MESSAGE,
  NOT_ENOUGH_LETTERS_MESSAGE,
  WORD_NOT_FOUND_MESSAGE,
  CORRECT_WORD_MESSAGE,
  // GAME_URL,
  GAME_ENCODE_URL,
  GAME_ENCODE_URL_RANDOM,
  GAME_SHABDAK_1_URL,
  GAME_URL,
  GAME_FULL_URL,
} from './constants/strings'
import { MAX_WORD_LENGTH, MAX_CHALLENGES } from './constants/settings'
import {
  isWordInWordList,
  isWinningWord,
  solution,
  wordSource,
} from './lib/words'
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
import { getAkshars, getShabda, unicodeMatch } from './lib/statuses'
import DropdownComponent from './components/DropDownComponent'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

const ALERT_TIME_MS = 2500

function App() {
  const prefersDarkMode = window.matchMedia(
    '(prefers-color-scheme: dark)'
  ).matches

  // initialize
  const [currentGuess, setCurrentGuess] = useState('')
  const [isGameWon, setIsGameWon] = useState(false)
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false)
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false)
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

    const gameWasWon =
      loaded.guesses.length > 0
        ? unicodeMatch(loaded.guesses[loaded.guesses.length - 1], solution)
        : false

    if (gameWasWon) {
      setIsGameWon(true)
    }
    if (loaded.guesses.length === MAX_CHALLENGES && !gameWasWon) {
      setIsGameLost(true)
    }
    return loaded.guesses
  })

  const [stats, setStats] = useState(() => loadStats())

  // Game Date begin
  // Manage Date and Archive
  const [gameDate, setGameDate] = useState<Date>(() => {
    // Check if the date is in the future
    const url = new URL(window.location.href)
    var todayDate = new Date()
    var todayParam = url.searchParams.get('today')
    if (todayParam) todayDate = new Date(todayParam + 'T00:00:00')

    // console.log("todayDate: " + todayDate)

    return todayDate
  })

  const [selectedDate, setSelectedDate] = useState<Date>(() => {
    return gameDate
  })

  const localFormatDate = (date: Date): string => {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0') // Months are zero-based
    const day = String(date.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
  }

  const getDateUrl = (baseUrl: string, date: Date): string => {
    let encoded = baseUrl + '?today=' + localFormatDate(date)
    return encoded
  }

  const handleDateChange = (
    date: Date | null,
    event?: React.SyntheticEvent
  ) => {
    // console.log(date)
    if (date) {
      setSelectedDate(date)
    }
  }

  const navigationLink = () => {
    // console.log("navigate to archive game dated: " + selectedDate)
    return getDateUrl(GAME_ENCODE_URL, selectedDate)
  }

  // --- Game Date over ---

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

  useEffect(() => {
    saveGameStateToLocalStorage({ guesses, solution })
  }, [guesses])

  useEffect(() => {
    if (isGameWon) {
      setSuccessAlert(
        WIN_MESSAGES[Math.floor(Math.random() * WIN_MESSAGES.length)]
      )
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
  }, [isGameWon, isGameLost])

  const onChar = (value: string) => {
    if (
      getAkshars(currentGuess).length < MAX_WORD_LENGTH &&
      // currentGuess.length < MAX_WORD_LENGTH &&
      guesses.length < MAX_CHALLENGES &&
      !isGameWon
    ) {
      let shabda: string = getShabda(getAkshars(value))
      setCurrentGuess(`${currentGuess}${shabda}`)
    }
  }

  const onDelete = () => {
    let akshars = getAkshars(currentGuess)
    setCurrentGuess(getShabda(akshars.slice(0, -1)))
    // setCurrentGuess(currentGuess.slice(0, -1))
  }

  const onEnter = () => {
    //console.log('<HVN> onEnter!')
    if (isGameWon || isGameLost) {
      //console.log('<HVN> Game Won or Lost!')
      return
    }
    //console.log('<HVN> onEnter further checks!')

    var akshars = getAkshars(currentGuess)
    // if (!(currentGuess.length === MAX_WORD_LENGTH)) {
    if (!(akshars.length === MAX_WORD_LENGTH)) {
      setIsNotEnoughLetters(true)
      //console.log('<HVN> Max words check')
      return setTimeout(() => {
        setIsNotEnoughLetters(false)
      }, ALERT_TIME_MS)
    }
    //console.log('<HVN> onEnter further checks2!')
    if (!isWordInWordList(currentGuess)) {
      //console.log('<HVN>invalid words check')
      setIsWordNotFoundAlertOpen(true)
      return setTimeout(() => {
        setIsWordNotFoundAlertOpen(false)
      }, ALERT_TIME_MS)
    }
    //console.log('<HVN> onEnter further checks2!')

    const winningWord = isWinningWord(currentGuess)
    if (
      akshars.length === MAX_WORD_LENGTH &&
      akshars.length === MAX_WORD_LENGTH &&
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

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    const { target } = e

    if (target) {
      target.readOnly = true // -------> this for all others
      target.blur() //  ------> this for ios iphone, TV Browsers, Ipad, Safari
    }
  }

  return (
    <div className="py-8 max-w-7xl mx-auto sm:px-6 lg:px-8">
      {/* <Timer /> Add the Timer component here */}

      <div className="flex container mt-2 items-center">
        {/* left-aligned div */}
        <div className="flex-1 text-left">
          <DropdownComponent />
        </div>

        {/* center-aligned div */}
        <div className="flex-1 flex-col justify-center items-center pb-4 text-center">
          <h1 className="text-5xl font-bold dark:text-white text-center">
            <a href={GAME_FULL_URL} rel="noopener noreferrer">
              {GAME_TITLE}
            </a>
          </h1>
          <div>
            <span className="mt-2 text-2xl text-black dark:text-white">
              {gameDate.toLocaleDateString('mr-IN', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })}
            </span>
          </div>
        </div>
        <div className="flex-1 flex justify-end items-center space-x-2 text-left">
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
            className="h-6 w-6 mr-2 cursor-pointer dark:stroke-white"
            onClick={() => setIsStatsModalOpen(true)}
          />
          <DotsVerticalIcon
            className="h-6 w-6 mr-3 cursor-pointer dark:stroke-white"
            onClick={() => setIsAboutModalOpen(true)}
          />
        </div>
      </div>
      <div className="flex mx-auto items-center">
        {wordSource === 'Daily' ? (
          <h1 className="text-xl grow font-bold dark:text-white bg-green-300 dark:bg-green-900 border-green-600 p-2 rounded">
            <a href={GAME_ENCODE_URL} className="underline font-bold">
              आजचे शब्दक{' '}
            </a>{' '}
          </h1>
        ) : (
          <h1 className="text-xl grow font-bold dark:text-white ml-3">
            <a href={GAME_ENCODE_URL} className="font-bold">
              आजचे शब्दक{' '}
            </a>{' '}
          </h1>
        )}

        {wordSource === 'Random' ? (
          <h1 className="text-xl grow font-bold dark:text-white bg-green-300 dark:bg-green-900 border-green-600 p-2 rounded">
            <a href={GAME_ENCODE_URL_RANDOM} className="underline font-bold">
              सराव शब्दक{' '}
            </a>{' '}
          </h1>
        ) : (
          <h1 className="text-xl grow font-bold dark:text-white ml-3">
            <a href={GAME_ENCODE_URL_RANDOM} className="font-bold">
              सराव शब्दक{' '}
            </a>{' '}
          </h1>
        )}
      </div>
      <hr />
      <div className="mt-1" />
      <Grid guesses={guesses} currentGuess={currentGuess} onChar={onChar} />
      <Keyboard
        onChar={onChar}
        onDelete={onDelete}
        onEnter={onEnter}
        guesses={guesses}
      />
      <hr />
      <div className="text-center py-1 mt-1 space-x-1">
        {/* <h3 className="text-lg font-sans text-black">Create groups of 4!</h3> */}
        <h3 className="text-lg font-bold font-sans text-black dark:text-white">
          शब्दक संग्रहातून
        </h3>
        <div className="text-center flex justify-center mt-2 space-x-2">
          <DatePicker
            selected={selectedDate}
            onChange={handleDateChange}
            minDate={new Date('2023-12-01')}
            maxDate={new Date()}
            dateFormat="MMMM dd, yyyy"
            disabledKeyboardNavigation={false}
            onFocus={handleFocus}
            onKeyDown={(e) => {
              e.preventDefault()
            }}
            className="p-2 rounded-2xl border-1 border-gray-500 dark:border-gray-50 text-center bg-gray-300 dark:bg-gray-100"
          />
        </div>
        <div className="flex justify-center mt-2 space-x-2">
          <button
            className={
              'px-4 py-2 rounded-3xl mb-2 bg-gray-500 dark:bg-gray-50 text-white dark:text-black'
            }
          >
            <a href={navigationLink()} rel="noopener noreferrer">
              खेळा
            </a>
          </button>
        </div>
      </div>
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
        handleClose={() => setIsAboutModalOpen(false)}
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
