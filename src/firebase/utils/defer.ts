export class Defer<T = void> {
  public promise: Promise<T>;
  public resolve: (value: T | PromiseLike<T>) => void;
  public reject: (value: T | PromiseLike<T>) => void;

  constructor() {
    this.resolve = undefined!;
    this.reject = undefined!;
    this.promise = new Promise((resolve, reject) => {
      this.resolve = resolve;
      this.reject = reject;
    });
  }
}
