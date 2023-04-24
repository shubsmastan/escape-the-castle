export default class Item {
  constructor(name) {
    this.name = name;
    this.description = null;
    this.type = "item";
    this.image = "";
  }

  setName(name) {
    this.name = name;
  }

  setDescription(description) {
    this.description = description;
  }

  setImage(link) {
    this.image = link;
  }
}

export class Weapon extends Item {
  constructor(name) {
    super(name);
    this.description = null;
    this.spells = null;
    this.type = "weapon";
    this.image = "";
  }

  setSpells(spellList) {
    this.spells = spellList.split(", ");
  }

  setImage(link) {
    this.image = link;
  }
}

export const key = new Item("key");
key.setDescription(
  "This key might just open your cell and allow you to escape."
);
key.setImage("./images/key.png");


export const staff = new Weapon("staff");
staff.setDescription(
  "A simple, yet extremely deadly, mage's staff that allows you to cast basic spells."
);
staff.setImage("./images/staff.png");
staff.setSpells("fire, ice, lightning, sleep");

export const candlestick = new Item("candlestick");
candlestick.setDescription("A valuable looking gilded gold candlestick.");
candlestick.setImage("./images/candlestick.png");

export const crown = new Item("crown");
crown.setDescription(
  "The enchanted crown worn by the ruler of the kingdom. Legends say it has magical properties."
);
crown.setImage("./images/crown.png");
