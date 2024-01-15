import { EventEmitter } from 'events';
import promisify from 'putil-promisify';

export class AsyncEventEmitter extends EventEmitter {

    async emitAsync(event: string | symbol, ...args: any[]): Promise<boolean> {
        const listeners = this.rawListeners(event);
        if (!listeners.length)
            return false;
        const promises = listeners.reduce<Promise<void>[]>((a, fn) => {
            const x = fn(...args);
            if (promisify.isPromise(x))
                a.push(x);
            return a;
        }, []);
        return Promise.all(promises).then(() => true);
    }

    async emitAsyncSerial(event: string | symbol, ...args: any[]): Promise<boolean> {
        const listeners = this.rawListeners(event);
        if (!listeners.length)
            return false;
        for (const listener of listeners) {
            await listener(...args);
        }
        return true;
    }

}
