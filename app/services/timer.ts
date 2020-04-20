import Service from '@ember/service';
import { inject as service } from '@ember/service';
import { Registry as Services } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { DateTime, Duration, Interval } from 'luxon';
import { toDuration } from '../utils/duration';
import { Step, stepsPerRound } from './settings';

export default class TimerService extends Service {
  @service loop!: Services['loop'];
  @service settings!: Services['settings'];

  @tracked paused = true;
  @tracked totalTime = toDuration("25:00");
  @tracked timerStarted: DateTime | null = null;
  @tracked timeLeftWhenStarted: Duration = toDuration("25:00");
  @tracked currentTime: Duration = this.timeLeft;
  @tracked step: Step = stepsPerRound[0];
  @tracked round: number = 1;
  @tracked rounds: number = 4;

  audio: HTMLAudioElement | null = null;

  constructor() {
    super(...arguments);

    window.addEventListener('load', () => {
      this.audio = document.getElementById('chimes') as HTMLAudioElement;
      this.audio.load();
    });
  }

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
    let totalTime = this.settings[this.step.duration];
    this.totalTime = totalTime;
    this.timeLeftWhenStarted = totalTime;
    this.currentTime = this.timeLeft;
  }

  start() {
    this.paused = false;
    this.timerStarted = DateTime.local();
    this.loop.loop();
  }

  pause() {
    this.timeLeftWhenStarted = this.timeLeft;
    this.paused = true;
    this.timerStarted = null;
    this.loop.cancel();
  }

  save() {
    // save in history
  }

  alert() {
    this.pause();
    this.audio?.play();
  }

  next() {
    let { step, round } = this.settings.nextStep(this.step, this.round);
    let time = this.settings[step.duration]
    this.timeLeftWhenStarted = time;
    this.totalTime = time;
    this.step = step;
    this.round = round;

    if (this.round === 1 && this.step === stepsPerRound[0]) {
      this.reset();
    } else {
      this.start();
    }
  }

  setup() {
    this.step = stepsPerRound[0];
    this.round = 1;
    this.rounds = this.settings.rounds;
    this.reset();
  }
}

// DO NOT DELETE: this is how TypeScript knows how to look up your services.
declare module '@ember/service' {
  interface Registry {
    'timer': TimerService;
  }
}
