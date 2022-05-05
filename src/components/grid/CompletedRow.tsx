import { CharForm, getStatuses } from '../../lib/statuses'
import { getAkshars } from '../../lib/statuses'
// import { getGuessStatuses } from '../../lib/statuses'
import { KeyVal } from '../../lib/statuses'
import { Cell } from './Cell'

type Props = {
  guess: string
  onChar: (value: string) => void
}

export const CompletedRow = ({ guess, onChar }: Props) => {
  // const statuses = getGuessStatuses(guess);
  const charstatuses = getStatuses([guess]);
  const guessChars : CharForm[] = getAkshars(guess);

  return (
    <div className="flex justify-center mb-1">
      {
        guessChars.map((letter, i) => (
        <Cell key={i} value={KeyVal(charstatuses, letter.chr).chrForm.chrForm} onChar={onChar} status={KeyVal(charstatuses, letter.chr).status} size='small' />
        )
      )
    }
    </div>
  )
}
