import { solution } from './words'

export type CharStatus = 'absent' | 'present' | 'correct' | 'unknown'

export type CharValue =
| '-'
| 'अ'
| 'आ'
| 'इ'
| 'ई'
| 'उ'
| 'ऊ'
| 'ए'
| 'ऐ'
| 'ओ'
| 'औ'
| 'अं'
| 'अः'
| 'क'
| 'ख'
| 'ग'
| 'घ'
| 'ङ'
| 'च'
| 'छ'
| 'ज'
| 'झ'
| 'ञ'
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
| 'ष'
| 'स'
| 'ह'
| 'ळ'
| 'क्ष'
| 'ज्ञ'
| 'श्र'

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
export type Akshar = {chrList: CharValue[], swaranshList: Swaransh[], chrForm:string};
export type AksharStatus = {akshar: Akshar, status: CharStatus};

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

export function getPoornaShabda( akshars: Akshar[]) : string {
  let retval:string = "";
  akshars.forEach((val:Akshar) => {
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
export function getAksharsOld(shabda:string) : CharForm[] {
  let AllCharValues  = ['अ','आ','इ','ई','उ','ऊ','ए','ऐ','ओ','औ','अं','अः','क','ख','ग','घ','ङ','च','छ','ज','झ','ञ','ट','ठ','ड','ढ','ण','त','थ','द','ध','न','प','फ','ब','भ','म','य','र','ल','व','श','ष','स','ह','ळ','क्ष','ज्ञ','श्र'];
  let AllSwaransh = [0x0902, 0x093e, 0x093f, 0x0940, 0x0941, 0x0942, 0x0943, 0x0945, 0x0946, 0x0947, 0x0948, 0x0949, 0x094a, 0x094b, 0x094c, 0x094f, 0x0971];
  // console.log("Calling getAkshars");
  // console.log("initializing AllChars");
  console.log("Calling getAkshars OLD with: ", shabda);
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

    console.log("getAksharsOld returning: ", akshars);
    return akshars;
}

export function getAkshars(shabda:string) : CharForm[] {
  console.log("Calling getAkshars New with: ", shabda);
  let akshars:Akshar[] = getPoornaAkshars(shabda);
  let charForms:CharForm[] = [];

    for (var i = 0; i < akshars.length; i++) {
      let akshar:Akshar = akshars[i];
      charForms.push({chr : akshar.chrList[0], chrForm : akshar.chrForm});
    }

  console.log("getAksharsNew returning: ", charForms);
  return charForms;

} 

export function getPoornaAkshars(shabda:string) : Akshar[] {
  let AllCharValues  = ['अ','आ','इ','ई','उ','ऊ','ए','ऐ','ओ','औ','अं','अः','क','ख','ग','घ','ङ','च','छ','ज','झ','ञ','ट','ठ','ड','ढ','ण','त','थ','द','ध','न','प','फ','ब','भ','म','य','र','ल','व','श','ष','स','ह','ळ','क्ष','ज्ञ','श्र'];
  let AllSwaransh = [0x0902, 0x093e, 0x093f, 0x0940, 0x0941, 0x0942, 0x0943, 0x0945, 0x0946, 0x0947, 0x0948, 0x0949, 0x094a, 0x094b, 0x094c, 0x094f, 0x0971];
  let AksharBreak = 0x094D;
  // console.log("Calling getAkshars");
  // console.log("initializing AllChars");
  let akshars:Akshar[] = [];
  let ch:CharValue = '-'; // use constant
  let form:string = "";
  let swaranshs:Swaransh[] = [];
  let chars:CharValue[] = [];
  // let sList:Swaransh[] = [];
  // let found:boolean = false;
    for (var i = 0; i < shabda.length; i++) {
      let alpha = shabda.charAt(i);
      let firstChar = alpha.charAt(0);
      let firstCharCode = alpha.charCodeAt(0);
      if (AllCharValues.includes(firstChar)) {
          if (ch !== '-') {
            console.log("Pushing ", ch, " form ", form);
            let poornaAkshar:Akshar = {chrList : chars, swaranshList: swaranshs, chrForm : form};
            akshars.push(poornaAkshar);
            swaranshs = []; // clear
            chars = []; // clear
            form = ""; // clear
          }
          ch = firstChar as CharValue;
          chars.push(ch);
          form = form.concat(firstChar);
      } else if (AllSwaransh.includes(firstCharCode)) {
          form = form.concat(firstChar);
          swaranshs.push(firstCharCode as Swaransh);
          //console.log("Char ", alpha, " form ", form);
      } else if (firstCharCode === AksharBreak) {
          form = form.concat(firstChar);
          ch = '-';
      } else {
          console.log("<HVN>Invalid character: ", alpha);
      }
    }
    //console.log("Pushing ", ch, " form ", form);
    let lastAkshar:Akshar = {chrList : chars, swaranshList: swaranshs, chrForm : form};
    akshars.push(lastAkshar);

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

