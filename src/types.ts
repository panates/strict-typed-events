export type KeysOf<T> = Extract<keyof T, string | symbol>;
export type Listener = (...args: any[]) => void | Promise<void>;
export type EventsRecord<T> = { [K in KeysOf<T>]: Listener };
