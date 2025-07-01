import { emitTwoWayEvent } from 'ipc';

import { FileSystemEvent } from '../events';
import {
  type DialogOptions,
  type OpenDialogRequest,
  type OpenDialogResponse,
  type OpenSaveDialogRequest,
  type OpenSaveDialogResponse,
  type SaveDialogOptions,
} from './types';

export const openDialog = async (
  options?: DialogOptions,
): Promise<string[]> => {
  const response = await emitTwoWayEvent<OpenDialogRequest, OpenDialogResponse>(
    FileSystemEvent.OpenDialog,
    { options },
  );
  return response.result;
};

export const openSaveDialog = async (
  options?: SaveDialogOptions,
): Promise<string> => {
  const response = await emitTwoWayEvent<
    OpenSaveDialogRequest,
    OpenSaveDialogResponse
  >(FileSystemEvent.OpenSaveDialog, { options });
  return response.result;
};
