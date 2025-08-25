const form = document.querySelector(".form1");
const password = document.querySelector("#password");
const passwordError = document.querySelector(".password-error");
const showPassword = document.querySelector("#show-password");
const signInBtn = document.querySelector(".sign-in-container");
const signUpBtn = document.querySelector(".sign-up-container");

// Password type case
const passwordInputType = {
  hide: "password",
  show: "text",
};

// Keep for back-end
const authFun = () => {
  console.log(" Auth is Succesfull");
};

// Handling form submitting
form.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(form);

  console.log(formData.get("email"));

  const email = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;
  let emailValid = false;
  let passwordValid = false;
  +email.endsWith("@gmail.com") ? (emailValid = false) : (emailValid = true);

  if (
    password.length > 8 &&
    /^(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,}$/.test(password)
  ) {
    passwordError.style.display = "none";
    passwordValid = true;
  } else {
    passwordError.style.display = "block";
    passwordValid = false;
  }

  console.log(passwordValid, emailValid);

  passwordValid && emailValid
    ? authFun()
    : console.log("Authentification fail");
});

// Password show and hide
showPassword.addEventListener("click", () => {
  password.getAttribute("type") === passwordInputType.hide
    ? password.setAttribute("type", passwordInputType.show)
    : password.setAttribute("type", passwordInputType.hide);
});

//sign in button

signInBtn.addEventListener("click", (e) => {});

// When the form is not valid refocus on the error part
// Add click listener in eye button to hidden or show the password
// Make function about sign in and sign up for switching btw
// change full width of password border
// forget password but add click listener ? ?keep for later
// change the font forget password and sign up
