import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

interface RoundsSettingArgs {
  label: string;
  sliderColor: string;
  rounds: number;
  roundsChanged: (rounds: number) => void;
}

export default class RoundsSetting extends Component<RoundsSettingArgs> {
  @tracked roundsError = false;

  @action
  roundsInput(event: InputEvent) {
    let rounds = +(event!.target! as HTMLInputElement).value;
    this.roundsChanged(rounds);
  }

  @action
  roundsChanged(rounds: number) {
    if (rounds >= 1 && rounds <= 10) {
      this.args.roundsChanged(rounds);
      this.roundsError = false;
    } else {
      this.roundsError = true;
    }
  }
}
