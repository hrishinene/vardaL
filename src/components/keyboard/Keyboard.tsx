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

    // console.log("<HVN>charStatuses = ", JSON.stringify(charStatuses));

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
//<div className="max-w-[550px] m-auto w-full flex-auto overflow-auto mt-2">
<div>
<div className="flex justify-center mb-1">
<Key value={KeyVal(charStatuses, "अ").chrForm.chr} onClick={onClick} status={KeyVal(charStatuses, 'अ').status}/>
<Key value={KeyVal(charStatuses, "आ").chrForm.chr} onClick={onClick} status={KeyVal(charStatuses, 'आ').status}/>
<Key value={KeyVal(charStatuses, "इ").chrForm.chr} onClick={onClick} status={KeyVal(charStatuses, 'इ').status}/>
<Key value={KeyVal(charStatuses, "ई").chrForm.chr} onClick={onClick} status={KeyVal(charStatuses, 'ई').status}/>
<Key value={KeyVal(charStatuses, "उ").chrForm.chr} onClick={onClick} status={KeyVal(charStatuses, 'उ').status}/>
<Key value={KeyVal(charStatuses, "ऊ").chrForm.chr} onClick={onClick} status={KeyVal(charStatuses, 'ऊ').status}/>
</div>

<div className="flex justify-center mb-1">
<Key value={KeyVal(charStatuses, "ए").chrForm.chr} onClick={onClick} status={KeyVal(charStatuses, 'ए').status}/>
<Key value={KeyVal(charStatuses, "ऐ").chrForm.chr} onClick={onClick} status={KeyVal(charStatuses, 'ऐ').status}/>
<Key value={KeyVal(charStatuses, "ओ").chrForm.chr} onClick={onClick} status={KeyVal(charStatuses, 'ओ').status}/>
<Key value={KeyVal(charStatuses, "औ").chrForm.chr} onClick={onClick} status={KeyVal(charStatuses, 'औ').status}/>
<Key value={KeyVal(charStatuses, "अं").chrForm.chr} onClick={onClick} status={KeyVal(charStatuses, 'अं').status}/>
<Key value={KeyVal(charStatuses, "अः").chrForm.chr} onClick={onClick} status={KeyVal(charStatuses, 'अः').status}/>
</div>

<div className="flex justify-center mb-1">
<Key value="ENTER" onClick={onClick}> {ENTER_TEXT} </Key>
<Key value={KeyVal(charStatuses, "क").chrForm.chr} onClick={onClick} status={KeyVal(charStatuses, 'क').status}/>
<Key value={KeyVal(charStatuses, "ख").chrForm.chr} onClick={onClick} status={KeyVal(charStatuses, 'ख').status}/>
<Key value={KeyVal(charStatuses, "ग").chrForm.chr} onClick={onClick} status={KeyVal(charStatuses, 'ग').status}/>
<Key value={KeyVal(charStatuses, "घ").chrForm.chr} onClick={onClick} status={KeyVal(charStatuses, 'घ').status}/>
<Key value={KeyVal(charStatuses, "ङ").chrForm.chr} onClick={onClick} status={KeyVal(charStatuses, 'ङ').status}/>
<Key value="DELETE" onClick={onClick}> {DELETE_TEXT} </Key>
</div>

<div className="flex justify-center mb-1">
<Key value={KeyVal(charStatuses, "च").chrForm.chr} onClick={onClick} status={KeyVal(charStatuses, 'च').status}/>
<Key value={KeyVal(charStatuses, "छ").chrForm.chr} onClick={onClick} status={KeyVal(charStatuses, 'छ').status}/>
<Key value={KeyVal(charStatuses, "ज").chrForm.chr} onClick={onClick} status={KeyVal(charStatuses, 'ज').status}/>
<Key value={KeyVal(charStatuses, "झ").chrForm.chr} onClick={onClick} status={KeyVal(charStatuses, 'झ').status}/>
<Key value={KeyVal(charStatuses, "ञ").chrForm.chr} onClick={onClick} status={KeyVal(charStatuses, 'ञ').status}/>
</div>

