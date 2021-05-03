# reactive-observable

[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=reactive-observable&metric=alert_status)](https://sonarcloud.io/dashboard?id=reactive-observable)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=reactive-observable&metric=coverage)](https://sonarcloud.io/dashboard?id=reactive-observable)
[![Bugs](https://sonarcloud.io/api/project_badges/measure?project=reactive-observable&metric=bugs)](https://sonarcloud.io/dashboard?id=reactive-observable)
![min-size-g-zip](https://badgen.net/bundlephobia/minzip/reactive-observable)
![dependency-count](https://badgen.net/bundlephobia/dependency-count/reactive-observable)
![npm-version](https://badgen.net/npm/v/reactive-observable)
![ts-types](https://badgen.net/npm/types/reactive-observable)

This is a small a lightweight package implementing the observable pattern.

## Installation

`npm install reactive-observable`

## Usage

```typescript
class Service {
  public myCounter = new Observable(0);

  private myInternalLogic() {
    /*
     * the goal is to exctract all logic from the ui class to the service layer
     * so the service updates the counter internally. e. g. if a timout occurrs
     */

    const currentCount = this.myCounter.get();
    this.myCounter.update(currentCount + 1);
  }
}

class Ui {
  private readonly service: Service

  constructor() {
    this.service = new Service();
    this.service.myCounter.subscribe((count) => this.render(count));
  }

  private render(count: number) {
    return `<h1>Count: ${count}</h1>`;
  }
}
```

### Advanced Usage

It's also possible to watch object and update and subscribe to partial properties of an object.

```typescript
class CarService {
  public observableCar = new Observable({color: 'red', fuel: 100});

  public drive() {
    const currentFuel = this.observableCar.get().fuel
    this.observableCar.updatePartial({fuel: currentFuel - 1})
  }
}

class CarUi {
  private readonly service: CarService

  constructor() {
    this.service = new CarService();
    this.service.observableCar.subscribe((fuel) => this.render(fuel), 'fuel');
  }

  private render(fuel: number) {
    return `<h1>Fuel: ${fuel}</h1>`;
  }
}
```
