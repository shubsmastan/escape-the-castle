import { candlestick, crown } from "./item.js"

export default class Character {
  constructor(name) {
    this.name = name;
    this.description = null;
    this.dialogue = null;
    this.awake = true;
    this.type = "character";
    this.image = "";
  }

  setName(name) {
    this.name = name;
  }

  setDescription(description) {
    this.description = description;
  }

  setDialogue(dialogue) {
    this.dialogue = dialogue;
  }

  setSleep() {
    this.awake = false;
  }

  setImage(link) {
    this.image = link;
  }

  setImage(link) {
    this.image = link;
  }
}

export class Friend extends Character {
  constructor(name) {
    super(name);
    this.description = null;
    this.dialogue = null;
    this.awake = true;
    this.gift = null;
    this.secret = null;
    this.type = "friend";
    this.image = "";
  }

  setGift(gift) {
    this.gift = gift;
  }

  setSecret(secret) {
    this.secret = secret;
  }

  setImage(link) {
    this.image = link;
  }
}

export class Enemy extends Character {
  constructor(name) {
    super(name);
    this.description = null;
    this.dialogue = null;
    this.awake = true;
    this.weakness = null;
    this.killed = false;
    this.type = "enemy";
    this.image = "";
  }

  setWeakness(spell) {
    this.weakness = spell;
  }

  setImage(link) {
    this.image = link;
  }
}

export class Boss extends Enemy {
  constructor(name) {
    super(name);
    this.description = null;
    this.dialogue = null;
    this.awake = true;
    this.weakness = null;
    this.killed = false;
    this.controlled = false;
    this.controlItem = null;
    this.type = "boss";
    this.image = "";
  }

  setControlled() {
    this.controlled = true;
  }

  setControlItem(item) {
    this.controlItem = item;
  }

  setImage(link) {
    this.image = link;
  }
}

export const guard = new Enemy("Pod");
guard.setDescription(
  "The slightly odd jailer that watches over the prisons. Currently, he is asleep on guard duty."
);
guard.setImage("./images/guard.png");
guard.setDialogue("You will not escape!");
guard.setWeakness("sleep");
guard.setSleep();

export const peasant = new Friend("Catarina");
peasant.setDescription(
  "A common peasant who works in the caslte as a maid. She is going about her duties."
);
peasant.setImage("./images/peasant.png");
peasant.setDialogue(
  "Tread carefully! A powerful mage is guarding in the ballroom blocking entrance to the throne room."
);
peasant.setGift(candlestick);
peasant.setSecret("The mages hereabouts are afraid of fire magic.");

export const mage = new Enemy("Daiv");
mage.setDescription(
  "A powerful mage who gets in your way to prevent you leaving. He tries to curse you."
);
mage.setImage("./images/mage.png");
mage.setDialogue("You will not pass!");
mage.setWeakness("fire");

export const queen = new Enemy("Queen Nahaerys");
queen.setDescription(
  "The tyrant who rules the kingdom. Your loathed sister, who imprisoned you and took the throne that was rightfully yours."
);
queen.setImage("./images/queen.png");
queen.setDialogue("You will not take my crown!");
queen.setWeakness("ice");

export const dragon = new Boss("Brion");
dragon.setDescription(
  "The dreaded pet dragon, controlled only by the monarch of the kingdom. The one who tames Brion could control the entire kingdom."
);
dragon.setImage("./images/dragon.png");
dragon.setDialogue("....");
dragon.setControlItem(crown);