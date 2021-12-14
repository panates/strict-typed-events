import {IsUndefined} from 'ts-gems/lib/type-check';

export type Listener = (...args: any[]) => void | Promise<void>;

type _ListenerKeys<T> = {
    [K in keyof T]-?: IsUndefined<T[K]> extends false ?
        T[K] extends Listener ? K : never : never;
}[keyof T];

export type IfListener<T> = T extends Listener ? T: never;
export type ListenerKeys<T> = Extract<_ListenerKeys<T>, string | symbol>;
