import { emitOneWayEvent, emitTwoWayEvent } from 'ipc';

import { ClipboardEvent } from '../events';
import {
  type ReadImageBase64Response,
  type ReadImageResponse,
  type ReadTextResponse,
  type WriteImageBase64Request,
  type WriteImageRequest,
  type WriteTextRequest,
} from './types';

const clear = () => {
  emitOneWayEvent(ClipboardEvent.Clear);
};

const readText = async (): Promise<string> => {
  const response = await emitTwoWayEvent<undefined, ReadTextResponse>(
    ClipboardEvent.ReadText,
  );
  return response.text;
};

const writeText = (text: string): void => {
  emitOneWayEvent<WriteTextRequest>(ClipboardEvent.WriteText, {
    text,
  });
};

const readImage = async (): Promise<ArrayBuffer> => {
  const response = await emitTwoWayEvent<undefined, ReadImageResponse>(
    ClipboardEvent.ReadImage,
  );
  return new Uint8Array(response.image).buffer;
};

const writeImage = (image: ArrayBuffer): void => {
  const byteArray = Array.from(new Uint8Array(image));
  emitOneWayEvent<WriteImageRequest>(ClipboardEvent.WriteImage, {
    image: byteArray,
  });
};

const readImageBase64 = async (): Promise<string> => {
  const response = await emitTwoWayEvent<undefined, ReadImageBase64Response>(
    ClipboardEvent.ReadImageBase64,
  );
  return response.image;
};

const writeImageBase64 = (image: string): void => {
  emitOneWayEvent<WriteImageBase64Request>(ClipboardEvent.WriteImageBase64, {
    image,
  });
};

const clipboard = {
  clear,
  readText,
  writeText,
  readImage,
  writeImage,
  readImageBase64,
  writeImageBase64,
};

export default clipboard;
