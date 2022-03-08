import { CharValue } from './statuses'

export type KeyValue = CharValue | 'ENTER' | 'DELETE'

// See https://github.com/kedarmhaswade/vardaL/issues/27 (for later)
export const ROW1 = ['अ', 'आ', 'इ', 'ई', 'उ', 'ऊ'] as CharValue[]
export const ROW2 = ['ऋ', 'ए', 'ऐ', 'ओ', 'औ', 'अं', 'क', 'ख', 'ग', 'घ'] as CharValue[]
export const ROW3 = ['च', 'छ', 'ज', 'झ', 'ट', 'ठ', 'ड', 'ढ', 'ण', 'त'] as CharValue[]
export const ROW4 = ['थ', 'द', 'ध', 'न', 'प', 'फ', 'ब', 'भ', 'म', 'य'] as CharValue[]
export const ROW5 = ['र', 'ल', 'व', 'श', 'स', 'ष', 'ह', 'क्ष', 'ळ', 'ज्ञ'] as CharValue[]
