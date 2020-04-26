import Service from '@ember/service';
import { inject as service } from '@ember/service';
import { Registry as Services } from '@ember/service';

export default class Loop extends Service {
  @service('timer') timerService!: Services['timer'];

  _animationTimer: number | null = null;
  _animationLoop: () => void;
  _fullTimer: NodeJS.Timeout | null = null;
  _fullLoop: () => void;

  constructor() {
    super(...arguments);

    this._fullLoop = this.loop.bind(this);
    this._animationLoop = this.animationLoop.bind(this);
  }

  loop() {
    let timeLeft = this.timerService.timeLeft;
    if (timeLeft.as("milliseconds") <= 0) {
      this.cancel();
      this.timerService.save();
      this.timerService.alert();
      this.timerService.next();
    } else {
      this.timerService.currentTime = timeLeft;
      this._fullTimer = setTimeout(this._fullLoop, 1000);
      this._animationTimer = requestAnimationFrame(this._animationLoop);
    }
  }

  animationLoop() {
    let timeLeft = this.timerService.timeLeft;
    if (timeLeft.as("milliseconds") > 0) {
      this.timerService.currentTime = timeLeft;
    }
    this._animationTimer = requestAnimationFrame(this._animationLoop);
  }

  cancel() {
    if (this._animationTimer !== null) {
      cancelAnimationFrame(this._animationTimer);
    }
    if (this._fullTimer !== null) {
      clearTimeout(this._fullTimer);
    }
  }
}

// DO NOT DELETE: this is how TypeScript knows how to look up your services.
declare module '@ember/service' {
  interface Registry {
    'loop': Loop;
  }
}
