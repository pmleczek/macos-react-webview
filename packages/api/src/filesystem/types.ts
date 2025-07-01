export interface DialogOptions {
  title?: string;
  files?: boolean;
  directories?: boolean;
  multipleSelection?: boolean;
}

export interface OpenDialogRequest {
  options?: DialogOptions;
}

export interface OpenDialogResponse {
  result: string[];
}

export interface SaveDialogOptions {
  title?: string;
  defaultName?: boolean;
  otherFileTypes?: boolean;
  canCreateDirectories?: boolean;
  allowedTypes?: string[];
  showTypes?: boolean;
}

export interface OpenSaveDialogRequest {
  options?: SaveDialogOptions;
}

export interface OpenSaveDialogResponse {
  result: string;
}
