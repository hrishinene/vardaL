import {KeyValue} from '../../lib/keyboard'
import {getStatuses, CharStatus2, KeyVal} from '../../lib/statuses'
import {Key} from './Key'
import {useEffect} from 'react'
import {ENTER_TEXT, DELETE_TEXT} from '../../constants/strings'

type Props = {
    onChar: (value: string) => void
    onDelete: () => void
    onEnter: () => void
    guesses: string[]
}
export const Keyboard = ({onChar, onDelete, onEnter, guesses}: Props) => {
    const charStatuses:{ [key: string]: CharStatus2 }  = getStatuses(guesses)

    console.log("<HVN>charStatuses = ", JSON.stringify(charStatuses));

    const onClick = (value: KeyValue) => {
        if (value === 'ENTER') {
            onEnter()
        } else if (value === 'DELETE') {
            onDelete()
        } else {
            onChar(value)
        }
    }

    useEffect(() => {
        const listener = (e: KeyboardEvent) => {
            if (e.code === 'Enter') {
                onEnter()
            } else if (e.code === 'Backspace') {
                onDelete()
            } else {
                const key = e.key.toUpperCase()
                if (key.length === 1 && key >= 'A' && key <= 'Z') {
                    onChar(key)
                }
            }
        }
        window.addEventListener('keyup', listener)
        return () => {
            window.removeEventListener('keyup', listener)
        }
    }, [onEnter, onDelete, onChar])

    return (
        <div>
            <div className="flex justify-center mb-1">
                <Key width={60.4} value="ENTER" onClick={onClick}>
                    {ENTER_TEXT}
                </Key>
<Key value={KeyVal(charStatuses, "अ").chrForm.chrForm} onClick={onClick} status={KeyVal(charStatuses, 'अ').status}/>
<Key value={KeyVal(charStatuses, "आ").chrForm.chrForm} onClick={onClick} status={KeyVal(charStatuses, 'आ').status}/>
<Key value={KeyVal(charStatuses, "ई").chrForm.chrForm} onClick={onClick} status={KeyVal(charStatuses, 'ई').status}/>
<Key value={KeyVal(charStatuses, "क").chrForm.chrForm} onClick={onClick} status={KeyVal(charStatuses, 'क').status}/>
<Key value={KeyVal(charStatuses, "ख").chrForm.chrForm} onClick={onClick} status={KeyVal(charStatuses, 'ख').status}/>
<Key value={KeyVal(charStatuses, "ग").chrForm.chrForm} onClick={onClick} status={KeyVal(charStatuses, 'ग').status}/>
<Key value={KeyVal(charStatuses, "घ").chrForm.chrForm} onClick={onClick} status={KeyVal(charStatuses, 'घ').status}/>
<Key value={KeyVal(charStatuses, "च").chrForm.chrForm} onClick={onClick} status={KeyVal(charStatuses, 'च').status}/>
<Key value={KeyVal(charStatuses, "ज").chrForm.chrForm} onClick={onClick} status={KeyVal(charStatuses, 'ज').status}/>
                <Key width={60.4} value="DELETE" onClick={onClick}>
                    {DELETE_TEXT}
                </Key>
            </div>
            <div className="flex justify-center mb-1">
<Key value={KeyVal(charStatuses, "झ").chrForm.chrForm} onClick={onClick} status={KeyVal(charStatuses, 'झ').status}/>
<Key value={KeyVal(charStatuses, "ट").chrForm.chrForm} onClick={onClick} status={KeyVal(charStatuses, 'ट').status}/>
<Key value={KeyVal(charStatuses, "ठ").chrForm.chrForm} onClick={onClick} status={KeyVal(charStatuses, 'ठ').status}/>
<Key value={KeyVal(charStatuses, "ड").chrForm.chrForm} onClick={onClick} status={KeyVal(charStatuses, 'ड').status}/>
<Key value={KeyVal(charStatuses, "ढ").chrForm.chrForm} onClick={onClick} status={KeyVal(charStatuses, 'ढ').status}/>
<Key value={KeyVal(charStatuses, "ण").chrForm.chrForm} onClick={onClick} status={KeyVal(charStatuses, 'ण').status}/>
<Key value={KeyVal(charStatuses, "त").chrForm.chrForm} onClick={onClick} status={KeyVal(charStatuses, 'त').status}/>
<Key value={KeyVal(charStatuses, "थ").chrForm.chrForm} onClick={onClick} status={KeyVal(charStatuses, 'थ').status}/>
<Key value={KeyVal(charStatuses, "द").chrForm.chrForm} onClick={onClick} status={KeyVal(charStatuses, 'द').status}/>
<Key value={KeyVal(charStatuses, "ध").chrForm.chrForm} onClick={onClick} status={KeyVal(charStatuses, 'ध').status}/>
<Key value={KeyVal(charStatuses, "न").chrForm.chrForm} onClick={onClick} status={KeyVal(charStatuses, 'न').status}/>
<Key value={KeyVal(charStatuses, "प").chrForm.chrForm} onClick={onClick} status={KeyVal(charStatuses, 'प').status}/>
<Key value={KeyVal(charStatuses, "फ").chrForm.chrForm} onClick={onClick} status={KeyVal(charStatuses, 'फ').status}/>
            </div>
            <div className="flex justify-center mb-1">
<Key value={KeyVal(charStatuses, "ब").chrForm.chrForm} onClick={onClick} status={KeyVal(charStatuses, 'ब').status}/>
<Key value={KeyVal(charStatuses, "भ").chrForm.chrForm} onClick={onClick} status={KeyVal(charStatuses, 'भ').status}/>
<Key value={KeyVal(charStatuses, "म").chrForm.chrForm} onClick={onClick} status={KeyVal(charStatuses, 'म').status}/>
<Key value={KeyVal(charStatuses, "य").chrForm.chrForm} onClick={onClick} status={KeyVal(charStatuses, 'य').status}/>
<Key value={KeyVal(charStatuses, "र").chrForm.chrForm} onClick={onClick} status={KeyVal(charStatuses, 'र').status}/>
<Key value={KeyVal(charStatuses, "ल").chrForm.chrForm} onClick={onClick} status={KeyVal(charStatuses, 'ल').status}/>
<Key value={KeyVal(charStatuses, "व").chrForm.chrForm} onClick={onClick} status={KeyVal(charStatuses, 'व').status}/>
<Key value={KeyVal(charStatuses, "श").chrForm.chrForm} onClick={onClick} status={KeyVal(charStatuses, 'श').status}/>
<Key value={KeyVal(charStatuses, "स").chrForm.chrForm} onClick={onClick} status={KeyVal(charStatuses, 'स').status}/>
<Key value={KeyVal(charStatuses, "ष").chrForm.chrForm} onClick={onClick} status={KeyVal(charStatuses, 'ष').status}/>
<Key value={KeyVal(charStatuses, "ह").chrForm.chrForm} onClick={onClick} status={KeyVal(charStatuses, 'ह').status}/>
<Key value={KeyVal(charStatuses, "ळ").chrForm.chrForm} onClick={onClick} status={KeyVal(charStatuses, 'ळ').status}/>
            </div>
        </div>
    )
}
