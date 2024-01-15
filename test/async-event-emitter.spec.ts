import { AsyncEventEmitter } from '../src/index.js';

describe("AsyncEventEmitter", function () {

  it("should emitAsyncSerial() emit async listeners parallel", async function () {
    const emitter = new AsyncEventEmitter();
    const t: number[] = [];
    const listener = async () => {
      return new Promise<void>(resolve => {
        t.push(Date.now());
        setTimeout(resolve, 50);
      });
    }
    emitter.on('event1', listener);
    emitter.on('event1', listener);
    emitter.on('event1', listener);
    await emitter.emitAsync('event1');
    expect(t[1] - t[0]).toBeLessThanOrEqual(5);
    expect(t[2] - t[1]).toBeLessThanOrEqual(5);
  });

  it("should emitAsyncSerial() emit async listeners one by one", async function () {
    const emitter = new AsyncEventEmitter();
    const t: number[] = [];
    const listener = async () => {
      return new Promise<void>(resolve => {
        t.push(Date.now());
        setTimeout(resolve, 50);
      });
    }
    emitter.on('event1', listener);
    emitter.on('event1', listener);
    emitter.on('event1', listener);
    await emitter.emitAsyncSerial('event1');
    expect(t[1] - t[0]).toBeGreaterThanOrEqual(50);
    expect(t[2] - t[1]).toBeGreaterThanOrEqual(50);
  });

});
