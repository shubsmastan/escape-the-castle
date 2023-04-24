export function alertMessage(message, imageLink) {
  const attributionsList = document.getElementById("attributions-list");
  const instructionsList = document.getElementById("instructions-list");
  const messageModal = document.getElementById("message-modal");
  const messageText = document.getElementById("message");
  const modalImg = document.getElementById("modal-image");
  const closeButton = document.getElementById("closebtn");
  attributionsList.style.display = "none";
  instructionsList.style.display = "none";
  messageText.innerText = message;
  modalImg["src"] = imageLink;
  messageModal.style.display = "block";
  closeButton.addEventListener("click", function () {
    messageModal.style.display = "none";
    document.getElementById("action").focus();
  });
  document.getElementById("action").value = "";
  closeButton.focus();
}

export function gameOver(message) {
  const restartModal = document.getElementById("restart-modal");
  const restartText = document.getElementById("restart");
  const restartButton = document.getElementById("restartbtn");
  restartText.innerText = message;
  restartModal.style.display = "block";
  restartButton.addEventListener("click", function () {
    location.reload();
  });
  restartButton.focus();
}

const attributions = document.getElementById("attributions");
const instructions = document.getElementById("instructions");

attributions.onclick = function () {
  const attributionsList = document.getElementById("attributions-list");
  const instructionsList = document.getElementById("instructions-list");
  const messageModal = document.getElementById("message-modal");
  const messageText = document.getElementById("message");
  const modalImg = document.getElementById("modal-image");
  const closeButton = document.getElementById("closebtn");
  messageText.innerText = "";
  instructionsList.style.display = "none";
  attributionsList.style.display = "block";
  messageModal.style.display = "block";
  modalImg["src"] = "";
  closeButton.addEventListener("click", function () {
    messageModal.style.display = "none";
    document.getElementById("action").focus();
  });
  closeButton.focus();
};

instructions.onclick = function () {
  const attributionsList = document.getElementById("attributions-list");
  const instructionsList = document.getElementById("instructions-list");
  const messageModal = document.getElementById("message-modal");
  const messageText = document.getElementById("message");
  const modalImg = document.getElementById("modal-image");
  const closeButton = document.getElementById("closebtn");
  messageText.innerText = "";
  attributionsList.style.display = "none";
  instructionsList.style.display = "block";
  messageModal.style.display = "block";
  modalImg["src"] = "";
  closeButton.addEventListener("click", function () {
    messageModal.style.display = "none";
    document.getElementById("action").focus();
  });
  closeButton.focus();
};
