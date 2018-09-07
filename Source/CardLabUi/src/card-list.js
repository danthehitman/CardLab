import {EventAggregator} from 'aurelia-event-aggregator';
import {WebAPI} from './web-api';
import {CardUpdated, CardViewed} from './messages';
import {inject} from 'aurelia-framework';

@inject(WebAPI, EventAggregator)
  export class CardList {
    constructor(api, ea) {
      this.api = api;
      this.cards = [];

      ea.subscribe(CardViewed, msg => this.select(msg.card));
      ea.subscribe(CardUpdated, msg => {
        let id = msg.card.id;
        let found = this.cards.find(x => x.id == id);
        Object.assign(found, msg.card);
      });
    }


  created() {
    this.api.getCardList().then(cards => this.cards = cards);
  }

  select(card) {
    this.selectedId = card.id;
    return true;
  }
}
