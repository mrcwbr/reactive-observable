export default class Observable<T> {
  private value: T;
  private subscriber: Subscriber<T>[] = [];

  constructor(value: T) {
    this.value = value;
  }

  update(newValue: T | Partial<T>) {
    if (typeof newValue !== 'object' && typeof newValue === typeof this.value) { // handle primitive types
      this.value = newValue as T;
    } else if (Object.keys(this.value) === Object.keys(newValue)) { // handle identical object
      this.value = newValue as T;
    } else { // partial update
      Object.assign(this.value, newValue);
    }

    this.subscriber.forEach((sub: Subscriber<T>) => sub(this.value));
  }

  subscribe(subscriber: Subscriber<T>) {
    this.subscriber.push(subscriber);
  }

  removeSubscription(subscriber: Subscriber<T>) {
    const index = this.subscriber.findIndex((s: Subscriber<T>) => s === subscriber);
    this.subscriber.splice(index, 1);
  }

  get(): T {
    return this.value;
  }
}

type Subscriber<T> = (value: T) => void;
