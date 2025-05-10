import { atom } from "jotai";

export const selectedRowsAtom = atom<Set<number>>(new Set<number>());

export const selectedRowAtom = atom<number>(-1);
