import { guard, peasant, mage, queen, dragon } from "./character.js";
import { key, staff, candlestick, crown } from "./item.js";

export default class Room {
  constructor(name) {
    this.name = name;
    this.description = null;
    this.linkedRooms = new Map();
    this.character = null;
    this.item = null;
    this.type = "room";
    this.image = "";
  }

  setName(name) {
    this.name = name;
  }

  setDescription(description) {
    this.description = description;
  }

  linkRoom(direction, room) {
    this.linkedRooms.set(direction, room);
  }

  setCharacter(character) {
    this.character = character;
  }

  setItem(item) {
    this.item = item;
  }

  setImage(link) {
    this.image = link;
  }
}

export const dungeon = new Room("dungeon");
dungeon.setDescription(
  "You awaken locked up in a cramped cell and can barely move. Your muscles ache and you feel uncomfortable as you see the rotting bones littering the corner. You think to yourself that there must be a way to escape."
);
dungeon.setImage("./images/dungeon.png");
dungeon.setCharacter(guard);
dungeon.setItem(key);

export const kitchen = new Room("kitchen");
kitchen.setDescription(
  "The large, cold room is crowded with cooking equipment but is completely deserted. A large pot of stew boils on a fire in the corner, unattended. The hunger consuming you, you take a few sips gratefully."
);
kitchen.setImage("./images/kitchen.png");
kitchen.setItem(staff);

export const dininghall = new Room("dining hall");
dininghall.setDescription(
  "This is where the lords of the castle dine. A long, imposing table is in the centre of the room. Gilded candlesticks and silver plates decorate the table. Memories come back to you of dining here as a youngster, before the troubles with the Queen."
);
dininghall.setImage("./images/dininghall.png");
dininghall.setCharacter(peasant);
dininghall.setItem(candlestick);

export const ballroom = new Room("ballroom");
ballroom.setDescription(
  "You enter the vast room and see chairs lining the perimeter. An ornate chandelier hangs from the ceiling. On special occasions, this room would be cleaned and decorated to perfection. Today, however, it is dank and dusty."
);
ballroom.setImage("./images/ballroom.png");
ballroom.setCharacter(mage);

export const courtyard = new Room("courtyard");
courtyard.setDescription(
  "The beautiful castle courtyard was your and your sister's personal playground when you were young. Brightly coloured flowers grow wherever you look and a large oak tree stands solitary in the centre."
);
courtyard.setImage("./images/courtyard.png");
courtyard.setCharacter(dragon);

export const throneroom = new Room("throne room");
throneroom.setDescription(
  "You stand at the end of a long, imposing chamber: the throne room of the Queen herself. From the galleries above, the lords of the kingdom watch to see what actions you will take. You get the feeling there is only one way out..."
);
throneroom.setImage("./images/throneroom.png");
throneroom.setCharacter(queen);
throneroom.setItem(crown);

dungeon.linkRoom("south", kitchen);
kitchen.linkRoom("north", dungeon);
kitchen.linkRoom("east", dininghall);
dininghall.linkRoom("west", kitchen);
dininghall.linkRoom("south", ballroom);
ballroom.linkRoom("north", dininghall);
ballroom.linkRoom("west", courtyard);
ballroom.linkRoom("south", throneroom);
courtyard.linkRoom("east", ballroom);
throneroom.linkRoom("north", ballroom);
