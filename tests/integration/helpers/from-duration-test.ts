import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { toDuration } from 'pomodoro-timer/utils/duration';
import { TestContext as OriginalTestContext } from 'ember-test-helpers';
import { Duration } from 'luxon';

interface TestContext extends OriginalTestContext {
  inputValue: Duration;
}

module('Integration | Helper | from-duration', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(this: TestContext, assert) {
    this.inputValue = toDuration("03:15");

    await render(hbs`{{from-duration this.inputValue}}`);

    assert.dom().containsText("03:15");
  });
});
