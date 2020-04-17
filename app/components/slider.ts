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
  @tracked _left = 0;

  @action
  valueChanged(event: InputEvent) {
    let element = (event!.target! as HTMLInputElement)
    let value = +element.value;
    this._left = this.calculateLeft(element, value);
    this.args.valueChanged(value);
  }

  @action
  _setInitialLeft(element: HTMLElement) {
    let value = this.args.value;
    this._left = this.calculateLeft(element, value);
  }

  calculateLeft(element: HTMLElement, value: number): number {
    if (this._width === 0) {

      // adjust width for margin
      this._width = parseFloat(getComputedStyle(element.parentElement!).width) - 36;
    }

    // adjust left for margin + offset
    return (value / (this.args.max - this.args.min)) * this._width + 28;
  }
}
