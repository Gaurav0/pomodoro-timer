import Component from '@glimmer/component';
import { action } from '@ember/object';
import { Duration } from 'luxon';

interface TimerPageArgs {
  paused: Boolean,
  timeLeft: Duration,
  start: Function,
  pause: Function
}

export default class TimerPage extends Component<TimerPageArgs> {
  @action
  togglePause() {
    if (this.args.paused) {
      this.args.start();
    } else {
      this.args.pause();
    }
  }
}
