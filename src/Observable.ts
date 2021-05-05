import { cloneDeep, isEqual } from 'lodash-es';

export default class Observable<T> {
  private value: T;
  private subscriber: Subscriber<T>[] = [];

  constructor(value: T) {
    this.value = value;
  }

  public update(newValue: T) {
    this.notify(this.value, newValue);
    this.value = newValue;
  }

  public updatePartial(newPartialValue: Partial<T>) {
    const newValue = Object.assign({}, this.value, newPartialValue);
    this.update(newValue);
  }

  private notify(currentValue: T, newValue: T) {
    if (isEqual(currentValue, newValue)) {
      return;
    }

    this.subscriber.forEach((subscriber: Subscriber<T>) => {
      const key = subscriber.propertyKey;
      if (key) {
        if (!isEqual(currentValue[key], newValue[key])) {
          subscriber.callback(newValue[subscriber.propertyKey]);
        }
      } else {
        subscriber.callback(newValue);
      }
    });
  }

  public subscribe(callback: Callback<T>, propertyKey?: keyof T) {
    this.subscriber.push({
      callback,
      propertyKey,
    });
  }

  public removeSubscription(callback: Callback<T>) {
    const index = this.subscriber.findIndex((s: Subscriber<T>) => s.callback === callback);
    this.subscriber.splice(index, 1);
  }

  public get(): T {
    return cloneDeep(this.value);
  }
}

type Callback<T> = (value: unknown) => void;
type Subscriber<T> = {
  callback: Callback<T>,
  propertyKey?: keyof T
}
