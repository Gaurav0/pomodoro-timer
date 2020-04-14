import Service from '@ember/service';
import { inject as service } from '@ember/service';
import { Registry as Services } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { DateTime, Duration, Interval } from 'luxon';
import { toDuration } from '../utils/duration';

export default class TimerService extends Service {
  @service settings!: Services['settings'];

  @tracked paused = true;
  @tracked timerStarted: DateTime | null = null;
  @tracked timeLeftWhenStarted: Duration = toDuration("25:00");

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

  reset() {
    this.paused = true;
    this.timerStarted = null;
    this.timeLeftWhenStarted = this.settings.workTime;
  }

  start() {
    this.paused = false;
    this.timerStarted = DateTime.local();
  }

  pause() {
    this.timeLeftWhenStarted = this.timeLeft;
    this.paused = true;
    this.timerStarted = null;
  }
}

// DO NOT DELETE: this is how TypeScript knows how to look up your services.
declare module '@ember/service' {
  interface Registry {
    'timer': TimerService;
  }
}
