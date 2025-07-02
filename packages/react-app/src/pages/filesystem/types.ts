import type { DialogOptions, SaveDialogOptions } from 'api';

export interface DialogExample {
  label: string;
  config?: DialogOptions | SaveDialogOptions;
}