<div className="flex justify-center mb-1">
<Key value={KeyVal(charStatuses, "ट").chrForm.chr} onClick={onClick} status={KeyVal(charStatuses, 'ट').status}/>
<Key value={KeyVal(charStatuses, "ठ").chrForm.chr} onClick={onClick} status={KeyVal(charStatuses, 'ठ').status}/>
<Key value={KeyVal(charStatuses, "ड").chrForm.chr} onClick={onClick} status={KeyVal(charStatuses, 'ड').status}/>
<Key value={KeyVal(charStatuses, "ढ").chrForm.chr} onClick={onClick} status={KeyVal(charStatuses, 'ढ').status}/>
<Key value={KeyVal(charStatuses, "ण").chrForm.chr} onClick={onClick} status={KeyVal(charStatuses, 'ण').status}/>
</div>

<div className="flex justify-center mb-1">
<Key value={KeyVal(charStatuses, "त").chrForm.chr} onClick={onClick} status={KeyVal(charStatuses, 'त').status}/>
<Key value={KeyVal(charStatuses, "थ").chrForm.chr} onClick={onClick} status={KeyVal(charStatuses, 'थ').status}/>
<Key value={KeyVal(charStatuses, "द").chrForm.chr} onClick={onClick} status={KeyVal(charStatuses, 'द').status}/>
<Key value={KeyVal(charStatuses, "ध").chrForm.chr} onClick={onClick} status={KeyVal(charStatuses, 'ध').status}/>
<Key value={KeyVal(charStatuses, "न").chrForm.chr} onClick={onClick} status={KeyVal(charStatuses, 'न').status}/>
</div>

<div className="flex justify-center mb-1">
<Key value={KeyVal(charStatuses, "प").chrForm.chr} onClick={onClick} status={KeyVal(charStatuses, 'प').status}/>
<Key value={KeyVal(charStatuses, "फ").chrForm.chr} onClick={onClick} status={KeyVal(charStatuses, 'फ').status}/>
<Key value={KeyVal(charStatuses, "ब").chrForm.chr} onClick={onClick} status={KeyVal(charStatuses, 'ब').status}/>
<Key value={KeyVal(charStatuses, "भ").chrForm.chr} onClick={onClick} status={KeyVal(charStatuses, 'भ').status}/>
<Key value={KeyVal(charStatuses, "म").chrForm.chr} onClick={onClick} status={KeyVal(charStatuses, 'म').status}/>
</div>

<div className="flex justify-center mb-1">
<Key value={KeyVal(charStatuses, "य").chrForm.chr} onClick={onClick} status={KeyVal(charStatuses, 'य').status}/>
<Key value={KeyVal(charStatuses, "र").chrForm.chr} onClick={onClick} status={KeyVal(charStatuses, 'र').status}/>
<Key value={KeyVal(charStatuses, "ल").chrForm.chr} onClick={onClick} status={KeyVal(charStatuses, 'ल').status}/>
<Key value={KeyVal(charStatuses, "व").chrForm.chr} onClick={onClick} status={KeyVal(charStatuses, 'व').status}/>
<Key value={KeyVal(charStatuses, "श").chrForm.chr} onClick={onClick} status={KeyVal(charStatuses, 'श').status}/>
<Key value={KeyVal(charStatuses, "ष").chrForm.chr} onClick={onClick} status={KeyVal(charStatuses, 'ष').status}/>
</div>

<div className="flex justify-center mb-1">
<Key value={KeyVal(charStatuses, "स").chrForm.chr} onClick={onClick} status={KeyVal(charStatuses, 'स').status}/>
<Key value={KeyVal(charStatuses, "ह").chrForm.chr} onClick={onClick} status={KeyVal(charStatuses, 'ह').status}/>
<Key value={KeyVal(charStatuses, "ळ").chrForm.chr} onClick={onClick} status={KeyVal(charStatuses, 'ळ').status}/>
<Key value={KeyVal(charStatuses, "क्ष").chrForm.chr} onClick={onClick} status={KeyVal(charStatuses, 'क्ष').status}/>
<Key value={KeyVal(charStatuses, "ज्ञ").chrForm.chr} onClick={onClick} status={KeyVal(charStatuses, 'ज्ञ').status}/>
<Key value={KeyVal(charStatuses, "श्र").chrForm.chr} onClick={onClick} status={KeyVal(charStatuses, 'श्र').status}/>
</div>

</div>
    )
}
