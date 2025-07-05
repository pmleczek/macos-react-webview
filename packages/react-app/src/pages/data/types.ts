export interface ExampleState<T> {
  data?: T;
  error?: string;
}

export interface DataExampleProps<T> {
  label: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  method: (...args: any[]) => Promise<T>;
  input?: boolean;
}
