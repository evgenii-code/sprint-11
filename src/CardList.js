export default class CardList {
  constructor({ placesList }) {
    this.placesList = placesList;
  }

  addCard(card) {
    this.placesList.appendChild(card);
  }

  render(cards) {
    this.cards = cards;
    
    this.cards.forEach((card) => {
      this.placesList.appendChild(card);
    })
  }
}