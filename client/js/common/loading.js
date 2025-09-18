// Function to show loading skeletons
function loading(targetId, count = 1) {
  const container = document.getElementById(targetId);
  if (!container) {
    console.error(`No element with id "${targetId}" found`);
    return;
  }

  container.style.display = "flex";
  container.style.flexDirection = "column";
  container.style.gap = "20px";

  // Clear old loaders
  container.innerHTML = "";

  for (let i = 0; i < count; i++) {
    const card = document.createElement("div");
    card.className = "card";

    const avatar = document.createElement("div");
    avatar.className = "avatar";
    card.appendChild(avatar);

    const lines = document.createElement("div");
    lines.className = "lines";

    ["short", "medium", "long"].forEach((type) => {
      const line = document.createElement("div");
      line.className = `line ${type}`;
      lines.appendChild(line);
    });

    card.appendChild(lines);
    container.appendChild(card);
  }
}

// Function to remove the loader
function finishedLoad(targetId) {
  const container = document.getElementById(targetId);
  if (container) {
    container.innerHTML = "";
    container.style.display = "none";
  }
}
