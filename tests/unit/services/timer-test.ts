import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import { Registry as Services } from '@ember/service';
import { Settings } from 'luxon';
import { fromDuration } from 'pomodoro-timer/utils/duration';

module('Unit | Service | timer', function(hooks) {
  setupTest(hooks);

  test('get timeLeft() works', function(assert) {
    let service: Services['timer'] = this.owner.lookup('service:timer')!;
    assert.equal(fromDuration(service.timeLeft), '25:00',
      'initially timeLeft is "25:00"'
    );

    Settings.now = () => new Date(2020, 14, 4, 0, 10, 0).valueOf();
    service.start();
    Settings.now = () => new Date(2020, 14, 4, 0, 10, 15).valueOf();
    assert.equal(fromDuration(service.timeLeft), '24:45',
      'start and wait 15 seconds then timeLeft is "24:45"'
    );

    Settings.now = () => new Date(2020, 14, 4, 0, 10, 35).valueOf();
    service.pause();
    Settings.now = () => new Date(2020, 14, 4, 0, 11, 0).valueOf();
    assert.equal(fromDuration(service.timeLeft), '24:25',
      'wait 20 seconds and pause and wait some more; timeLeft is "24:25"'
    );

    Settings.now = () => new Date(2020, 14, 4, 0, 12, 30).valueOf();
    service.start();
    Settings.now = () => new Date(2020, 14, 4, 0, 13, 20).valueOf();
    assert.equal(fromDuration(service.timeLeft), '23:35',
      'wait some more, start, wait 50 seconds; timeLeft is "23:35"'
    );

    Settings.now = () => new Date(2020, 14, 4, 0, 13, 55).valueOf();
    service.reset();
    Settings.now = () => new Date(2020, 14, 4, 0, 15, 5).valueOf();
    assert.equal(fromDuration(service.timeLeft), '25:00',
      'after reset(), timeLeft reverts to "25:00"'
    );
  });
});
