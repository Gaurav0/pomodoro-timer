import { helper } from '@ember/component/helper';
import { fromDuration as fromDurationUtil } from '../utils/duration';
import { Duration } from 'luxon';

export function fromDuration(params: [Duration]): string {
  return fromDurationUtil(params[0]);
}

export default helper(fromDuration);
