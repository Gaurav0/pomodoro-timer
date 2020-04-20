import { Step } from "pomodoro-timer/services/settings";
import { Duration } from "luxon";

export default class HistoryEntry {
  step: Step;
  time: Duration;

  constructor(step: Step, time: Duration) {
    this.step = step;
    this.time = time;
  }
}
