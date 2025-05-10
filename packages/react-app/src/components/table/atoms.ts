import { atom } from "jotai";

import type { TableStateAtom } from "./types";

export const tableStateAtom = atom<TableStateAtom>();

export const tableSelectedRowAtom = atom<number>(-1);
