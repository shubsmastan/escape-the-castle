class Room {
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

class Item {
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

class Weapon extends Item {
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

class Character {
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

class Friend extends Character {
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

class Enemy extends Character {
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

class Boss extends Enemy {
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

const submitButton = document.getElementById("submit");
const actionBox = document.getElementById("action");
submitButton.addEventListener("click", submitAction);
actionBox.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    submitButton.click();
  }
});

const messageModal = document.getElementById("message-modal");
const messageText = document.getElementById("message");
const modalImg = document.getElementById("modal-image");
const inputModal = document.getElementById("input-modal");

const closeButton = document.getElementById("closebtn");
const restartModal = document.getElementById("restart-modal");
const restartText = document.getElementById("restart");
const restartButton = document.getElementById("restartbtn");

const castBox = document.getElementById("cast");
const spellPrompt = document.getElementById("spell-prompt");
const spellInput = document.getElementById("input-spell");
const enterSpell = document.getElementById("enter-spell");

const giveBox = document.getElementById("give");
const itemPrompt = document.getElementById("item-prompt");
const itemInput = document.getElementById("input-item");
const enterItem = document.getElementById("enter-item");

const attributionsList = document.getElementById("attributions-list");
const instructionsList = document.getElementById("instructions-list");

const roomName = document.getElementById("room-name");
const roomText = document.getElementById("room-description");
const roomConnections = document.querySelectorAll(".direction");
const characterText = document.getElementById("character");
const itemText = document.getElementById("item");
const inventory = document.getElementById("inventory");
const spells = document.getElementById("spells");

restartButton.onclick = function () {
  location.reload();
};

closeButton.addEventListener("click", function () {
  messageModal.style.display = "none";
  actionBox.focus();
});

window.onclick = function (e) {
  if (e.target === messageModal) {
    messageModal.style.display = "none";
  }
};

const dungeon = new Room("dungeon");
dungeon.setDescription(
  "You awaken locked up in a cramped cell and can barely move. Your muscles ache and you feel uncomfortable as you see the rotting bones littering the corner. You think to yourself that there must be a way to escape."
);
dungeon.setImage("./images/dungeon.png");

const kitchen = new Room("kitchen");
kitchen.setDescription(
  "The large, cold room is crowded with cooking equipment but is completely deserted. A large pot of stew boils on a fire in the corner, unattended. The hunger consuming you, you take a few sips gratefully."
);
kitchen.setImage("./images/kitchen.png");

const dininghall = new Room("dining hall");
dininghall.setDescription(
  "This is where the lords of the castle dine. A long, imposing table is in the centre of the room. Gilded candlesticks and silver plates decorate the table. Memories come back to you of dining here as a youngster, before the troubles with the Queen."
);
dininghall.setImage("./images/dininghall.png");

const ballroom = new Room("ballroom");
ballroom.setDescription(
  "You enter the vast room and see chairs lining the perimeter. An ornate chandelier hangs from the ceiling. On special occasions, this room would be cleaned and decorated to perfection. Today, however, it is dank and dusty."
);
ballroom.setImage("./images/ballroom.png");

const courtyard = new Room("courtyard");
courtyard.setDescription(
  "The beautiful castle courtyard was your and your sister's personal playground when you were young. Brightly coloured flowers grow wherever you look and a large oak tree stands solitary in the centre."
);
courtyard.setImage("./images/courtyard.png");

const throneroom = new Room("throne room");
throneroom.setDescription(
  "You stand at the end of a long, imposing chamber: the throne room of the Queen herself. From the galleries above, the lords of the kingdom watch to see what actions you will take. You get the feeling there is only one way out..."
);
throneroom.setImage("./images/throneroom.png");

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

const guard = new Enemy("Pod");
guard.setDescription(
  "The slightly odd jailer that watches over the prisons. Currently, he is asleep on guard duty."
);
guard.setImage("./images/guard.png");
guard.setDialogue("You will not escape!");
guard.setWeakness("sleep");
guard.setSleep();
dungeon.setCharacter(guard);

const peasant = new Friend("Catarina");
peasant.setDescription(
  "A common peasant who works in the caslte as a maid. She is going about her duties."
);
peasant.setImage("./images/peasant.png");
peasant.setDialogue(
  "Tread carefully! A powerful mage is guarding in the ballroom blocking entrance to the throne room."
);
dininghall.setCharacter(peasant);

const mage = new Enemy("Daiv");
mage.setDescription(
  "A powerful mage who gets in your way to prevent you leaving. He tries to curse you."
);
mage.setImage("./images/mage.png");
mage.setDialogue("You will not pass!");
mage.setWeakness("fire");
ballroom.setCharacter(mage);

const queen = new Enemy("Queen Nahaerys");
queen.setDescription(
  "The tyrant who rules the kingdom. Your loathed sister, who imprisoned you and took the throne that was rightfully yours."
);
queen.setImage("./images/queen.png");
queen.setDialogue("You will not take my crown!");
queen.setWeakness("ice");
throneroom.setCharacter(queen);

const dragon = new Boss("Brion");
dragon.setDescription(
  "The dreaded pet dragon, controlled only by the monarch of the kingdom. The one who tames Brion could control the entire kingdom."
);
dragon.setImage("./images/dragon.png");
dragon.setDialogue("....");
courtyard.setCharacter(dragon);

const key = new Item("key");
key.setDescription(
  "This key might just open your cell and allow you to escape."
);
key.setImage("./images/key.png");
dungeon.setItem(key);

const staff = new Weapon("staff");
staff.setDescription(
  "A simple, yet extremely deadly, mage's staff that allows you to cast basic spells."
);
staff.setImage("./images/staff.png");
staff.setSpells("fire, ice, lightning, sleep");
kitchen.setItem(staff);

const candlestick = new Item("candlestick");
candlestick.setDescription("A valuable looking gilded gold candlestick.");
candlestick.setImage("./images/candlestick.png");
dininghall.setItem(candlestick);
peasant.setGift(candlestick);
peasant.setSecret("The mages hereabouts are afraid of fire magic.");

const crown = new Item("crown");
crown.setDescription(
  "The enchanted crown worn by the ruler of the kingdom. Legends say it has magical properties."
);
crown.setImage("./images/crown.png");
throneroom.setItem(crown);
dragon.setControlItem(crown);

let room = dungeon;
let safeToLeave = true;
let itemList = [];
let numberOfItems = 0;
let spellList = [];
setRoom(room);
actionBox.focus();

function submitAction() {
  const action = actionBox.value.toLowerCase().trim();
  const item = room.item;
  const character = room.character;
  const directions = ["north", "east", "west", "south"];

  if (directions.includes(action) && room.linkedRooms.get(action)) {
    if (room === dungeon && !inventory.innerText.includes("key")) {
      alertMessage(
        "You can't leave your cell without a key to unlock it.",
        "./images/lock.png"
      );
    } else if (safeToLeave) {
      room = room.linkedRooms.get(action);
      setRoom(room);
    } else {
      gameOver(
        `As you try to escape, ${character.name} chases after you and attacks you. Your journey ends in defeat.`
      );
    }
  } else if (directions.includes(action) && !room.linkedRooms.get(action)) {
    alertMessage("There's nothing that way.", "./images/invalid.png");
  } else if (action === "get") {
    if (item && safeToLeave) {
      getItem(item);
    } else if (item && !safeToLeave) {
      gameOver(
        `As you reach over to take the ${item.name}, ${character.name} takes advantage of your foolishness and attacks you. Your journey ends in failure.`
      );
    } else alertMessage("There are no items here.", "./images/invalid.png");
  } else if (action === "fight") {
    if (!character || character.type === "friend") {
      alertMessage("There are no enemies here.", "./images/invalid.png");
    } else if (character.type === "enemy" || character.type === "boss") {
      if (!inventory.innerText.includes("staff")) {
        gameOver(
          `You have no weapon to fight with. ${character.name} attacks you in retaliation and kills you. Your journey ends in defeat.`
        );
        return;
      }
      inputSpell();
    } else
      alertMessage(
        "An error occured. Try a different action.",
        "./images/invalid.png"
      );
  } else if (action === "talk") {
    if (character) talkTo(character);
    else
      alertMessage("There is no one here to talk to.", "./images/invalid.png");
  } else if (action === "give") {
    if (!character)
      alertMessage("There is no one here.", "./images/invalid.png");
    else if (numberOfItems === 0)
      alertMessage("You don't have any items.", "./images/invalid.png");
    else {
      if (character.type === "enemy") {
        if (!character.awake) {
          alertMessage(
            `${character.name} is asleep. It would be unwise to awaken him.`,
            character.image
          );
          return;
        }
        inputModal.style.display = "none";
        giveBox.style.display = "none";
        gameOver(
          `${character.name} wants nothing from you. ${character.name} takes advantage of your moment of hesitation and attacks you. Your journey ends in defeat.`
        );
        return;
      }
      inputItem();
    }
  } else if (action === "") return;
  else {
    alertMessage("That is not a valid action.", "./images/invalid.png");
  }

  actionBox.value = "";
}

function setRoom(room) {
  roomName.innerText = `You are in the ${room.name}.`;
  roomText.innerText = room.description;
  const roomImg = document.getElementById("room-image");
  roomImg.innerText = "";
  const img = document.createElement("img");
  img["src"] = room.image;
  img.style.height = "40px";
  img.style.width = "auto";
  roomImg.appendChild(img);

  roomConnections.forEach((node) => {
    const direction = node.dataset.direction;
    const validDirections = Array.from(room.linkedRooms.keys());
    const requiredRoom = room.linkedRooms.get(direction);
    if (validDirections.includes(direction)) {
      node.style.display = "flex";
      const directionNode = document.getElementById(direction);
      directionNode.innerText = `The ${requiredRoom.name} is to the ${direction}.`;
    } else node.style.display = "none";
  });

  const item = room.item;
  const itemImg = document.getElementById("item-image");
  itemImg.innerText = "";
  if (item) {
    itemText.innerText = `You see something: a ${item.name}. ${item.description}`;
    const img = document.createElement("img");
    img["src"] = item.image;
    img.style.height = "40px";
    img.style.width = "auto";
    itemImg.appendChild(img);
  } else itemText.innerText = "";

  const character = room.character;
  const charImg = document.getElementById("char-image");
  charImg.innerText = "";
  if (character) {
    characterText.innerText = `Someone is here: ${character.name}. ${character.description}`;
    const img = document.createElement("img");
    img["src"] = character.image;
    img.style.height = "70px";
    img.style.width = "auto";
    charImg.appendChild(img);
    if (
      (character.type === "enemy" || character.type === "boss") &&
      character.awake
    ) {
      safeToLeave = false;
    }
  } else characterText.innerText = "";
}

function getItem(item) {
  itemList.push(item.name);
  inventory.innerText = `Inventory: ${itemList.join(", ")}`;
  itemText.innerText = "";
  numberOfItems += 1;
  room.item = null;
  alertMessage(`The ${item.name} was added to your inventory.`, item.image);
  closeButton.focus();
  const itemImg = document.getElementById("item-image");
  itemImg.innerText = "";
  if (item.type === "weapon") {
    p = document.createElement("p");
    messageText.appendChild(p);
    item.spells.forEach((spell) => {
      spellList.push(spell);
      spells.innerText = `Spells: ${spellList.join(", ")}`;
    });
    p.innerText += ` You can now use the following spells: ${item.spells.join(
      ", "
    )}.`;
  }
}

function talkTo(character) {
  if (character.type === "friend") {
    alertMessage(
      `${character.name} says: "${character.dialogue}"`,
      character.image
    );
  } else if (character.type === "enemy") {
    gameOver(
      `${character.name} says: "${character.dialogue}" ${character.name} has no further desire to converse and attacks you. Your journey ends in defeat.`
    );
  } else if (character.type === "boss") {
    gameOver(
      `${character.name} roars and and attacks you. Your journey ends in defeat.`
    );
  } else
    alertMessage(
      "An error occured. Try a different action.",
      "./images/invalid.png"
    );
}

function giveItem(character, gift) {
  if (gift === "") return;
  else if (!inventory.innerText.includes(gift)) {
    inputModal.style.display = "none";
    giveBox.style.display = "none";
    alertMessage("You don't have that item.", "./images/invalid.png");
    return;
  } else if (character.type === "friend" && gift !== character.gift.name) {
    inputModal.style.display = "none";
    giveBox.style.display = "none";
    alertMessage(
      `${character.name} has no use for that item.`,
      "./images/invalid.png"
    );
    return;
  } else if (character.type === "friend" && gift === character.gift.name) {
    inputModal.style.display = "none";
    giveBox.style.display = "none";
    alertMessage(
      `${character.name} is gratfeul for the gift and whispers in your ear: "${character.secret}"`,
      character.image
    );
  } else if (character.type === "boss" && gift !== character.controlItem.name) {
    inputModal.style.display = "none";
    giveBox.style.display = "none";
    gameOver(
      `${character.name} devours the ${gift} and you. Your journey ends in defeat.`
    );
    return;
  } else if (character.type === "boss" && gift === character.controlItem.name) {
    inputModal.style.display = "none";
    giveBox.style.display = "none";
    img = document.getElementById("end");
    end["src"] = throneroom.image;
    gameOver(
      `${character.name} sees the enchanted crown and cowers before you. You have tamed the dragon and it will obey your commands. You take over the kingdom as the rightful ruler. Your journey ends in victory.`
    );
    return;
  } else {
    alertMessage(
      "An error occured. Try a different action.",
      "./images/invalid.png"
    );
    return;
  }
  removeItem(gift);
}

function doBattle(character, spell) {
  if (character.type === "boss") {
    inputModal.style.display = "none";
    castBox.style.display = "none";
    gameOver(
      `${character.name} will only obey the wearer of the Enchanted Crown of the Kingdom. ${character.name} becomes enraged and attacks you. Your journey ends in defeat.`
    );
  } else if (!spells.innerText.includes(spell)) {
    inputModal.style.display = "none";
    castBox.style.display = "none";
    gameOver(
      `That is not a spell you know. ${character.name} takes advantage of your moment of hesitation and attacks you. Your journey ends in defeat.`
    );
  } else if (spells.innerText.includes(spell) && spell === character.weakness) {
    safeToLeave = true;
    const charImg = document.getElementById("char-image");
    charImg.innerText = "";
    characterText.innerText = "";
    inputModal.style.display = "none";
    castBox.style.display = "none";
    room.character = null;
    alertMessage(
      `You have defeated ${character.name} with your ${spell} spell.`,
      `./images/${spell}.png`
    );
  } else if (spells.innerText.includes(spell) && spell !== character.weakness) {
    inputModal.style.display = "none";
    castBox.style.display = "none";
    gameOver(
      `${character.name} resisted your ${spell} spell. ${character.name} attacks you in retaliation and kills you. Your journey ends in defeat.`
    );
  } else if (spell === "") return;
  else
    alertMessage(
      "An error occured. Try a different action.",
      "./images/invalid.png"
    );
}

function alertMessage(message, imageLink) {
  attributionsList.style.display = "none";
  instructionsList.style.display = "none";
  messageText.innerText = message;
  modalImg["src"] = imageLink;
  messageModal.style.display = "block";
  closeButton.focus();
  actionBox.value = "";
}

function inputSpell() {
  inputModal.style.display = "block";
  castBox.style.display = "block";
  spellPrompt.innerText = `Choose a spell to cast. Known spells: ${spellList.join(
    ", "
  )}.`;
  spellInput.value = "";
  spellInput.focus();
  enterSpell.onclick = function () {
    const spell = spellInput.value.toLowerCase().trim();
    if (room.character) doBattle(room.character, spell);
  };
  spellInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      enterSpell.click();
    }
  });
}

function inputItem() {
  inputModal.style.display = "block";
  giveBox.style.display = "block";
  itemPrompt.innerText = `Choose an item to give. Inventory: ${itemList.join(
    ", "
  )}.`;
  itemInput.value = "";
  itemInput.focus();
  enterItem.onclick = function () {
    const gift = itemInput.value.toLowerCase().trim();
    if (room.character) giveItem(room.character, gift);
  };
  itemInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      enterItem.click();
    }
  });
}

function removeItem(trash) {
  for (i = 0; i < itemList.length; i++) {
    if (itemList[i] === trash) {
      itemList.splice(i);
      inventory.innerText = `Inventory: ${itemList.join(", ")}`;
    }
  }
}

function gameOver(message) {
  restartText.innerText = message;
  restartModal.style.display = "block";
  restartButton.focus();
}

const attributions = document.getElementById("attributions");
const instructions = document.getElementById("instructions");

attributions.onclick = function () {
  messageText.innerText = "";
  instructionsList.style.display = "none";
  attributionsList.style.display = "block";
  messageModal.style.display = "block";
  modalImg["src"] = "";
  closeButton.focus();
};

instructions.onclick = function () {
  messageText.innerText = "";
  attributionsList.style.display = "none";
  instructionsList.style.display = "block";
  messageModal.style.display = "block";
  modalImg["src"] = "";
  closeButton.focus();
};
