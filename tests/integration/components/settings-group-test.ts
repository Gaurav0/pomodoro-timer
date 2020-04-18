import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, fillIn } from '@ember/test-helpers';
// import { tracked } from '@glimmer/tracking';
// import { defineProperty } from '@ember/object';
import hbs from 'htmlbars-inline-precompile';
import { TestContext as OriginalTestContext } from 'ember-test-helpers';
import { Duration } from 'luxon';
import { fromDuration, toDuration } from 'pomodoro-timer/utils/duration';

interface TestContext extends OriginalTestContext {
  timeChangedCalled: number,
  timeChanged: (arg: Duration) => void;
  time: Duration;
}

module('Integration | Component | settings-group', function(hooks) {
  setupRenderingTest(hooks);

  test('it works', async function(this: TestContext, assert) {
    this.timeChangedCalled = 0;
    // defineProperty(this, 'time', tracked()); // works but throws TypeScript errors
    this.time = toDuration("00:00");
    this.timeChanged = (arg: Duration) => {
      this.timeChangedCalled++;
      this.set('time', arg); // set required since time is not @tracked
    }

    await render(hbs`
      <SettingsGroup @label="Home" @prefix="home"
        @sliderColor="yellow"
        @time={{this.time}}
        @timeChanged={{this.timeChanged}}
      />`
    );

    assert.dom('.group-label').hasAttribute('for', 'home-time');
    assert.dom('.group-label').containsText('Home');
    assert.dom('#home-time').hasProperty('value', '00:00');
    assert.dom('.slider').hasProperty('value', '0');

    await fillIn('#home-time', '01:30');

    assert.dom('.slider').hasProperty('value', '90000');
    assert.equal(this.timeChangedCalled, 1);
    assert.equal(fromDuration(this.time), '01:30');
  });
});
