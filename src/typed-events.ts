import {FunctionKeys, Type} from 'ts-gems';

export type Listener<TArgs extends any[] = any[]> = (...args: TArgs) => any;

export function TypedEventEmitterClass<TEventRecord,
    TEmitRecord = TEventRecord, TEmitter = any>(emitter: TEmitter): Type<TypedEventEmitter<TEmitter, TEventRecord, TEmitRecord>> {
    return emitter as unknown as Type<TypedEventEmitter<TEmitter, TEventRecord, TEmitRecord>>;
}

export type TypedEventEmitter<TEmitter,
    TEventRecord,
    TEmitRecord = TEventRecord> =
    _TypedEventEmitter<TEmitter, TEventRecord, TEmitRecord>;

type _TypedEventEmitter<TEmitter, TEventRecord, TEmitRecord,
    TEventEmitterOverride = _EventEmitterOverride<TEmitter, TEventRecord, TEmitRecord>,
    // Pick intersection keys of TEmitter and EventEmitterOverride
    TKeysToOverride extends keyof TEventEmitterOverride = Extract<keyof TEventEmitterOverride, keyof TEmitter>> =
// Pick all properties from the original type except overridden keys
    Pick<TEmitter, Exclude<keyof TEmitter, TKeysToOverride>> &
    // Override emitter methods
    Pick<TEventEmitterOverride, TKeysToOverride>;

type _ListenerParameters<T> = [T] extends [(...args: infer U) => any]
    ? U
    : [T] extends [void]
        ? [] : [T];

// the overridden signatures need to be assignment compatible, but
// due to how tuple types work (https://github.com/Microsoft/TypeScript/issues/26013)
// it's not possible to be assignment compatible anymore.
// This hack fixes it with a unique symbol that won't ever show up in parameter help etc.
//
// Unfortunately, this has the result of giving a poor error message when
// you mix up types.
declare const _assignmentCompatibilityHack: unique symbol;

type _EventEmitterOverride<TEmitter,
    TEventRecord,
    TEmitRecord = TEventRecord,
    TEventRecordKeys extends keyof TEventRecord = Extract<keyof TEventRecord, FunctionKeys<TEventRecord>>,
    TEmitRecordKeys extends keyof TEmitRecord = Extract<keyof TEmitRecord, FunctionKeys<TEmitRecord>>> = {

    addListener<P extends TEventRecordKeys, TThis>(
        this: TThis, event: P,
        listener: Listener<_ListenerParameters<TEventRecord[P]>>
    ): TThis;
    addListener(event: typeof _assignmentCompatibilityHack, listener: Listener): void;

    addEventListener<P extends TEventRecordKeys, TThis>(
        this: TThis, event: P,
        listener: Listener<_ListenerParameters<TEventRecord[P]>>
    ): TThis;
    addEventListener(event: typeof _assignmentCompatibilityHack, listener: Listener): void;

    emit<P extends TEmitRecordKeys, TThis>(
        this: TThis, event: P, ...args: _ListenerParameters<TEmitRecord[P]>
    ): boolean;
    emit(event: typeof _assignmentCompatibilityHack, ...args: any[]): void;

    emitAsync<P extends TEmitRecordKeys, TThis>(
        this: TThis, event: P, ...args: _ListenerParameters<TEmitRecord[P]>
    ): Promise<boolean>;
    emitAsync(event: typeof _assignmentCompatibilityHack, ...args: any[]): Promise<void>;

    emitAsyncSerial<P extends TEmitRecordKeys, TThis>(
        this: TThis, event: P, ...args: _ListenerParameters<TEmitRecord[P]>
    ): Promise<boolean>;
    emitAsyncSerial(event: typeof _assignmentCompatibilityHack, ...args: any[]): Promise<void>;

    on<P extends TEventRecordKeys, TThis>(
        this: TThis, event: P, listener: Listener<_ListenerParameters<TEventRecord[P]>>
    ): TThis;
    on(event: typeof _assignmentCompatibilityHack, listener: Listener): void;

    once<P extends TEventRecordKeys, TThis>(
        this: TThis, event: P, listener: Listener<_ListenerParameters<TEventRecord[P]>>
    ): TThis;
    once(event: typeof _assignmentCompatibilityHack, listener: Listener): void;

    removeListener<TThis>(this: TThis, event: TEventRecordKeys, listener: Listener): TThis;
    removeListener(event: typeof _assignmentCompatibilityHack, listener: Listener): void;

    removeEventListener<TThis>(this: TThis, event: TEventRecordKeys, listener: Listener): TThis;
    removeEventListener(event: typeof _assignmentCompatibilityHack, listener: Listener): void;

    off<TThis>(this: TThis, event: TEventRecordKeys, listener: Listener): TThis;
    off(event: typeof _assignmentCompatibilityHack, listener: Listener): void;

    removeAllListeners<TThis>(this: TThis, event: TEventRecordKeys,): TThis;
    removeAllListeners(event: typeof _assignmentCompatibilityHack): void;

    prependListener<TThis>(this: TThis, event: TEventRecordKeys, listener: Listener): TThis;
    prependListener(event: typeof _assignmentCompatibilityHack, listener: Listener): void;

    prependOnceListener<TThis>(this: TThis, event: TEventRecordKeys, listener: Listener): TThis;
    prependOnceListener(event: typeof _assignmentCompatibilityHack, listener: Listener): void;

    eventNames(): string[];

    listeners<P extends TEventRecordKeys>(event: P): TEventRecord[P][];
    listeners(event: typeof _assignmentCompatibilityHack): void;

    rawListeners<P extends TEventRecordKeys>(event: P): TEventRecord[P][];
    rawListeners(event: typeof _assignmentCompatibilityHack): void;

    listenerCount(event: TEventRecordKeys): number;
    listenerCount(event: typeof _assignmentCompatibilityHack): void;

    getMaxListeners(): number;

    setMaxListeners<TThis>(this: TThis, n: number): TThis;

};
