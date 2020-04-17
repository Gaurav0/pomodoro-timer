import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { Duration } from 'luxon';
import { fromDuration, toDuration } from '../utils/duration';

interface SettingsGroupArgs {
  label: string;
  prefix: string;
  sliderColor: string;
  time: Duration;
  timeChanged: (duration: Duration) => void;
}

export default class SettingsGroup extends Component<SettingsGroupArgs> {
  @tracked timeError = false;

  get time() {
    return fromDuration(this.args.time);
  }

  get timeInMillis() {
    return this.args.time.as('milliseconds');
  }

  @action
  timeChanged(event: InputEvent) {
    let time = (event!.target! as HTMLInputElement).value;
    try {
      let duration = toDuration(time);
      this.args.timeChanged(duration);
      this.timeError = false;
    } catch(_) {
      this.timeError = true;
    }
  }

  @action
  timeInMillisChanged(millis: number) {
    let duration = Duration.fromMillis(millis);
    this.args.timeChanged(duration);
  }
}
