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
  @service timer!: Services['timer'];

  @tracked workTimeError = false;
  @tracked shortBreakTimeError = false;
  @tracked longBreakTimeError = false;

  @tracked _workTimeLeft = 0;
  @tracked _shortBreakTimeLeft = 0;
  @tracked _longBreakTimeLeft = 0;

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
    let element = (event!.target! as HTMLInputElement)
    let millis = +element.value;
    this._workTimeLeft = calculateLeft(element, millis);
    this.settings.workTime = Duration.fromMillis(millis);
  }

  @action
  _setInitialWorkLeft(element: HTMLElement) {
    let millis = this.workTimeInMillis;
    this._workTimeLeft = calculateLeft(element, millis)
  }

  get shortBreakTime() {
    return fromDuration(this.settings.shortBreakTime);
  }

  get shortBreakTimeInMillis() {
    return this.settings.shortBreakTime.as("milliseconds");
  }

  @action
  shortBreakTimeChanged(event: InputEvent) {
    let time = (event!.target! as HTMLInputElement).value;
    try {
      this.settings.shortBreakTime = toDuration(time);
      this.shortBreakTimeError = false;
    } catch(_) {
      this.shortBreakTimeError = true;
    }
  }

  @action
  shortBreakTimeInMillisChanged(event: InputEvent) {
    let millis = (event!.target! as HTMLInputElement).value;
    this.settings.shortBreakTime = Duration.fromMillis(+millis);
  }

  get longBreakTime() {
    return fromDuration(this.settings.longBreakTime);
  }

  get longBreakTimeInMillis() {
    return this.settings.longBreakTime.as("milliseconds");
  }

  @action
  longBreakTimeChanged(event: InputEvent) {
    let time = (event!.target! as HTMLInputElement).value;
    try {
      this.settings.longBreakTime = toDuration(time);
      this.longBreakTimeError = false;
    } catch(_) {
      this.longBreakTimeError = true;
    }
  }

  @action
  longBreakTimeInMillisChanged(event: InputEvent) {
    let millis = (event!.target! as HTMLInputElement).value;
    this.settings.longBreakTime = Duration.fromMillis(+millis);
  }

  @action
  resetTimer() {
    this.timer.reset();
  }
}

const max = 3600000;
let width = 0;

function calculateLeft(element: HTMLElement, millis: number): number {
  if (width === 0) {
    // adjust width for margin
    width = parseFloat(getComputedStyle(element.parentElement!).width) - 36;
  }
  // adjust left for margin + offset
  return (millis / max) * width + 28;
}
