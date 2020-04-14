import Controller from '@ember/controller';
import { Registry as Services } from '@ember/service';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { DateTime, Duration, Interval } from 'luxon';
import { toDuration } from '../utils/duration';

export default class ApplicationController extends Controller {
  @service router!: Services['router'];

  // settings
  @tracked workTime: Duration = toDuration("25:00");
  @tracked shortBreakTime: Duration = toDuration("5:00");
  @tracked longBreakTime: Duration = toDuration("15:00");
  @tracked rounds: Number = 4;

  // timer
  @tracked paused = true;
  @tracked timerStarted: DateTime | null = null;
  @tracked timeLeftWhenStarted: Duration = toDuration("25:00");

  // history
  // TODO

  // calculates the amount of time left on the timer.
  // We cannot assume that setTimeout is accurate;
  // so we calculate the difference from the fields
  get timeLeft() {
    if (!this.paused && this.timerStarted !== null) {
      return Interval
        .fromDateTimes(this.timerStarted, DateTime.local())
        .toDuration() // should be positive
        .minus(this.timeLeftWhenStarted) // should be negative
        .negate();
    }
    if (this.paused) {
      return this.timeLeftWhenStarted;
    }
    throw new Error('Invalid State');
  }

  @action
  resetTimer() {
    this.paused = true;
    this.timerStarted = null;
    this.timeLeftWhenStarted = this.workTime;
  }

  @action
  start() {
    this.paused = false;
    this.timerStarted = DateTime.local();
  }

  @action
  pause() {
    this.timeLeftWhenStarted = this.timeLeft;
    this.paused = true;
    this.timerStarted = null;
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
