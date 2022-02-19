import { getGuessStatuses } from '../../lib/statuses'
import { Cell } from './Cell'
import {syllables} from "../../lib/devStrUtils";

type Props = {
  guess: string
}

export const CompletedRow = ({ guess }: Props) => {
  const statuses = getGuessStatuses(guess)

  return (
    <div className="flex justify-center mb-1">
      {syllables(guess).map((letter, i) => (
        <Cell key={i} value={letter} status={statuses[i]} />
      ))}
    </div>
  )
}
