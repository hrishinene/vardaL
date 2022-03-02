export let MAX_WORD_LENGTH = 3
export let MAX_CHALLENGES = 8
export const RANDOM_DATE = true
export const FORM_LINK = "https://forms.gle/itK9Co4nSAGGrnK9A"

export function setMaxWords(len:number) {
    if (len > 2 && len < 6) MAX_WORD_LENGTH = len;
    switch (len) {
        case 3:
           MAX_CHALLENGES = 7; 
            break;
        case 4:
           MAX_CHALLENGES = 6; 
            break;
    
        case 5:
           MAX_CHALLENGES = 5; 
            break;
        default:
            MAX_CHALLENGES = (1 + 26/MAX_WORD_LENGTH) | 0; // empirical
            break;
    }
}
