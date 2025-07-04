import type { DialogOptions, SaveDialogOptions } from 'api';

export interface DialogExample {
  label: string;
  config?: DialogOptions | SaveDialogOptions;
}

export interface FileData {
  lastOperation: string;
  data: string;
  error: string;
}
