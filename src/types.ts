import {TypeKeys} from 'ts-gems';

export declare type Listener = (...args: any[]) => void | Promise<void>;
export declare type IfListener<T> = ([T] extends [Listener] ? T : () => void);
export declare type ListenerKeys<T> = Extract<TypeKeys<T, Listener>, string | symbol>;
