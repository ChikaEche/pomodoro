export class Timer {
  private seconds: number;

  // Add more instace variables / methods as you see fit, just keep the code clean
  // expose observables for key event such as time end / pause

  constructor(readonly secs: number) {
    this.seconds = secs;
  }

  // TODO
  start() {}

  // TODO
  pause() {}

  // TODO
  getDisplayTime() {}
}
