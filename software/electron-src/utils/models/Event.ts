export class Event {
  #name: string;
  #once: boolean;
  constructor(name: string, once: boolean) {
    this.#name = name;
    this.#once = once;
  }
  get name() {
    return this.#name;
  }
  get once() {
    return this.#once;
  }
}