// skeleton.js

// Function to create and show a skeleton loader
function loading(targetId) {
  const container = document.getElementById(targetId);

  if (!container) {
    console.error(`No element with id "${targetId}" found`);
    return;
  }

  // Create wrapper
  const card = document.createElement("div");
  card.className = "card";

  // Avatar
  const avatar = document.createElement("div");
  avatar.className = "avatar";
  card.appendChild(avatar);

  // Lines container
  const lines = document.createElement("div");
  lines.style.flex = "1";

  // Lines
  const lineShort = document.createElement("div");
  lineShort.className = "line short";
  const lineMedium = document.createElement("div");
  lineMedium.className = "line medium";
  const lineLong = document.createElement("div");
  lineLong.className = "line long";

  lines.appendChild(lineShort);
  lines.appendChild(lineMedium);
  lines.appendChild(lineLong);

  // Add to card
  card.appendChild(lines);

  // Add card to target container
  container.appendChild(card);
}

function finishedLoad(id) {
  document.getElementById(id).style.display = "none";
}
