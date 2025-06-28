import { atom } from 'jotai';

import type { CommandStateAtomType } from './types';

export const commandStateAtom = atom<CommandStateAtomType>(null);
