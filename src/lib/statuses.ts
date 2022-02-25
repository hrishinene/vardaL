import { solution } from './words'

export type CharStatus = 'absent' | 'present' | 'correct'

export type CharValue =
  | '-'
  | 'अ'
  | 'आ'
  | 'ई'
  // | 'इ'
  | 'क'
  | 'ख'
  | 'ग'
  | 'घ'
  | 'च'
  | 'छ'
  | 'ज'
  | 'झ'
  | 'ट'
  | 'ठ'
  | 'ड'
  | 'ढ'
  | 'ण'
  | 'त'
  | 'थ'
  | 'द'
  | 'ध'
  | 'न'
  | 'प'
  | 'फ'
  | 'ब'
  | 'भ'
  | 'म'
  | 'य'
  | 'र'
  | 'ल'
  | 'व'
  | 'श'
  | 'स'
  | 'ष'
  | 'ह'
  | 'क्ष'
  | 'ज्ञ'
  | 'ळ'

  export type Swaransh =
  0x0902
  | 0x093e
  | 0x093f
  | 0x0940
  | 0x0941
  | 0x0942
  | 0x0943
  | 0x0945
  | 0x0946
  | 0x0947
  | 0x0948
  | 0x0949
  | 0x094a
  | 0x094b
  | 0x094c
  | 0x094f
  | 0x0971; 

export const AllCharValues =['अ', 'आ', 'ई', 'इ', 'क', 'ख', 'ग', 'घ', 'च', 'छ', 'ज', 'झ', 'ट', 'ठ', 'ड', 'ढ', 'ण', 'त', 'थ', 'द', 'ध', 'न', 'प', 'फ', 'ब', 'भ', 'म', 'य', 'र', 'ल', 'व', 'श', 'स', 'ष', 'ह', 'ळ'];
export const AllSwaransh = [0x0902, 0x093e, 0x093f, 0x0940, 0x0941, 0x0942, 0x0943, 0x0945, 0x0946, 0x0947, 0x0948, 0x0949, 0x094a, 0x094b, 0x094c, 0x094f, 0x0971];
  
  /** Unicode Util section - String utilities involving Unicode */
// export type Akshar = {chr : CharValue, swaranshList:Swaransh[], chrForm:string};
export type CharForm = {chr : CharValue, chrForm:string};
export type CharStatus2 = {chrForm : CharForm, status:CharStatus};

export function getAkshars(shabda:string) {
  let akshars:CharForm[] = [];
  let ch:CharValue = '-'; // use constant
  let form:string = "";
  // let sList:Swaransh[] = [];
  // let found:boolean = false;
    for (var i = 0; i < shabda.length; i++) {
      let alpha = shabda.charAt(i);
      if (AllCharValues.includes(alpha.charAt(0))) {
          if (ch !== '-') {
            console.log("Pushing ", ch, " form ", form);
            let ChForm:CharForm = {chr : ch, chrForm : form};
            akshars.push(ChForm);
          }
          ch = alpha.charAt(0) as CharValue;
          form = ch;
      } else if (AllSwaransh.includes(alpha.charCodeAt(0))) {
          form = form.concat(alpha.charAt(0));
          console.log("Char ", alpha, " form ", form);
      } else {
        console.log("Invalid character: ", alpha);
      }
    }
    console.log("Pushing ", ch, " form ", form);
    let ChForm:CharForm = {chr : ch, chrForm : form};
    akshars.push(ChForm);

    return akshars;
}

export function getCharForm(ch:CharValue, str : string) {
    let akshars:CharForm[] = getAkshars(str);
    for (var i = 0; i < akshars.length; i++) {
      if (akshars[i].chr === ch)
        return akshars[i];
    }
    return undefined;
}

// <HVN> Give a word and CharForm, match and return form and status
export function getStatus(master:string, chrForm:CharForm) : CharStatus2 {
  // Temporary
  return {chrForm : {chr : "क", chrForm = "क"}, status : 'correct'};
}
/** Unicode section over */

