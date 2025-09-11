const $ = (id) => document.getElementById(id);
const $$ = (clss) => document.querySelectorAll(`.${clss}`);

const inputValue = $$("otp");

const hasEmpty = () =>
  Array.from(inputValue).some(
    (element) => element.value === "" || element.value === undefined
  );

inputValue.forEach((element, i) => {
  element.addEventListener("input", () => {
    const button = $("btn-submit");
    const empty = hasEmpty();

    button.disabled = empty;
    button.classList.toggle("btn-disable", empty);

    if (element.value !== "" && i < inputValue.length - 1) {
      inputValue[i + 1].focus();
    }

    if (element.value === "" && i > 0) {
      inputValue[i - 1].focus();
    }
  });
});
