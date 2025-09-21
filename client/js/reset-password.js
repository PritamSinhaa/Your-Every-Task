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
  if (
    password.newPassword.value !== password.confirmPassword.value &&
    !password.confirmPassword.firstFocus
  ) {
    password.passwordMatch = false;
    password.message = "Password is not match";
  } else if (password.newPassword.value == password.confirmPassword.value) {
    password.passwordMatch = true;
    password.message = "";
  }
};

// Handling error
function message() {
  $("confirm-password-message").textContent = password.message;
}

// check new-password and confirm -password is match or not
$("new-password").addEventListener("input", function () {
  password.newPassword.value = this.value;

  checkMatch();
  message();
});

$("confirm-password").addEventListener("input", function () {
  password.confirmPassword.value = this.value;

  password.confirmPassword.firstFocus = false;
  checkMatch();
  message();
});
