import { emitTwoWayEvent } from 'ipc';

import { FileSystemEvent } from '../events';
import type {
  ReadFileRequest,
  ReadFileResponse,
  WriteFileOptions,
  WriteFileRequest,
  WriteFileResponse,
} from './types';

export const readFileAsync = async (path: string): Promise<string> => {
  const result = await emitTwoWayEvent<ReadFileRequest, ReadFileResponse>(
    FileSystemEvent.ReadFile,
    {
      path,
    },
  );

  if ('error' in result) {
    throw new Error(result.error);
  }

  return result.content;
};

export const writeFileAsync = async (
  path: string,
  content: string,
  options?: WriteFileOptions,
): Promise<boolean> => {
  const result = await emitTwoWayEvent<WriteFileRequest, WriteFileResponse>(
    FileSystemEvent.WriteFile,
    {
      path,
      content,
      options,
    },
  );

  if ('error' in result) {
    throw new Error(result.error);
  }

  return result.result;
};
