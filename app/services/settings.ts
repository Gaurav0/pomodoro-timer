import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { Duration } from 'luxon';
import { toDuration } from '../utils/duration';

export default class Settings extends Service {
  @tracked workTime: Duration = toDuration("25:00");
  @tracked shortBreakTime: Duration = toDuration("5:00");
  @tracked longBreakTime: Duration = toDuration("15:00");
  @tracked rounds: Number = 4;
}

// DO NOT DELETE: this is how TypeScript knows how to look up your services.
declare module '@ember/service' {
  interface Registry {
    'settings': Settings;
  }
}
