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

const regixPassword = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

//handle check new password and confirm password is mactch or not
const checkMatch = () => {
  if (password.newPassword.value)
    if (
      password.newPassword.value !== password.confirmPassword.value &&
      !password.confirmPassword.firstFocus
    ) {
      password.passwordMatch = false;
      password.message = "Password is not match";
      return;
    } else if (password.newPassword.value == password.confirmPassword.value) {
      password.passwordMatch = true;
      password.message = "";
      return;
    }
};

// check valid password

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

// handling reset - form

$("btn-submit").addEventListener("click", async function (e) {
  e.preventDefault();

  const form = $("form");

  const formData = new FormData(form);

  try {
    // TODO: chnage this local host in real web
    const res = await fetch("http://localhost:3000/api/auth/reset-password", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    console.log(data);
  } catch {}
});
