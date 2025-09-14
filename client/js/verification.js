const $ = (id) => document.getElementById(id);
const $$ = (clss) => document.querySelectorAll(`.${clss}`);

const BtnSend = $("btn-send");

const inputValue = $$("otp");
let timeOut = true;

// disable button
function disableButton() {
  BtnSend.disabled = true;
  BtnSend.style.backgroundColor = "var(--color-DisableBtn) !important";
}

// enable button
function enableButton() {
  BtnSend.textContent = "Send";
  BtnSend.disabled = false;
  BtnSend.style.backgroundColor = "var(--color-BtnBg) !important";
}

// check valid email
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function checkValid(email) {
  return emailRegex.test(email) && timeOut;
}

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

// count down for resend
function countDown() {
  let time = 30;

  const timer = setInterval(() => {
    time--;

    if (time < 1) {
      clearInterval(timer);
      enableButton();
      timeOut = true;
    } else {
      disableButton();
      BtnSend.textContent = time;
      timeOut = false;
    }
  }, 1000);
}

// check email input
$("email").addEventListener("input", function () {
  const valid = checkValid(this.value);

  if (valid) {
    enableButton();
  } else {
    disableButton();
  }
});

BtnSend.addEventListener("click", async (e) => {
  e.preventDefault();

  countDown();

  inputValue.forEach((element) => {
    element.disabled = false;
    element.style.backgroundColor = "#919191ff";
  });
});

// handle the back btn
$("btn-back").addEventListener("click", () => {
  window.location.href = "../pages/auth.html";
});
