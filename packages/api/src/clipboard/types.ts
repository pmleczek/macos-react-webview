export interface ReadTextResponse {
  text: string;
}

export interface WriteTextRequest {
  text: string;
}

export interface ReadImageResponse {
  image: number[];
}

export interface WriteImageRequest {
  image: number[];
}

export interface ReadImageBase64Response {
  image: string;
}

export interface WriteImageBase64Request {
  image: string;
}
