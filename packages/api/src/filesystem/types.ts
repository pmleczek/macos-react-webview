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

export interface ReadFileRequest {
  path: string;
}

export type ReadFileResponse =
  | {
      content: string;
    }
  | {
      error: string;
    };

export interface WriteFileOptions {
  append?: boolean;
}

export interface WriteFileRequest {
  path: string;
  content: string;
  options?: WriteFileOptions;
}

export type WriteFileResponse =
  | {
      result: boolean;
    }
  | {
      error: string;
    };

export interface ReadDirectoryRequest {
  path: string;
}

export type ReadDirectoryResponse =
  | {
      result: string[];
    }
  | {
      error: string;
    };

export interface MakeDirectoryRequest {
  path: string;
}

export type MakeDirectoryResponse =
  | {
      result: boolean;
    }
  | {
      error: string;
    };

export interface MoveRequest {
  from: string;
  to: string;
}

export type MoveResponse =
  | {
      result: boolean;
    }
  | {
      error: string;
    };

export interface CopyRequest {
  from: string;
  to: string;
}

export type CopyResponse =
  | {
      result: boolean;
    }
  | {
      error: string;
    };

export interface RemoveRequest {
  path: string;
}

export type RemoveResponse =
  | {
      result: boolean;
    }
  | {
      error: string;
    };

export interface GetInfoRequest {
  path: string;
}

export type GetInfoResponse =
  | {
      exists: false;
    }
  | { error: string }
  | {
      exists: true;
      isDirectory: boolean;
      createdAt: number;
      modifiedAt: number;
      size: number;
    };
