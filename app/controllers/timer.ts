import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { Registry as Services } from '@ember/service';
import { action } from '@ember/object';

export default class TimerController extends Controller {
  @service timer!: Services['timer'];

  @action
  start() {
    this.timer.start();
  }

  @action
  pause() {
    this.timer.pause();
  }
}

// DO NOT DELETE: this is how TypeScript knows how to look up your controllers.
declare module '@ember/controller' {
  interface Registry {
    'timer': TimerController;
  }
}
