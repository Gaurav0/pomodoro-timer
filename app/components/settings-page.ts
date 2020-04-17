import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { Registry as Services } from '@ember/service';
import { action } from '@ember/object';
import { Duration } from 'luxon';

interface SettingsPageArgs {}

export default class SettingsPage extends Component<SettingsPageArgs> {
  @service settings!: Services['settings'];
  @service timer!: Services['timer'];

  @action
  workTimeChanged(time: Duration) {
    this.settings.workTime = time;
  }

  @action
  shortBreakTimeChanged(time: Duration) {
    this.settings.shortBreakTime = time;
  }

  @action
  longBreakTimeChanged(time: Duration) {
    this.settings.longBreakTime = time;
  }

  @action
  resetTimer() {
    this.timer.reset();
  }
}
