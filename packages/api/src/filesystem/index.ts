import { openDialog, openSaveDialog } from './dialog';
import {
  copyAsync,
  getInfoAsync,
  makeDirectoryAsync,
  moveAsync,
  readDirectoryAsync,
  readFileAsync,
  removeAsync,
  writeFileAsync,
} from './filesystem';

const filesystem = {
  openDialog,
  openSaveDialog,
  readFileAsync,
  writeFileAsync,
  readDirectoryAsync,
  makeDirectoryAsync,
  moveAsync,
  copyAsync,
  removeAsync,
  getInfoAsync,
};

export default filesystem;
