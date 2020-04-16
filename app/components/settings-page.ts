import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { Registry as Services } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { Duration } from 'luxon';
import { fromDuration, toDuration } from '../utils/duration';

interface SettingsPageArgs {}

export default class SettingsPage extends Component<SettingsPageArgs> {
  @service settings!: Services['settings'];

  @tracked workTimeError = false;

  get workTime() {
    return fromDuration(this.settings.workTime);
  }

  get workTimeInMillis() {
    return this.settings.workTime.as("milliseconds");
  }

  @action
  workTimeChanged(event: InputEvent) {
    let time = (event!.target! as HTMLInputElement).value;
    try {
      this.settings.workTime = toDuration(time);
      this.workTimeError = false;
    } catch(_) {
      this.workTimeError = true;
    }
  }

  @action
  workTimeInMillisChanged(event: InputEvent) {
    let millis = (event!.target! as HTMLInputElement).value;
    this.settings.workTime = Duration.fromMillis(+millis);
  }
}
