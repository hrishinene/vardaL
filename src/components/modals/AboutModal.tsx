import {BaseModal} from './BaseModal'
import {ABOUT_GAME_MESSAGE, GAME_VERSION} from "../../constants/strings";
import {FORM_LINK, MARATHI_NAMES, MAX_CHALLENGES, MAX_WORD_LENGTH} from "../../constants/settings";
// import {InfoModal} from "./InfoModal";
// import {QuestionMarkCircleIcon} from "@heroicons/react/solid";

type Props = {
  isOpen: boolean
  handleClose: () => void
}

export const AboutModal = ({isOpen, handleClose}: Props) => {
    return (
        <BaseModal title={ABOUT_GAME_MESSAGE} isOpen={isOpen} handleClose={handleClose}>
            <p className="text-gray-800 dark:text-gray-400 text-left justify-items-start">
                गेल्या महिन्याभरात सुमारे १६ लाख वेळा 'शब्दक' खेळला गेला आहे! तुमच्या प्रेमाने आम्ही भारावून गेलो आहोत! लोभ आहेच, तो वाढावा!
                काही उल्लेखनीय गोष्टी:
            </p>
            <ul className="list-disc text-left list-inside text-gray-800 dark:text-gray-400 justify-items-start">
                <li> सोपे नियम शिका आणि एक नेहमीचा {MARATHI_NAMES[MAX_WORD_LENGTH]}-अक्षरी शब्द {MARATHI_NAMES[MAX_CHALLENGES]} प्रयत्नांत ओळखा!</li>
                <li> आता तुम्हाला एका दिवशी (फक्त) एक शब्दक-१ खेळता येईल आणि मित्र-मैत्रिणींशी निखळ स्पर्धा करता येईल! </li>
                <li> शब्दक तुम्हाला आवडला तर <a href="http://www.shabdak.com" className="decoration-indigo-500 decoration-2 underline">नवे शब्दक</a>
                    आणखी आवडेल. <a className="decoration-indigo-500 underline underline-offset-1" href="http://www.shabdak.com">पहा तर खेळून</a>!</li>
                <li> तुमच्या <a href={FORM_LINK} rel="noopener noreferrer" className="decoration-indigo-500 decoration-2 underline"> प्रतिक्रिया </a>कळवत रहा!
                </li>
            </ul>
            <p className="text-xs text-gray-500 dark:text-gray-300 text-left">
                <a href="https://github.com/kedarmhaswade/vardaL" className="underline font-bold">'शब्दक-१'</a>
                : "Wordle" वर आधारित एक शब्दखेळ. मराठीत तो आपल्यापर्यंत आणला आहे, केदार म्हसवडे, हृषिकेश नेने, निरंजन पेडणेकर,
                राहुल केळकर, प्रशांत पेंडसे यांनी.
            </p>
            <span className="text-xs text-gray-300 dark:text-gray-100">Version: {GAME_VERSION}</span>

        </BaseModal>
    )
}
