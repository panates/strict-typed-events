export type Listener = (...args: any[]) => void | Promise<void>;
export type EventRecord = Record<string | symbol, Listener>;
export type IfListener<T> = ([T] extends [Listener] ? T : () => void);
