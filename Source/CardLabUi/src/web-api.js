let latency = 200;
let id = 0;

function getId(){
  return ++id;
}

let cards = [
  {
    id:getId(),
    name:"Card 1",
    description: "Description 1"
  },
  {
    id:getId(),
    name:"Card 2",
    description: "Description 2"
  },
  {
    id:getId(),
    name:"Card 3",
    description: "Description 3"
  },
  {
    id:getId(),
    name:"Card 4",
    description: "Description 4"
  },
  {
    id:getId(),
    name:"Card 5",
    description: "Description 5"
  }
];

export class WebAPI {
  isRequesting = false;
  
  getCardList(){
    this.isRequesting = true;
    return new Promise(resolve => {
      setTimeout(() => {
        let results = cards.map(x =>  { return {
          id:x.id,
          name:x.name,
          description:x.description
        }});
        resolve(results);
        this.isRequesting = false;
      }, latency);
    });
  }

  getCardDetails(id){
    this.isRequesting = true;
    return new Promise(resolve => {
      setTimeout(() => {
        let found = cards.filter(x => x.id == id)[0];
        resolve(JSON.parse(JSON.stringify(found)));
        this.isRequesting = false;
      }, latency);
    });
  }

  saveCard(card){
    this.isRequesting = true;
    return new Promise(resolve => {
      setTimeout(() => {
        let instance = JSON.parse(JSON.stringify(card));
        let found = cards.filter(x => x.id == card.id)[0];

        if(found){
          let index = cards.indexOf(found);
          cards[index] = instance;
        }else{
          instance.id = getId();
          cards.push(instance);
        }

        this.isRequesting = false;
        resolve(instance);
      }, latency);
    });
  }
}
