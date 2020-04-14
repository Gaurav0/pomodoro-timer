import Controller from '@ember/controller';
import { Registry as Services } from '@ember/service';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class ApplicationController extends Controller {
  @service router!: Services['router'];

  // settings
  @tracked workTime = "25:00";
  @tracked shortBreakTime = "5:00";
  @tracked longBreakTime = "15:00";
  @tracked rounds = 4;

  // timer
  @tracked paused = true;
  @tracked timerStarted: Date | null = null;
  @tracked timeLeftWhenStarted = "25:00";

  // history
  // TODO

  get timeLeft() {
    return "25:00";
  }

  @action
  resetTimer() {
    this.timerStarted = null;
    this.timeLeftWhenStarted = this.workTime;
  }

  @action
  start() {
    this.paused = false;
    this.timerStarted = new Date();
  }

  @action
  pause() {
    this.paused = true;
    this.timeLeftWhenStarted = this.timeLeft;
  }

  @action
  settings() {
    this.router.transitionTo('settings');
  }

  @action
  history() {
    this.router.transitionTo('history');
  }
}

// DO NOT DELETE: this is how TypeScript knows how to look up your controllers.
declare module '@ember/controller' {
  interface Registry {
    'application': ApplicationController;
  }
}
