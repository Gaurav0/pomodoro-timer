import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | progress-ring', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {

    await render(hbs`<ProgressRing @radius="10" @percent="50" @strokeWidth="1" @strokeColor="red" />`);

    assert.ok('it renders');
  });
});
