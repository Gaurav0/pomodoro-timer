import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import TimerPage, { TimerPageArgs } from 'pomodoro-timer/components/timer-page';
import { toDuration } from 'pomodoro-timer/utils/duration';
import { TestContext as OriginalTestContext } from 'ember-test-helpers';
import { Duration } from 'luxon';

interface TestContext extends OriginalTestContext {
  timeLeft: Duration;
  totalTime: Duration;
  paused: boolean;
  startCalled: number;
  pauseCalled: number;
  start: Function;
  pause: Function;
  component: TimerPage;
}

module('Integration | Component | timer-page', function(hooks) {
  setupRenderingTest(hooks);

  test('it functions', async function(this: TestContext, assert) {
    this.timeLeft = toDuration("00:30");
    this.totalTime = toDuration("01:00");
    this.paused = true;
    this.startCalled = 0;
    this.pauseCalled = 0;
    this.start = () => {
      this.startCalled++;
      this.set('paused', false); // set needed because not @tracked
    }
    this.pause = () => {
      this.pauseCalled++;
      this.set('paused', true);
    }
    let component: MyTimerPage;

    class MyTimerPage extends TimerPage {
      constructor(owner: unknown, args: TimerPageArgs) {
        super(owner, args);
        component = this;
      }
    }

    this.owner.register('component:timer-page', MyTimerPage)

    await render(hbs`
      <TimerPage
        @timeLeft={{this.timeLeft}}
        @totalTime={{this.totalTime}}
        @paused={{this.paused}}
        @start={{this.start}}
        @pause={{this.pause}}
      />`
    );

    assert.equal(component!.percent, 50, 'timeLeft is 50%');

    await click('#toggle-start-pause');

    assert.equal(this.pauseCalled, 0, "pause was not yet called");
    assert.equal(this.startCalled, 1, "start was called once");

    await click('#toggle-start-pause');

    assert.equal(this.pauseCalled, 1, "pause was called once");
    assert.equal(this.startCalled, 1, "start was called once");
  });
});
