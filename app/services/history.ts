import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
import HistoryEntry from 'pomodoro-timer/classes/history-entry';

export default class History extends Service {
  @tracked entries: HistoryEntry[] = [];

  add(entry: HistoryEntry) {
    // make sure to call the setter so that history is updated live
    this.entries = [entry, ...this.entries];
  }
}

// DO NOT DELETE: this is how TypeScript knows how to look up your services.
declare module '@ember/service' {
  interface Registry {
    'history': History;
  }
}
