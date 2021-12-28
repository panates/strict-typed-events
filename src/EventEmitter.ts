import events from 'events';
import {EventRecord, IfListener, Listener} from './types';

export class EventEmitter<TEventRecord extends EventRecord> extends events.EventEmitter {

    addListener<K extends keyof TEventRecord>(eventName: K, listener: IfListener<TEventRecord[K]>): this {
        super.addListener(wrapEventName(eventName), listener);
        return this;
    }

    on<K extends keyof TEventRecord>(
        eventName: K, listener: IfListener<TEventRecord[K]>): this {
        return super.on(wrapEventName(eventName), listener);
    }

    once<K extends keyof TEventRecord>(eventName: K, listener: IfListener<TEventRecord[K]>): this {
        return super.once(wrapEventName(eventName), listener);
    }

    removeListener<K extends keyof TEventRecord>(eventName: K, listener: IfListener<TEventRecord[K]>): this {
        return super.removeListener(wrapEventName(eventName), listener);
    }

    off<K extends keyof TEventRecord>(eventName: K, listener: IfListener<TEventRecord[K]>): this {
        return super.off(wrapEventName(eventName), listener);
    }

    removeAllListeners<K extends keyof TEventRecord>(eventName?: K): this {
        return super.removeAllListeners(eventName ? wrapEventName(eventName) : undefined);
    }

    listeners<K extends keyof TEventRecord>(eventName: K): IfListener<TEventRecord[K]>[] {
        return super.listeners(wrapEventName(eventName)) as any;
    }

    rawListeners<K extends keyof TEventRecord>(eventName: K): IfListener<TEventRecord[K]>[] {
        return super.rawListeners(wrapEventName(eventName)) as any;
    }

    emit<K extends keyof TEventRecord>(eventName: K, ...args: Parameters<TEventRecord[K] extends Listener ? TEventRecord[K] : never>): boolean {
        return super.emit(wrapEventName(eventName), ...args);
    }

    listenerCount<K extends keyof TEventRecord>(eventName: K): number {
        return super.listenerCount(wrapEventName(eventName));
    }

    prependListener<K extends keyof TEventRecord>(eventName: K, listener: IfListener<TEventRecord[K]>): this {
        return super.prependListener(wrapEventName(eventName), listener);
    }

    prependOnceListener<K extends keyof TEventRecord>(eventName: K, listener: IfListener<TEventRecord[K]>): this {
        return super.prependOnceListener(wrapEventName(eventName), listener);
    }

    eventNames<K extends keyof TEventRecord>(): K[] {
        return super.eventNames() as K[];
    }

}

function wrapEventName(n: string | number | symbol): string | symbol {
    return typeof n === 'number' ? '' + n : n;
}
