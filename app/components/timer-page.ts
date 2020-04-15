import Component from '@glimmer/component';
import { action } from '@ember/object';
import { Duration } from 'luxon';

interface TimerPageArgs {
  paused: Boolean,
  timeLeft: Duration,
  totalTime: Duration,
  start: Function,
  pause: Function
}

export default class TimerPage extends Component<TimerPageArgs> {

  get percent() {
    return (this.args.timeLeft.as("milliseconds") / this.args.totalTime.as("milliseconds")) * 100;
  }

  get strokeColor() {
    return this.percent === 100 ? "red" : "green";
  }

  @action
  togglePause() {
    if (this.args.paused) {
      this.args.start();
    } else {
      this.args.pause();
    }
  }
}
