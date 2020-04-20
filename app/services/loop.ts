import Service from '@ember/service';
import { inject as service } from '@ember/service';
import { Registry as Services } from '@ember/service';

export default class Loop extends Service {
  @service('timer') timerService!: Services['timer'];

  _timer: number | null = null;
  _loop: () => void;

  constructor() {
    super(...arguments);

    this._loop = this.loop.bind(this);
  }

  loop() {
    let timeLeft = this.timerService.timeLeft;
    if (timeLeft.as("milliseconds") <= 0) {
      this.timerService.save();
      this.timerService.alert();
      this.timerService.next();
    } else {
      this.timerService.currentTime = timeLeft;
      this._timer = requestAnimationFrame(this._loop);
    }
  }

  cancel() {
    if (this._timer !== null) {
      cancelAnimationFrame(this._timer);
    }
  }
}

// DO NOT DELETE: this is how TypeScript knows how to look up your services.
declare module '@ember/service' {
  interface Registry {
    'loop': Loop;
  }
}
