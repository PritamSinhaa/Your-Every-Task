const $ = (id) => document.getElementById(id);
const $$ = (clss) => document.querySelectorAll(`.${clss}`);

const inputValue = $$("otp");

const hasEmpty = () =>
  Array.from(inputValue).some(
    (element) => element.value === "" || element.value === undefined
  );

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

$("btn-back").addEventListener("click", () => {
  window.location.href = "../pages/auth.html";
});

const generateOTP = () => {
  const random = Math.floor(Math.random() * Math.pow(10, 6));
  return Number(String(random).padEnd(6, "0"));
};

console.log(generateOTP());
