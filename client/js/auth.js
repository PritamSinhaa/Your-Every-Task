const id = (id) => document.getElementById(id);

// State
let passwordToggle = false;

const validation = {
  username: { message: "", valid: false, firstFocus: true, focusOut: false },
  email: { message: "", valid: false, firstFocus: true, focusOut: false },
  password: {
    message: "",
    valid: false,
    firstFocus: true,
    focusOut: false,
    value: "",
  },
  confirmPassword: {
    message: "",
    valid: false,
    firstFocus: true,
    focusOut: false,
  },
};

// Checking focus in/out
function checkFocus(fieldId, fieldState) {
  id(fieldId).addEventListener("focusout", function () {
    fieldState.firstFocus = false;
    fieldState.focusOut = true;
    id(fieldId).dispatchEvent(new Event("input"));
  });
}

// Handling error
const errorHandler = (fieldId, fieldState, messageId) => {
  id(messageId).textContent = fieldState.message;

  if (!fieldState.valid && !fieldState.firstFocus && fieldState.focusOut) {
    id(fieldId).style.border = "4px solid yellow";
  } else {
    id(fieldId).style.border = "none";
  }
};

// -------------------------
// Handling Sign Up Username
// -------------------------
id("signup-username").addEventListener("input", function () {
  const value = this.value;

  if (value.includes(" ")) {
    validation.username.message = "Spaces are not allowed";
    validation.username.valid = false;
  } else if (value.length < 4 && !validation.username.firstFocus) {
    validation.username.message = "Username must be at least 4 characters";
    validation.username.valid = false;
  } else {
    validation.username.message = "";
    validation.username.valid = true;
  }

  errorHandler("signup-username", validation.username, "error-signup-username");
});

checkFocus("signup-username", validation.username);

// -------------------------
// Handling Sign Up Email
// -------------------------
id("signup-email").addEventListener("input", function () {
  const value = this.value.trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(value) && !validation.email.firstFocus) {
    validation.email.message = "Invalid email address";
    validation.email.valid = false;
  } else {
    validation.email.message = "";
    validation.email.valid = true;
  }

  errorHandler("signup-email", validation.email, "error-signup-email");
});

checkFocus("signup-email", validation.email);

// -------------------------
// Handling Sign Up Password
// -------------------------

id("signup-password").addEventListener("input", function () {
  const passwordRegex = /^(?=.*[^a-zA-Z0-9])\S{8,}$/;

  if (!passwordRegex.test(this.value)) {
    if (this.value.includes(" ")) {
      validation.password.message = "Spaces are not allowed";
    } else if (this.value.length < 8) {
      validation.password.message = "Password must be at least 8 characters";
    } else {
      validation.password.message = "Password must include a symbol";
    }

    validation.password.valid = false;
  } else {
    validation.password.message = "";
    validation.password.valid = true;
  }

  validation.password.value = this.value;

  errorHandler("signup-password", validation.password, "error-signup-password");
  checkPassword();
});

checkFocus("signup-password", validation.password);

// ----------------------------------
// Handling Sign Up Password Confirm
// ----------------------------------

id("signup-confirm-password").addEventListener("input", function () {
  checkPassword();
});

function checkPassword() {
  const confirmPassword = id("signup-confirm-password").value;

  if (
    validation.password.value !== confirmPassword &&
    !validation.confirmPassword.firstFocus
  ) {
    validation.confirmPassword.message = "Password is not match";
    validation.confirmPassword.valid = false;
  }

  if (validation.password.value === confirmPassword) {
    validation.confirmPassword.message = "";
    validation.confirmPassword.valid = true;
  }

  errorHandler(
    "signup-confirm-password",
    validation.confirmPassword,
    "error-signup-confirm-password"
  );
}

checkFocus("signup-confirm-password", validation.confirmPassword);

// ----------------------------------
// Handling password show or hide
// ----------------------------------
id("password-toggle").addEventListener("click", function () {
  if (passwordToggle) {
    id("signup-password").type = "password";
    id("signup-confirm-password").type = "password";

    passwordToggle = false;
  } else {
    id("signup-password").type = "text";
    id("signup-confirm-password").type = "text";

    passwordToggle = true;
  }
});

// ----------------------------------
// Toggling sign in and sign up
// ----------------------------------

let signUpBtn = id("toggle-signup");
let signInBtn = id("toggle-signin");
let signInForm = id("form-signin");
let signUpForm = id("form-signup");

signInBtn.addEventListener("click", () => {
  signUpForm.style.display = "none";
  signInForm.style.display = "flex";
  signInForm.style.display = "flex";
  signUpBtn.style.width = "45%";
  signUpBtn.style.color = "var(--color-PrimaryText)";
  signUpBtn.style.backgroundColor = "var(--color-LiteBg1)";
  signUpBtn.style.borderRadius = "0 0 1.6rem 0";

  signInBtn.style.color = "var(--color-Input)";
  signInBtn.style.backgroundColor = "var(--color-BtnBg)";
  signInBtn.style.width = "55%";
  signInBtn.style.borderRadius = "1.6rem 0 0 0";
});

signUpBtn.addEventListener("click", () => {
  signUpForm.style.display = "flex";
  signInForm.style.display = "none";
  signUpBtn.style.width = "55%";
  signUpBtn.style.color = "var(--color-Input)";
  signUpBtn.style.backgroundColor = "var(--color-BtnBg)";
  signUpBtn.style.borderRadius = "0 1.6rem 0 0";

  signInBtn.style.color = "var(--color-PrimaryText)";
  signInBtn.style.backgroundColor = "var(--color-LiteBg1)";
  signInBtn.style.width = "45%";
  signInBtn.style.borderRadius = "0 0 0 1.6rem";
});
