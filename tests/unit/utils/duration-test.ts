import { Duration, DurationObject } from 'luxon';
import { fromDuration, toDuration } from 'pomodoro-timer/utils/duration';
import { module, test } from 'qunit';

class TestValue {
  s: string;
  d: DurationObject;

  constructor(s: string, d: DurationObject) {
    this.s = s;
    this.d = d;
  }
}

const testValues = [
  new TestValue('00:00', { minutes:  0, seconds:  0 }),
  new TestValue('00:01', { minutes:  0, seconds:  1 }),
  new TestValue('00:15', { minutes:  0, seconds: 15 }),
  new TestValue('01:00', { minutes:  1, seconds:  0 }),
  new TestValue('03:05', { minutes:  3, seconds:  5 }),
  new TestValue('05:15', { minutes:  5, seconds: 15 }),
  new TestValue('25:00', { minutes: 25, seconds:  0 }),
  new TestValue('25:02', { minutes: 25, seconds:  2 }),
  new TestValue('25:34', { minutes: 25, seconds: 34 }),
]

module('Unit | Utility | duration', function() {
  test('it works', function(assert) {
    testValues.forEach(testValue => {

      // fromDuration
      let { s, d } = testValue;
      let duration = Duration.fromObject(d);
      let actual = fromDuration(duration);
      assert.equal(actual, s,
        `fromDuration({ ${d.minutes} minutes, ${d.seconds} seconds }) -> ${s}`
      );

      // toDuration
      assert.deepEqual(d, toDuration(s).toObject(),
        `toDuration(${s}) -> { ${d.minutes} minutes, ${d.seconds} seconds }`
      );
    });
  });
});
