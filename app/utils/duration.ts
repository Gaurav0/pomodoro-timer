import { Duration } from 'luxon';

// fromFormat doesn't exist yet
// see https://github.com/moment/luxon/issues/296
export function toDuration(s: string): Duration {
  return Duration.fromObject({
    minutes: +s.substr(0, 2),
    seconds: +s.substr(3, 2)
  });
}

export function fromDuration(d: Duration): string {
  return d.toFormat('mm:ss');
}
