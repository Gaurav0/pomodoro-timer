import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, fillIn } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { TestContext as OriginalTestContext } from 'ember-test-helpers';

interface TestContext extends OriginalTestContext {
  value: number;
  valueChangedCalled: number,
  valueChanged: (arg: number) => void;
}

module('Integration | Component | slider', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(this: TestContext, assert) {
    this.value = 0;
    this.valueChangedCalled = 0;
    this.valueChanged = (arg: number) => {
      this.value = arg;
      this.valueChangedCalled++;
    }

    await render(hbs`
      <Slider @min={{1}} @max={{5}} @step={{1}} @value={{3}}
        @valueChanged={{this.valueChanged}}
      />`
    );

    assert.dom('.slider').hasProperty('value', '3');

    await fillIn('.slider', '2');

    assert.dom('.slider').hasProperty('value', '2');
    assert.equal(this.valueChangedCalled, 1);
    assert.equal(this.value, 2);
  });
});
