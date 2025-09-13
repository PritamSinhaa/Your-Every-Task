const $ = (id) => document.getElementById(id);
const $$ = (clss) => document.querySelectorAll(`.${clss}`);

const inputValue = $$("otp");

// checking the input is empty or not
const hasEmpty = () =>
  Array.from(inputValue).some(
    (element) => element.value === "" || element.value === undefined
  );

// handle the otp input
inputValue.forEach((element, i) => {
  element.addEventListener("input", () => {
    element.value = element.value.replace(/\D/g, "");

    const button = $("btn-submit");
    const empty = hasEmpty();

    button.disabled = empty;
    button.classList.toggle("btn-disable", empty);

    // Auto move to next box if current has a digit
    if (element.value !== "" && i < inputValue.length - 1) {
      inputValue[i + 1].focus();
    }

    // Move back if box is empty and not the first
    if (element.value === "" && i > 0) {
      inputValue[i - 1].focus();
    }
  });
});

// check valid email

// handle send email
$("btn-send").addEventListener("click", async (e) => {
  e.preventDefault();

  const email = $("email").value;

  const formData = new FormData();
  formData.append("email: ", email);

  try {
    const res = await fetch("http://localhost:3000/auth/send-email", {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    console.log(data);
  } catch (err) {
    console.log(err);
  }
});

// handle the back btn
$("btn-back").addEventListener("click", () => {
  window.location.href = "../pages/auth.html";
});
