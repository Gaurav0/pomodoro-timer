import Component from '@glimmer/component';

interface ProgressRingArgs {
  radius: number;
  percent: number;
  strokeColor: string;
  strokeWidth: number;
}

export default class ProgressRing extends Component<ProgressRingArgs> {
  get normalizedRadius() {
    return this.args.radius - this.args.strokeWidth * 2;
  }

  get circumference() {
    return this.normalizedRadius * 2 * Math.PI;
  }

  get strokeDashOffset() {
    return this.circumference - this.args.percent / 100 * this.circumference;
  }

  get width() {
    return this.args.radius * 2;
  }

  get height() {
    return this.width;
  }
}
