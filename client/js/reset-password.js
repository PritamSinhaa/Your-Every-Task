const $ = (id) => document.getElementById(id);
const $$ = (clss) => document.querySelectorAll(`.${clss}`);

// Hide and show the password
$("btn-show-password").addEventListener("click", function () {
  $$("password").forEach((ele) =>
    ele.type === "password" ? (ele.type = "text") : (ele.type = "password")
  );
});
