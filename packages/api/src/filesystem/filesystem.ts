import { emitTwoWayEvent } from 'ipc';

import { FileSystemEvent } from '../events';
import {
  type CopyRequest,
  type CopyResponse,
  type GetInfoRequest,
  type GetInfoResponse,
  type MakeDirectoryRequest,
  type MakeDirectoryResponse,
  type MoveRequest,
  type MoveResponse,
  type ReadDirectoryRequest,
  type ReadDirectoryResponse,
  type ReadFileRequest,
  type ReadFileResponse,
  type RemoveRequest,
  type RemoveResponse,
  type WriteFileOptions,
  type WriteFileRequest,
  type WriteFileResponse,
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

export const readDirectoryAsync = async (path: string): Promise<string[]> => {
  const result = await emitTwoWayEvent<
    ReadDirectoryRequest,
    ReadDirectoryResponse
  >(FileSystemEvent.ReadDirectory, { path });

  if ('error' in result) {
    throw new Error(result.error);
  }

  return result.result;
};

export const makeDirectoryAsync = async (path: string): Promise<boolean> => {
  const result = await emitTwoWayEvent<
    MakeDirectoryRequest,
    MakeDirectoryResponse
  >(FileSystemEvent.MakeDirectory, {
    path,
  });

  if ('error' in result) {
    throw new Error(result.error);
  }

  return result.result;
};

export const moveAsync = async (from: string, to: string): Promise<boolean> => {
  const result = await emitTwoWayEvent<MoveRequest, MoveResponse>(
    FileSystemEvent.Move,
    {
      from,
      to,
    },
  );

  if ('error' in result) {
    throw new Error(result.error);
  }

  return result.result;
};

export const copyAsync = async (from: string, to: string): Promise<boolean> => {
  const result = await emitTwoWayEvent<CopyRequest, CopyResponse>(
    FileSystemEvent.Copy,
    {
      from,
      to,
    },
  );

  if ('error' in result) {
    throw new Error(result.error);
  }

  return result.result;
};

export const removeAsync = async (path: string): Promise<boolean> => {
  const result = await emitTwoWayEvent<RemoveRequest, RemoveResponse>(
    FileSystemEvent.Remove,
    {
      path,
    },
  );

  if ('error' in result) {
    throw new Error(result.error);
  }

  return result.result;
};

export const getInfoAsync = async (path: string): Promise<GetInfoResponse> => {
  const result = await emitTwoWayEvent<GetInfoRequest, GetInfoResponse>(
    FileSystemEvent.GetInfo,
    { path },
  );

  if ('error' in result) {
    throw new Error(result.error);
  }

  return result;
};
