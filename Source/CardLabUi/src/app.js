import {inject, PLATFORM} from 'aurelia-framework';
import {WebAPI} from './web-api';

@inject(WebAPI)
export class App {
  constructor(api) {
    this.api = api;
  }

  configureRouter(config, router) {
    config.title = 'Cards';
    config.map([
      { route: '',              moduleId: PLATFORM.moduleName('no-selection'),   title: 'Select'},
      { route: 'cards/:id',  moduleId: PLATFORM.moduleName('card-detail'), name: 'cards' }
    ]);

    this.router = router;
  }
}
