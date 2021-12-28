import promisify from 'putil-promisify';
import {EventEmitter} from './EventEmitter';
import {EventRecord, IfListener} from './types';

export class AsyncEventEmitter<TEventRecord extends EventRecord> extends EventEmitter<TEventRecord> {

    emit<K extends keyof TEventRecord>(
        event: K | {
            event: K,
            serial?: boolean;
        }, ...args: Parameters<IfListener<TEventRecord[K]>>
    ): boolean {
        const eventName = typeof event === 'object' ? event.event : event;
        if (!this.listenerCount(eventName))
            return false;
        this.emitAsync(event, ...args).catch(() => false);
        return true;
    }

    async emitAsync<K extends keyof TEventRecord>(
        event: K | {
            event: K,
            serial?: boolean;
        }, ...args: Parameters<IfListener<TEventRecord[K]>>
    ): Promise<boolean> {
        let eventName: K;
        let serial: boolean = false;
        if (typeof event === 'object') {
            eventName = event.event;
            serial = !!event.serial;
        } else eventName = event;
        const listeners = this.rawListeners(eventName);
        if (!listeners.length)
            return false;
        if (serial) {
            for (const listener of listeners) {
                await listener(...args);
            }
            return true;
        }
        const promises = listeners.reduce<Promise<void>[]>((a, fn) => {
            const x = fn(...args);
            if (promisify.isPromise(x))
                a.push(x);
            return a;
        }, []);
        return Promise.all(promises).then(() => true);
    }

}
