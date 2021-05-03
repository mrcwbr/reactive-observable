# reactive-observable

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
