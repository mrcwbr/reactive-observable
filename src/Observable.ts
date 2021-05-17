import { cloneDeep, isEqual } from 'lodash';

export default class Observable<T> {
  private value: T;
  private subscriber: Subscriber<T>[] = [];

  constructor(value: T) {
    this.value = value;
  }

  public update(newValue: T) {
    const oldValue = cloneDeep(this.value);
    this.value = newValue;
    this.notify(oldValue, newValue);
  }

  public updatePartial(newPartialValue: Partial<T>) {
    const newValue = Object.assign({}, this.value, newPartialValue);
    this.update(newValue);
  }

  private notify(oldValue: T, newValue: T) {
    if (isEqual(oldValue, newValue)) {
      return;
    }

    this.subscriber.forEach((subscriber: Subscriber<T>) => {
      const key = subscriber.propertyKey;
      if (key) {
        if (!isEqual(oldValue[key], newValue[key])) {
          subscriber.callback(newValue[subscriber.propertyKey]);
        }
      } else {
        subscriber.callback(newValue);
      }
    });
  }

  public subscribe(callback: Callback<T>, propertyKey?: keyof T): Subscription {
    this.subscriber.push({
      callback,
      propertyKey,
    });

    return {
      remove: () => this.removeSubscription(callback)
    };
  }

  public removeSubscription(callback: Callback<T>) {
    const index = this.subscriber.findIndex((s: Subscriber<T>) => s.callback === callback);
    this.subscriber.splice(index, 1);
  }

  public get(): T {
    return cloneDeep(this.value);
  }
}

type Callback<T> = (value: T | T[keyof T]) => void;

type Subscriber<T> = {
  callback: Callback<T>,
  propertyKey?: keyof T
}

export type Subscription = {
  remove(): void
}
