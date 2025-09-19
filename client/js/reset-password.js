const $ = (id) => document.getElementById(id);
const $$ = (clss) => document.querySelectorAll(`.${clss}`);

$("btn-show-password").addEventListener("click", () => {
  $$("password").forEach((element) => {
    if (element.type === "password") {
      element.type = "text";
    } else {
      element.type = "password";
    }
  });
});
