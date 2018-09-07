import {inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import {WebAPI} from './web-api';
import {CardUpdated,CardViewed} from './messages';
import {areEqual} from './utility';

@inject(WebAPI, EventAggregator)
  export class ContactDetail {
    constructor(api, ea){
      this.api = api;
      this.ea = ea;
    }

  activate(params, routeConfig) {
    this.routeConfig = routeConfig;

    return this.api.getCardDetails(params.id).then(card => {
      this.card = card;
      this.routeConfig.navModel.setTitle(card.name);
      this.originalCard = JSON.parse(JSON.stringify(card));
      this.ea.publish(new CardViewed(this.card));
    });
  }

  get canSave() {
    return this.card.name && !this.api.isRequesting;
  }

  save() {
    this.api.saveCard(this.card).then(card => {
      this.card = card;
      this.routeConfig.navModel.setTitle(card.name);
      this.originalCard = JSON.parse(JSON.stringify(card));
      this.ea.publish(new CardUpdated(this.card));
    });
  }

  canDeactivate() {
    if (!areEqual(this.originalCard, this.card)){
      let result = confirm('You have unsaved changes. Are you sure you wish to leave?');

      if(!result) {
        this.ea.publish(new CardViewed(this.card));
      }

      return result;
    }

    return true;
  }
}
