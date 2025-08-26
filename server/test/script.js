const form = document.querySelector(".form");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(form);

  try {
    const res = await fetch("http://localhost:3000/api/auth/sign-up", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    console.log("Response from backend", data);
  } catch (err) {
    console.log(err);
  }
});
