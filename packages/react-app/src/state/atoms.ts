import { atom } from 'jotai';
import { atomFamily } from 'jotai/utils';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const modalAtomFamily = atomFamily((_modalName: string) => atom(false));
