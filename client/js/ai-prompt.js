const $ = (id) => document.getElementById(id);

const form = $("form");

form.addEventListener("submit", async function (e) {
  e.preventDefault();

  // Get user input from your form field
  const formData = new FormData(form);
  const userPrompt = formData.get("input"); // input is the name="" of your input field

  finishedLoad("container");
  loading("container");

  // Send JSON to Ollama
  const res = await fetch("https://64b5492b7f60.ngrok-free.app/api/generate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gemma3:1b",
      prompt: userPrompt,
      stream: false,
    }),
  });

  const data = await res.json();

  finishedLoad("container");

  $("response").textContent = data.response;
});
