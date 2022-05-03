import { solution } from './words'

export type CharStatus = 'absent' | 'present' | 'correct' | 'unknown'

export type CharValue =
  | '-'
  | 'अ'
  | 'आ'
  | 'इ'
  | 'ई'
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

  
  /** Unicode Util section - String utilities involving Unicode */
// export type Akshar = {chr : CharValue, swaranshList:Swaransh[], chrForm:string};
export type CharForm = {chr : CharValue, chrForm:string};
export type CharStatus2 = {chrForm : CharForm, status:CharStatus};

export function unicodeMatch(src:string, tgt:string) : boolean {
  var srcAkshare:CharForm[] = getAkshars(src);
  var tgtAkshare:CharForm[] = getAkshars(tgt);
  if (srcAkshare.length !== tgtAkshare.length) return false;

  for (var i =0; i < srcAkshare.length; i++ ) {
    if (srcAkshare[i].chr !== tgtAkshare[i].chr) return false;    
  }
  return true;
}

export function getShabda( akshars: CharForm[]) : string {
  let retval:string = "";
  akshars.forEach((val:CharForm) => {
  retval = retval.concat(val.chrForm);
  })
  return retval;
}

export function isRepeatAkshar(shabda : CharForm[]):boolean {
    //for (var i = 0; i < shabda.length; i++) {
      //var alpha:CharForm = shabda[i];
//
      //for (var j = i+1; j < shabda.length; j++) {
        //var beta:CharForm = shabda[j];
        //if (alpha.chr === beta.chr) return true;
      //}
    //}
    // console.log("Akshar not repeat: ", JSON.stringify(shabda) );
    return false;
}

// This is major - what it does is, from string creates CharForm array.
// CharForm is nothing but CharValue and its form.
// One character can have multiple forms too... that's addition now.
export function getAkshars(shabda:string) : CharForm[] {
  let AllCharValues  = ['अ','आ','इ','ई','उ','ऊ','ए','ऐ','ओ','औ','अं','अः','क','ख','ग','घ','ङ','च','छ','ज','झ','ञ','ट','ठ','ड','ढ','ण','त','थ','द','ध','न','प','फ','ब','भ','म','य','र','ल','व','श','ष','स','ह','ळ','क्ष','ज्ञ'];
  let AllSwaransh = [0x0902, 0x093e, 0x093f, 0x0940, 0x0941, 0x0942, 0x0943, 0x0945, 0x0946, 0x0947, 0x0948, 0x0949, 0x094a, 0x094b, 0x094c, 0x094f, 0x0971];
  // console.log("Calling getAkshars");
  // console.log("initializing AllChars");
  let akshars:CharForm[] = [];
  let ch:CharValue = '-'; // use constant
  let form:string = "";
  // let sList:Swaransh[] = [];
  // let found:boolean = false;
    for (var i = 0; i < shabda.length; i++) {
      let alpha = shabda.charAt(i);
      if (AllCharValues.includes(alpha.charAt(0))) {
          if (ch !== '-') {
            //console.log("Pushing ", ch, " form ", form);
            let ChForm:CharForm = {chr : ch, chrForm : form};
            akshars.push(ChForm);
          }
          ch = alpha.charAt(0) as CharValue;
          form = ch;
      } else if (AllSwaransh.includes(alpha.charCodeAt(0))) {
          form = form.concat(alpha.charAt(0));
          //console.log("Char ", alpha, " form ", form);
      } else {
          console.log("<HVN>Invalid character: ", alpha);
      }
    }
    //console.log("Pushing ", ch, " form ", form);
    let chForm:CharForm = {chr : ch, chrForm : form};
    akshars.push(chForm);

    return akshars;
}

export function getCharForm(ch:CharValue, str : string) : CharForm {
    let akshars:CharForm[] = getAkshars(str);
    for (var i = 0; i < akshars.length; i++) {
      if (akshars[i].chr === ch)
        return akshars[i];
    }
    return {chr:"-", chrForm:"-"};
}

// <HVN> Give a word and CharForm, match and return form and status
export function getStatus(splitSolution:CharForm[], chrForm:CharForm, indx : number) : CharStatus2 {
  var solutionIndx:number = findIndexOf(splitSolution, chrForm);
   //console.log("<HVN>Checking match: ", JSON.stringify(chrForm) );

  if (solutionIndx < 0 || solutionIndx > splitSolution.length) {
    // console.log("<HVN>No match: ", JSON.stringify(chrForm) );
    return {chrForm : {chr : chrForm.chr, chrForm : chrForm.chrForm}, status : 'absent'};
  }

  if (solutionIndx === indx) {
    // console.log("<HVN>Exact match: ", solutionIndex, "-", JSON.stringify(splitSolution[solutionIndx]) );
    return {chrForm : {chr : chrForm.chr, chrForm : splitSolution[solutionIndx].chrForm}, status : 'correct'};
  }

  // console.log("<HVN>Approximate match: ", solutionIndex, "-", JSON.stringify(splitSolution[solutionIndx]) );
  return {chrForm : {chr : chrForm.chr, chrForm : splitSolution[solutionIndx].chrForm}, status : 'present'};
}

export function findIndexOf(splitSolution:CharForm[], letter:CharForm) : number {
  // console.log("<HVN>Find Index - source = ", JSON.stringify(splitSolution), " target - " , JSON.stringify(letter));
    for (var i = 0; i < splitSolution.length; i++) {
      let form:CharForm = splitSolution[i];
      if (form.chr === letter.chr) {
          return i;
      } 
    }

    return -1;
}

