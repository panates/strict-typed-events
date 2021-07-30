import events from 'events';
import {EventsRecord, KeysOf} from './types';

export class EventEmitter<TEventRecord extends EventsRecord<TEventRecord>> extends events.EventEmitter {

    addListener<K extends KeysOf<TEventRecord>>(eventName: K, listener: TEventRecord[K]): this {
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        return super.addListener(eventName, listener);
    }

    on<K extends KeysOf<TEventRecord>>(eventName: K, listener: TEventRecord[K]): this {
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        return super.on(eventName, listener);
    }

    once<K extends KeysOf<TEventRecord>>(eventName: K, listener: TEventRecord[K]): this {
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        return super.once(eventName, listener);
    }

    removeListener<K extends KeysOf<TEventRecord>>(eventName: K, listener: TEventRecord[K]): this {
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        return super.removeListener(eventName, listener);
    }

    off<K extends KeysOf<TEventRecord>>(eventName: K, listener: TEventRecord[K]): this {
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        return super.off(eventName, listener);
    }

    removeAllListeners<K extends KeysOf<TEventRecord>>(eventName: K): this {
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        return super.removeAllListeners(eventName);
    }

    listeners<K extends KeysOf<TEventRecord>>(eventName: K): TEventRecord[K][] {
        return super.listeners(eventName) as any;
    }

    rawListeners<K extends KeysOf<TEventRecord>>(eventName: K): TEventRecord[K][] {
        return super.rawListeners(eventName) as any;
    }

    // @ts-ignore
    emit<K extends KeysOf<TEventRecord>>(event: K, ...args: Parameters<TEventRecord[K]>): boolean {
        super.emit(event, ...args);
    }

    listenerCount<K extends KeysOf<TEventRecord>>(eventName: K): number {
        return super.listenerCount(eventName);
    }

    prependListener<K extends KeysOf<TEventRecord>>(eventName: K, listener: TEventRecord[K]): this {
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        return super.prependListener(eventName, listener);
    }

    prependOnceListener<K extends KeysOf<TEventRecord>>(eventName: K, listener: TEventRecord[K]): this {
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        return super.prependOnceListener(eventName, listener);
    }

    eventNames<K extends KeysOf<TEventRecord>>(): K[] {
        return super.eventNames() as K[];
    }

}
