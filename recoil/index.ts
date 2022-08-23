import { atom } from 'node_modules/recoil'

export const symbolsState = atom<any[]>({
    key: 'symbols', // unique ID (with respect to other atoms/selectors)
    default: [], // default value (aka initial value)
  });

