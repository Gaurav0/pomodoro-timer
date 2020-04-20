import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { Duration } from 'luxon';
import { toDuration } from '../utils/duration';

export type DurationIndex = 'workTime' | 'shortBreakTime' | 'longBreakTime';

export interface Step {
  label: string,
  duration: DurationIndex
}

export const stepsPerRound: Step[] = [
  {
    label: 'Focus',
    duration: 'workTime'
  },
  {
    label: 'Short Break',
    duration: 'shortBreakTime'
  }
];

export const stepAfter: Step = {
  label: 'Long Break',
  duration: 'longBreakTime'
};

export default class Settings extends Service {
  @tracked workTime: Duration = toDuration("25:00");
  @tracked shortBreakTime: Duration = toDuration("05:00");
  @tracked longBreakTime: Duration = toDuration("15:00");
  @tracked rounds: number = 4;

  nextStep(step: Step, round: number) {
    let index = stepsPerRound.indexOf(step);
    let nextStep: Step, nextRound: number;
    if (index >= 0 && index < stepsPerRound.length - 1) {
      nextStep = round === this.rounds ? stepAfter : stepsPerRound[index + 1];
      nextRound = round;
    } else if (round < this.rounds) {
      nextStep = stepsPerRound[0];
      nextRound = round + 1;
    } else {
      nextStep = stepsPerRound[0];
      nextRound = 1;
    }
    return { step: nextStep, round: nextRound };
  }
}

// DO NOT DELETE: this is how TypeScript knows how to look up your services.
declare module '@ember/service' {
  interface Registry {
    'settings': Settings;
  }
}