export const getStatuses = (
  guesses: string[]
): { [key: string]: CharStatus } => {
  const charObj: { [key: string]: CharStatus } = {}

  guesses.forEach((word) => {
    console.log("Guess: ", word, "Akshare: " + JSON.stringify(getAkshars(word)));
    word.split('').forEach((letter, i) => {
    console.log("Solution: ", solution, "Akshare: " + JSON.stringify(getAkshars(solution)));
      if (!solution.includes(letter)) {
        // make status absent
        return (charObj[letter] ='absent');
      }

      if (letter === solution[i]) {
        //make status correct
        return (charObj[letter] = 'correct')
      }

      if (charObj[letter] !== 'correct') {
        //make status present
        return (charObj[letter] = 'present')
      }
    })
  })

  return charObj
}



export const getGuessStatuses = (guess: string): CharStatus[] => {
  const splitSolution = solution.split('')
  const splitGuess = guess.split('')

  const solutionCharsTaken = splitSolution.map((_) => false)

  const statuses: CharStatus[] = Array.from(Array(guess.length))

    console.log("<HVN>splitSolution = ", splitSolution);
    console.log("<HVN>splitGuess = ", splitGuess);
  // handle all correct cases first
  splitGuess.forEach((letter, i) => {
    // console.log("<HVN>splitGuess.forEach letter = ", letter, " index = " + i);
    if (letter === splitSolution[i]) {
      statuses[i] = 'correct'
      solutionCharsTaken[i] = true
      return
    }
  })

  splitGuess.forEach((letter, i) => {
    if (statuses[i]) return

    if (!splitSolution.includes(letter)) {
      // handles the absent case
      statuses[i] = 'absent'
      return
    }

    // now we are left with "present"s
    const indexOfPresentChar = splitSolution.findIndex(
      (x, index) => x === letter && !solutionCharsTaken[index]
    )

    if (indexOfPresentChar > -1) {
      statuses[i] = 'present'
      solutionCharsTaken[indexOfPresentChar] = true
      return
    } else {
      statuses[i] = 'absent'
      return
    }
  })

    console.log("<HVN>statuses = ", statuses);
  return statuses
}

/**
 * HVN code to convert to forms
 * @param guesses 
 */
export const getStatuses2 = (
  guesses: string[]
): { [key: string]: CharStatus2 } => {
  const charObj: { [key: string]: CharStatus2 } = {}

    console.log("Solution: ", solution, "Akshare: " + JSON.stringify(getAkshars(solution)));

  guesses.forEach((word) => {
    console.log("Guess: ", word, "Akshare: " + JSON.stringify(getAkshars(word)));

    getAkshars(word).forEach((charForm:CharForm, i:number) => 
      // Iterate over solution to find exact form and match
      let stat:CharStatus2 = getStatus(solution, charForm);

      if (!solution.includes(letter)) {
        // make status absent
        return (charObj[letter] ='absent');
      }

      if (letter === solution[i]) {
        //make status correct
        return (charObj[letter] = 'correct')
      }

      if (charObj[letter] !== 'correct') {
        //make status present
        return (charObj[letter] = 'present')
      }
    })
  })

  return charObj
}



export const getGuessStatuses2 = (guess: string): CharStatus[] => {
  const splitSolution = solution.split('')
  const splitGuess = guess.split('')

  const solutionCharsTaken = splitSolution.map((_) => false)

  const statuses: CharStatus[] = Array.from(Array(guess.length))

    console.log("<HVN>splitSolution = ", splitSolution);
    console.log("<HVN>splitGuess = ", splitGuess);
  // handle all correct cases first
  splitGuess.forEach((letter, i) => {
    // console.log("<HVN>splitGuess.forEach letter = ", letter, " index = " + i);
    if (letter === splitSolution[i]) {
      statuses[i] = 'correct'
      solutionCharsTaken[i] = true
      return
    }
  })

  splitGuess.forEach((letter, i) => {
    if (statuses[i]) return

    if (!splitSolution.includes(letter)) {
      // handles the absent case
      statuses[i] = 'absent'
      return
    }

    // now we are left with "present"s
    const indexOfPresentChar = splitSolution.findIndex(
      (x, index) => x === letter && !solutionCharsTaken[index]
    )

    if (indexOfPresentChar > -1) {
      statuses[i] = 'present'
      solutionCharsTaken[indexOfPresentChar] = true
      return
    } else {
      statuses[i] = 'absent'
      return
    }
  })

    console.log("<HVN>statuses = ", statuses);
  return statuses
}
