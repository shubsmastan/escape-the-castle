import { dungeon } from "./src/room.js";
import { alertMessage, gameOver } from "./src/functions.js";

export const submitButton = document.getElementById("submit");
export const actionBox = document.getElementById("action");
submitButton.addEventListener("click", submitAction);
actionBox.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    submitButton.click();
  }
});

window.onclick = function (e) {
  const messageModal = document.getElementById("message-modal");
  if (e.target === messageModal) {
    messageModal.style.display = "none";
  }
};

let room = dungeon;
let safeToLeave = true;
let itemList = [];
let spellList = [];
let numberOfItems = 0;

setRoom(room);
actionBox.focus();

function submitAction() {
  const action = actionBox.value.toLowerCase().trim();
  const item = room.item;
  const character = room.character;
  const directions = ["north", "east", "west", "south"];
  const inventory = document.getElementById("inventory");
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
  const roomName = document.getElementById("room-name");
  const roomText = document.getElementById("room-description");
  roomName.innerText = `You are in the ${room.name}.`;
  roomText.innerText = room.description;
  const roomImg = document.getElementById("room-image");
  roomImg.innerText = "";
  const img = document.createElement("img");
  img["src"] = room.image;
  img.style.height = "40px";
  img.style.width = "auto";
  roomImg.appendChild(img);
  const roomConnections = document.querySelectorAll(".direction");
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
  const itemText = document.getElementById("item");
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
  const characterText = document.getElementById("character");
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

export function getItem(item) {
  const inventory = document.getElementById("inventory");
  itemList.push(item.name);
  inventory.innerText = `Inventory: ${itemList.join(", ")}`;
  const itemText = document.getElementById("item");
  itemText.innerText = "";
  numberOfItems += 1;
  room.item = null;
  alertMessage(`The ${item.name} was added to your inventory.`, item.image);

  const itemImg = document.getElementById("item-image");
  itemImg.innerText = "";
  if (item.type === "weapon") {
    const spells = document.getElementById("spells");
    const messageText = document.getElementById("message");
    const p = document.createElement("p");
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

export function talkTo(character) {
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

export function giveItem(character, gift) {
  const inputModal = document.getElementById("input-modal");
  const giveBox = document.getElementById("give");
  const inventory = document.getElementById("inventory");
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
    const img = document.getElementById("end");
    img["src"] = "./images/throneroom.png";
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
  actionBox.focus();
}

export function doBattle(character, spell) {
  const inputModal = document.getElementById("input-modal");
  const castBox = document.getElementById("cast");
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
    const characterText = document.getElementById("character");
    characterText.innerText = "";
    inputModal.style.display = "none";
    castBox.style.display = "none";
    room.character = null;
    alertMessage(
      `You have defeated ${character.name} with your ${spell} spell.`,
      `./images/${spell}.png`
    );
  } else if (spells.innerText.includes(spell) && spell !== character.weakness) {
    const inputModal = document.getElementById("input-modal");
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

export function inputSpell() {
  const castBox = document.getElementById("cast");
  const spellPrompt = document.getElementById("spell-prompt");
  const spellInput = document.getElementById("input-spell");
  const enterSpell = document.getElementById("enter-spell");
  const inputModal = document.getElementById("input-modal");
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

export function inputItem() {
  const itemPrompt = document.getElementById("item-prompt");
  const itemInput = document.getElementById("input-item");
  const enterItem = document.getElementById("enter-item");
  const giveBox = document.getElementById("give");
  const inputModal = document.getElementById("input-modal");
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

export function removeItem(trash) {
  const inventory = document.getElementById("inventory");
  for (let i = 0; i < itemList.length; i++) {
    if (itemList[i] === trash) {
      itemList.splice(i, 1);
      inventory.innerText = `Inventory: ${itemList.join(", ")}`;
    }
  }
}
