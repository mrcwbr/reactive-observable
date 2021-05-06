import { Obs, Observable } from '../src';

describe('index', () => {
  it('should export Observable', () => {
    const observable = new Observable(1);
    expect(observable.get()).toBe(1);
  });

  it('should export Obs alias', () => {
    const obs = new Obs(1);
    expect(obs.get()).toBe(1);
  });
});
