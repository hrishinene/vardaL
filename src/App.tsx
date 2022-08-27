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
} from './constants/strings'
import { MAX_WORD_LENGTH, MAX_CHALLENGES } from './constants/settings'
import { isWordInWordList, isWinningWord, solution } from './lib/words'
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
import { getAkshars, getShabda } from './lib/statuses'

const ALERT_TIME_MS = 2500

function App() {
  const prefersDarkMode = window.matchMedia(
    '(prefers-color-scheme: dark)'
  ).matches

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

  return (
    <div className="py-8 mx-auto sm:px-6 lg:px-8">
      <div>
        <h1 className="text-3xl font-bold text-center dark:text-white">
          या पृष्ठावरून आपल्याला &quot;शब्दककोडे&quot; च्या पृष्ठाकडे
          पुनर्निर्देशित (redirect) केले जात आहे...&nbsp;
          <br />
          <span className="text-xl italic">
            {' '}
            <p>
              पृष्ठ न उघडल्यास कृपया{' '}
              <u>
                <a href="http://shabdakkode.shabdak.com">यावर टिचकी मारा</a>
              </u>
              &nbsp;
            </p>
          </span>
        </h1>
        -{' '}
      </div>
      <div className="text-xl text-left dark:text-white">
        <p>
          तुम्हाला "शब्दक" आणि "शब्दक-२" आवडत असतील, तर "शब्दककोडे" नक्की आवडेल
          याची आम्हाला खात्री आहे!
        </p>
        <p>शब्दककोड्यामधे आहेत:</p>
      </div>
      <div className="text-l text-left dark:text-white">
        <ul>
          <li>- बरीच जोडाक्षरं,</li>
          <li>- थोडे अवघड शब्द</li>
          <li>- बरेच मोठे शब्द&nbsp;</li>
          <li>
            -{' '}
            <u>
              <a href="https://bruhadkosh.org">&quot;बृहदकोशाच्या&quot;</a>
            </u>{' '}
            सौजन्यानी खूप खूप जास्त शब्द.&nbsp;
          </li>
          <li>
            - तसेच तुम्ही सोडवलेला शब्द सांकेतिक भाषेत शेअर करून मित्रमंडळींना
            सोडवण्यास देण्याची सुविधा... &nbsp;
          </li>
        </ul>
      </div>
      -
      <div>
        <p>अजूनही काही गमतीजमती जाणून घेण्यासाठी जरूर पहा:&nbsp;</p>
        <br />
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/jU-BLLsCosA"
          title="YouTube video player"
        ></iframe>

        <hr />
      </div>
    </div>
  )
}

export default App
