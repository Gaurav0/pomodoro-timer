import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

interface SliderArgs {
  min: number;
  max: number;
  step: number;
  value: number;
  valueChanged: (value: number) => void;
}

export default class Slider extends Component<SliderArgs> {
  _width = 0;
  @tracked _trackElement: HTMLElement | null = null;

  get _left() {
    if (this._trackElement !== null && this._width === 0) {

      // adjust width for margin
      this._width = parseFloat(getComputedStyle(this._trackElement.parentElement!).width) - 36;
    }

    // adjust left for margin + offset
    return (this.args.value / (this.args.max - this.args.min)) * this._width + 28;
  }

  @action
  valueChanged(event: InputEvent) {
    let element = (event!.target! as HTMLInputElement)
    let value = +element.value;
    this._left; // ensure _left is updated
    this.args.valueChanged(value);
  }

  @action
  _setTrackElement(element: HTMLElement) {
    this._trackElement = element;
  }
}
