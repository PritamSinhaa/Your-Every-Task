const $ = (id) => document.getElementById(id);
const $$ = (clss) => document.querySelectorAll(`.${clss}`);

// variable of password
const password = {
  currentPassword: {
    value: "",
    firstFocus: true,
  },

  newPassword: {
    value: "",
    firstFocus: true,
  },

  confirmPassword: {
    value: "",
    firstFocus: true,
  },

  passwordMatch: false,

  message: "",
};

// Hide and show the password
$("btn-show-password").addEventListener("click", function () {
  $$("password").forEach((ele) =>
    ele.type === "password" ? (ele.type = "text") : (ele.type = "password")
  );
});

//handle check new password and confirm password is mactch or not
const checkMatch = () => {
  if (password.newPassword.value !== password.confirmPassword.value) {
    password.passwordMatch = false;
    password.message = "Password is not match";
  } else {
    password.passwordMatch = true;
    password.message = "";
  }
};

// check new-password and confirm -password is match or not
$("new-password").addEventListener("input", function () {
  password.newPassword.value = this.value;

  checkMatch();

  console.log(password.message);
});

$("confirm-password").addEventListener("input", function () {
  password.confirmPassword.value = this.value;

  checkMatch();
  console.log(password.message);
});
