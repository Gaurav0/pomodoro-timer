import Application from 'pomodoro-timer/app';
import config from 'pomodoro-timer/config/environment';
import { setApplication } from '@ember/test-helpers';
import { start } from 'ember-qunit';
import 'qunit-dom';

setApplication(Application.create(config.APP));

start();
