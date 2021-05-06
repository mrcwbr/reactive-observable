import Observable from '../src/Observable';

describe('Observable', () => {

  describe('primitive types', () => {

    test('get()', () => {
      const o = new Observable(1);
      expect(o.get()).toBe(1);
      o.update(2);
      expect(o.get()).toBe(2);

      const firstSubscriber = jest.fn();
      const secondSubscriber = jest.fn();
      o.subscribe(firstSubscriber);
      o.subscribe(secondSubscriber);
      o.update(3);
      expect(firstSubscriber).toHaveBeenCalledWith(3);
      expect(secondSubscriber).toHaveBeenCalledWith(3);

      o.removeSubscription(firstSubscriber);
      o.update(4);
      expect(firstSubscriber).not.toHaveBeenCalledWith(4);
      expect(secondSubscriber).toHaveBeenCalledWith(4);
    });

    test('subscribe()', () => {
      const o = new Observable(1);

      const firstSubscriber = jest.fn();
      const secondSubscriber = jest.fn();
      o.subscribe(firstSubscriber);
      o.subscribe(secondSubscriber);
      o.update(2);
      expect(firstSubscriber).toHaveBeenCalledWith(2);
      expect(secondSubscriber).toHaveBeenCalledWith(2);

      o.removeSubscription(firstSubscriber);
      o.update(3);
      expect(firstSubscriber).not.toHaveBeenCalledWith(3);
      expect(secondSubscriber).toHaveBeenCalledWith(3);
    });

    test('subscription should not be called if value did not change', () => {
      const o = new Observable(1);
      const firstSubscriber = jest.fn();
      o.subscribe(firstSubscriber);
      o.update(1);
      expect(firstSubscriber).not.toHaveBeenCalled();
    });
  });

  test('value should be updated before subscription is notified', () => {
    const o = new Observable(1);
    const listener = () => {
      expect(o.get()).toBe(2);
    };
    o.subscribe(listener);
    o.update(2);
  });

  test('remove function of a subscription', () => {
    const o = new Observable(1);
    const listener = jest.fn();
    const subscription = o.subscribe(listener);
    o.update(2);
    expect(listener).toHaveBeenCalledWith(2);
    subscription.remove();
    o.update(3);
    expect(listener).toHaveBeenCalledTimes(1);
  });

  describe('arrays', () => {
    const o = new Observable([1, 2, 3]);
    const array = o.get();
    expect(array).toEqual([1, 2, 3]);
    array[0] = 9;
    expect(o.get()).toEqual([1, 2, 3]);

    const firstSubscriber = jest.fn();
    o.subscribe(firstSubscriber);
    o.update([1, 2, 3, 4]);
    expect(firstSubscriber).toHaveBeenCalledWith([1, 2, 3, 4]);
    expect(o.get()).toEqual([1, 2, 3, 4]);
  });

  describe('object references', () => {

    test('object should be immutable', () => {
      const o = new Observable({ color: 'red', ps: 100 });
      const car = o.get();
      car.ps = 200;
      expect(o.get().ps).toBe(100);
    });

    test('update() and subscribe()', () => {
      const o = new Observable({ color: 'red', ps: 100 });

      const firstSubscriber = jest.fn();
      o.subscribe(firstSubscriber);
      o.update({ color: 'blue', ps: 110 });

      expect(firstSubscriber).toHaveBeenCalledWith({ color: 'blue', ps: 110 });
    });

    test('subscription should not be called if value did not change', () => {
      const o = new Observable({ color: 'red', ps: 100 });
      const firstSubscriber = jest.fn();
      o.subscribe(firstSubscriber);
      o.updatePartial({ color: 'red', ps: 100 });
      expect(firstSubscriber).not.toHaveBeenCalled();
    });

    test('partial update()', () => {
      const o = new Observable({
        color: 'red',
        ps: 100
      });

      const firstSubscriber = jest.fn();
      o.subscribe(firstSubscriber);
      o.updatePartial({ ps: 100 });
      expect(firstSubscriber).not.toHaveBeenCalled();

      o.updatePartial({ ps: 200 });

      expect(firstSubscriber).toHaveBeenCalledWith({ color: 'red', ps: 200 });
    });

    test('partial subscribe()', () => {
      const o = new Observable({
        color: 'red',
        ps: 100
      });

      const firstSubscriber = jest.fn();
      o.subscribe(firstSubscriber, 'ps');
      o.updatePartial({ color: 'blue' });
      expect(firstSubscriber).not.toHaveBeenCalled();

      o.updatePartial({ ps: 100 });
      expect(firstSubscriber).not.toHaveBeenCalled();

      o.updatePartial({ ps: 200 });
      expect(firstSubscriber).toHaveBeenCalledWith(200);
    });

  });

});
