document.addEventListener("DOMContentLoaded", () => {
  const $ = (id) => document.getElementById(id);
  const form = $("form"); // <form id="form">

  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const loadingContainer = $("loading");
    const responseContainer = $("response");

    if (!form || !loadingContainer || !responseContainer) {
      console.error("Required elements not found");
      return;
    }

    // Clear old response
    responseContainer.textContent = "";
    responseContainer.style.display = "none";
    // Show loader
    loading("loading");

    try {
      const res = await fetch(
        "https://37fbbd990937.ngrok-free.app/api/generate",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            model: "gemma3:1b",
            prompt: new FormData(form).get("input"),
            stream: false,
          }),
        }
      );

      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

      const data = await res.json();

      finishedLoad("loading");
      $("response").style.display = "block";
      responseContainer.textContent = data.response || "No response from AI";
    } catch (err) {
      finishedLoad("loading");
      console.error(err);
      responseContainer.textContent = "Something went wrong. Please try again.";
    }
  });
});
