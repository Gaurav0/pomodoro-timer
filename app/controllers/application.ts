import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { Registry as Services } from '@ember/service';
import { action } from '@ember/object';

export default class ApplicationController extends Controller {
  @service router!: Services['router'];

  // settings

  // history
  // TODO

  @action
  timer() {
    this.router.transitionTo('timer');
  }

  @action
  settings() {
    this.router.transitionTo('settings');
  }

  @action
  history() {
    this.router.transitionTo('history');
  }
}

// DO NOT DELETE: this is how TypeScript knows how to look up your controllers.
declare module '@ember/controller' {
  interface Registry {
    'application': ApplicationController;
  }
}
