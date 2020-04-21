import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { Registry as Services } from '@ember/service';

interface HistoryPageArgs {}

export default class HistoryPage extends Component<HistoryPageArgs> {
  @service history!: Services['history'];
}
