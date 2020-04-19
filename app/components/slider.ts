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

  // style.left for track of slider
  get _left() {

    // We do not want to recalculate the width of the track every time
    // as we drag the handle, and it should be the same whenever the component
    // is rendered so we cache it in this._width.
    // this._trackElement will not be set on first call while rendering template;
    // but will be set after {{did-insert}}
    if (this._trackElement !== null && this._width === 0) {

      // adjust width for margin
      this._width = parseFloat(getComputedStyle(this._trackElement.parentElement!).width) - 36;
    }

    let diff = this.args.max - this.args.min;
    let value = this.args.value - this.args.min;

    // adjust left for margin + offset
    return (value / diff) * this._width + 28;
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
