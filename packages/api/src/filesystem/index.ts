import { openDialog, openSaveDialog } from './dialog';
import {
  makeDirectoryAsync,
  readDirectoryAsync,
  readFileAsync,
  writeFileAsync,
} from './filesystem';

const filesystem = {
  openDialog,
  openSaveDialog,
  readFileAsync,
  writeFileAsync,
  readDirectoryAsync,
  makeDirectoryAsync,
};

export default filesystem;
