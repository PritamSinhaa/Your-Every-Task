const form = document.querySelector(".form");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  console.log("hello");
  const formData = new FormData(form);

  try {
    const res = await fetch("http://localhost:3000/api/auth", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    console.log(data);
  } catch (err) {
    console.log(err);
  }
});
