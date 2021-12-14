import events from 'events';
import {IfListener, Listener, ListenerKeys} from './types';

export class EventEmitter<TEventRecord extends {}> extends events.EventEmitter {

    addListener<K extends ListenerKeys<TEventRecord>>(eventName: K, listener: IfListener<TEventRecord[K]>): this {
        return super.addListener(eventName, listener as unknown as Listener);
    }

    on<K extends ListenerKeys<TEventRecord>>(eventName: K, listener: IfListener<TEventRecord[K]>): this {
        return super.on(eventName, listener as unknown as Listener);
    }

    once<K extends ListenerKeys<TEventRecord>>(eventName: K, listener: IfListener<TEventRecord[K]>): this {
        return super.once(eventName, listener as unknown as Listener);
    }

    removeListener<K extends ListenerKeys<TEventRecord>>(eventName: K, listener: IfListener<TEventRecord[K]>): this {
        return super.removeListener(eventName, listener as unknown as Listener);
    }

    off<K extends ListenerKeys<TEventRecord>>(eventName: K, listener: IfListener<TEventRecord[K]>): this {
        return super.off(eventName, listener as unknown as Listener);
    }

    removeAllListeners<K extends ListenerKeys<TEventRecord>>(eventName: K): this {
        return super.removeAllListeners(eventName);
    }

    listeners<K extends ListenerKeys<TEventRecord>>(eventName: K): IfListener<TEventRecord[K]>[] {
        return super.listeners(eventName) as any;
    }

    rawListeners<K extends ListenerKeys<TEventRecord>>(eventName: K): IfListener<TEventRecord[K]>[] {
        return super.rawListeners(eventName) as any;
    }

    emit<K extends ListenerKeys<TEventRecord>>(event: K,
                                               ...args: Parameters<TEventRecord[K] extends Listener ? TEventRecord[K] : never>): boolean {
        return super.emit(event, ...args);
    }

    listenerCount<K extends ListenerKeys<TEventRecord>>(eventName: K): number {
        return super.listenerCount(eventName);
    }

    prependListener<K extends ListenerKeys<TEventRecord>>(eventName: K, listener: IfListener<TEventRecord[K]>): this {
        return super.prependListener(eventName, listener as unknown as Listener);
    }

    prependOnceListener<K extends ListenerKeys<TEventRecord>>(eventName: K, listener: IfListener<TEventRecord[K]>): this {
        return super.prependOnceListener(eventName, listener as unknown as Listener);
    }

    eventNames<K extends ListenerKeys<TEventRecord>>(): K[] {
        return super.eventNames() as K[];
    }

}
