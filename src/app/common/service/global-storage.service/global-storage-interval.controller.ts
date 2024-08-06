import { EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';

export class GlobalStorageIntervalController {
  interval: { [key: string]: EventEmitter<void> } = {};
  private intervalHandle?: NodeJS.Timer;
  run(interval: number = 1000 * 60 * 1) {
    if (!this.intervalHandle) {
      this.intervalHandle = setInterval(() => {
        for (const key in this.interval) {
          this.interval[key].emit();
        }
      }, interval);
    }
  }
  stop() {
    if (this.intervalHandle) {
      clearInterval(this.intervalHandle);
      this.intervalHandle = undefined;
    }
  }
  clear() {
    this.stop();
    for (const key in this.interval) {
      this.unsubscribe(key);
    }
  }

  subscribe<T = any>(
    key: string,
    next?: (value: T) => void,
    error?: (error: any) => void,
    complete?: () => void
  ): Subscription;
  subscribe<T = any>(
    key: string,
    observerOrNext?: T,
    error?: T,
    complete?: T
  ): Subscription;
  subscribe<T = any>(key: string, observerOrNext?: T, error?: T, complete?: T) {
    let emitter = new EventEmitter();
    this.interval[key] = emitter;
    return this.interval[key].subscribe(observerOrNext, error, complete);
  }
  unsubscribe(key: string) {
    if (key in this.interval) {
      this.interval[key].unsubscribe();
      delete this.interval[key];
    }
  }
}