export function isIncluded(splitSolution:CharForm[], letter:CharForm) : boolean {
  let indx:number = findIndexOf(splitSolution, letter);
  return indx > -1 && indx < splitSolution.length;
}

export const KeyVal = (statusMap : {[key: string]: CharStatus2 }, txt:string) : CharStatus2 =>{
    var retval : CharStatus2 = statusMap[txt];
    if (retval) return retval;

    return {chrForm:{chr : txt as CharValue, chrForm : txt}, status : 'unknown' };
}
/** Unicode section over */

// export const getStatuses_1 = (
//   guesses: string[]
// ): { [key: string]: CharStatus } => {
//   const charObj: { [key: string]: CharStatus } = {}

//   guesses.forEach((word) => {
//     //console.log("Guess: ", word, "Akshare: " + JSON.stringify(getAkshars(word)));
//     word.split('').forEach((letter, i) => {
//     //console.log("Solution: ", solution, "Akshare: " + JSON.stringify(getAkshars(solution)));
//       if (!solution.includes(letter)) {
//         // make status absent
//         return (charObj[letter] ='absent');
//       }

//       if (letter === solution[i]) {
//         //make status correct
//         return (charObj[letter] = 'correct')
//       }

//       if (charObj[letter] !== 'correct') {
//         //make status present
//         return (charObj[letter] = 'present')
//       }
//     })
//   })

//   return charObj
// }



// export const getGuessStatuses_1 = (guess: string): CharStatus[] => {
//   const splitSolution = solution.split('')
//   const splitGuess = guess.split('')

//   const solutionCharsTaken = splitSolution.map((_) => false)

//   const statuses: CharStatus[] = Array.from(Array(guess.length))

//     // console.log("<HVN>splitSolution = ", splitSolution);
//     // console.log("<HVN>splitGuess = ", splitGuess);
//   // handle all correct cases first
//   splitGuess.forEach((letter, i) => {
//     // console.log("<HVN>splitGuess.forEach letter = ", letter, " index = " + i);
//     if (letter === splitSolution[i]) {
//       statuses[i] = 'correct'
//       solutionCharsTaken[i] = true
//       return
//     }
//   })

//   splitGuess.forEach((letter, i) => {
//     if (statuses[i]) return

//     if (!splitSolution.includes(letter)) {
//       // handles the absent case
//       statuses[i] = 'absent'
//       return
//     }

//     // now we are left with "present"s
//     const indexOfPresentChar = splitSolution.findIndex(
//       (x, index) => x === letter && !solutionCharsTaken[index]
//     )

//     if (indexOfPresentChar > -1) {
//       statuses[i] = 'present'
//       solutionCharsTaken[indexOfPresentChar] = true
//       return
//     } else {
//       statuses[i] = 'absent'
//       return
//     }
//   })

//     // console.log("<HVN>statuses = ", statuses);
//   return statuses
// }

/**
 * HVN code to convert to forms
 * @param guesses 
 */
export const getStatuses = (
  guesses: string[]
): { [key: string]: CharStatus2 } => {
  const charObj: { [key: string]: CharStatus2 } = {};

  // console.log("Solution: ", solution, "Akshare: " + JSON.stringify(getAkshars(solution)));

  guesses.forEach((word) => {
    //console.log("Guess: ", word, "Akshare: " + JSON.stringify(getAkshars(word)));

    getAkshars(word).forEach((charForm:CharForm, i:number) => {
      // Iterate over solution to find exact form and match
      return charObj[charForm.chr]=getStatus(getAkshars(solution), charForm, i);
    });
});
  return charObj;
}

export const getGuessStatuses = (guess: string): CharStatus2[] => {
  const splitSolution:CharForm[] = getAkshars(solution);
  const splitGuess:CharForm[] = getAkshars(guess);

  const solutionCharsTaken = splitSolution.map((_) => false)

  const statuses: CharStatus2[] = Array.from(Array(guess.length))

    //console.log("<HVN>splitSolution = ", JSON.stringify(splitSolution));
    //console.log("<HVN>splitGuess = ", JSON.stringify(splitGuess));
  // handle all correct cases first
  splitGuess.forEach((letter:CharForm, i) => {
    // console.log("<HVN>splitGuess.forEach letter = ", letter, " index = " + i);
    if (letter.chr === splitSolution[i].chr) {
      statuses[i] = {chrForm:{chr : letter.chr, chrForm : splitSolution[i].chrForm}, status : 'correct'}
      solutionCharsTaken[i] = true
      return
    }
  })

  splitGuess.forEach((letter:CharForm, i) => {
    if (statuses[i]) return

    if (!isIncluded(splitSolution, letter)) {
      // handles the absent case
      statuses[i] = {chrForm:{chr : letter.chr, chrForm : letter.chrForm}, status : 'absent'};
      return
    }

    // now we are left with "present"s
    const index =findIndexOf(splitSolution, letter);

    if (!solutionCharsTaken[i] && index > -1) {
      statuses[i] = {chrForm:{chr : letter.chr, chrForm : splitSolution[i].chrForm}, status : 'present'};
      solutionCharsTaken[index] = true
      return
    } else {
      statuses[i] = {chrForm:{chr : letter.chr, chrForm : letter.chrForm}, status : 'absent'};
      return
    }
  })

    // console.log("<HVN>statuses = ", statuses);
  return statuses
}

