import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import { Registry as Controllers } from '@ember/controller';
import { Settings } from 'luxon';
import { fromDuration } from 'pomodoro-timer/utils/duration';

module('Unit | Controller | application', function(hooks) {
  setupTest(hooks);

  test('get timeLeft() works', function(assert) {
    let controller: Controllers['application'] = this.owner.lookup('controller:application')!;
    assert.equal(fromDuration(controller.timeLeft), '25:00',
      'initially timeLeft is "25:00"'
    );

    Settings.now = () => new Date(2020, 14, 4, 0, 10, 0).valueOf();
    controller.start();
    Settings.now = () => new Date(2020, 14, 4, 0, 10, 15).valueOf();
    assert.equal(fromDuration(controller.timeLeft), '24:45',
      'start and wait 15 seconds then timeLeft is "24:45"'
    );

    Settings.now = () => new Date(2020, 14, 4, 0, 10, 35).valueOf();
    controller.pause();
    Settings.now = () => new Date(2020, 14, 4, 0, 11, 0).valueOf();
    assert.equal(fromDuration(controller.timeLeft), '24:25',
      'wait 20 seconds and pause and wait some more; timeLeft is "24:25"'
    );

    Settings.now = () => new Date(2020, 14, 4, 0, 12, 30).valueOf();
    controller.start();
    Settings.now = () => new Date(2020, 14, 4, 0, 13, 20).valueOf();
    assert.equal(fromDuration(controller.timeLeft), '23:35',
      'wait some more, start, wait 50 seconds; timeLeft is "23:35"'
    );

    Settings.now = () => new Date(2020, 14, 4, 0, 13, 55).valueOf();
    controller.resetTimer();
    Settings.now = () => new Date(2020, 14, 4, 0, 15, 5).valueOf();
    assert.equal(fromDuration(controller.timeLeft), '25:00',
      'after resetTimer(), timeLeft reverts to "25:00"'
    );
  });
});
