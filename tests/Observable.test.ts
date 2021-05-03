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
  });

  describe('object references', () => {

    test('subscribe()', () => {
      const o = new Observable({
        color: 'red',
        ps: 100
      });

      const firstSubscriber = jest.fn();
      o.subscribe(firstSubscriber);
      o.update({ color: 'blue', ps: 110 });

      expect(firstSubscriber).toHaveBeenCalledWith({ color: 'blue', ps: 110 });

      o.update({ ps: 200 });
      expect(firstSubscriber).toHaveBeenCalledWith({ color: 'blue', ps: 200 });
    });

  });

});
