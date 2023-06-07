import axios, { Canceler } from 'axios';
import { isFunction } from '@/utils/is';

let pendingMap = new Map();

export const getPendingUrl = (config: any) => [config.method, config.url].join('&');

export class AxiosCanceler {
  addPending(config: any):Canceler {
    let c:Canceler = () => null;
    this.removePending(config);
    const url = getPendingUrl(config);
    config.cancelToken =
      config.cancelToken ||
      new axios.CancelToken((cancel) => {
        c = cancel;
        if (!pendingMap.has(url)) {
          pendingMap.set(url, cancel);
        }
      });
    return c;
  }
  removeAllPending() {
    pendingMap.forEach((cancel) => {
      if (cancel) {
        isFunction(cancel);
        cancel();
      }
    });
    pendingMap.clear();
  }
  removePending(config: any) {
    const url = getPendingUrl(config);
    if (pendingMap.has(url)) {
      const cancel = pendingMap.get(url);
      if (cancel) {
        isFunction(cancel);
        cancel();
      }
      pendingMap.delete(url);
    }
  }
  reset() {
    pendingMap = new Map();
  }
}
