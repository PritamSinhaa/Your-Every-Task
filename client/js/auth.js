const $ = (id) => document.getElementById(id);

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

// -------------------------------------------
// Handling switch button sign up and sign in
// -------------------------------------------
const enableSignup = () => {
  $("username-container").classList.add("enable-display");
  $("confirm-password-container").classList.add("enable-display");
  $("toggle-signin").classList.add("signin-btn");
  $("toggle-signup").classList.add("signup-btn");
  $("btn-submit").textContent = "Sign in";
  $("btn-submit").value = "signin";
  $("forgot-password").style.display = "block";
};

const enableSignin = () => {
  $("username-container").classList.remove("enable-display");
  $("confirm-password-container").classList.remove("enable-display");
  $("toggle-signin").classList.remove("signin-btn");
  $("toggle-signup").classList.remove("signup-btn");
  $("btn-submit").textContent = "Sign up";
  $("btn-submit").value = "signup";
  $("forgot-password").style.display = "none";
};

// checking there in which state
const signin = localStorage.getItem("signin");
if (signin === null) {
  enableSignup();
} else if (signin === "true") {
  enableSignin();
} else {
  enableSignup();
}
$("auth-toggle").style.display = "flex";

$("toggle-signin").addEventListener("click", function () {
  enableSignup();
  localStorage.setItem("signin", false);
});

$("toggle-signup").addEventListener("click", function () {
  enableSignin();
  localStorage.setItem("signin", true);
});

// Checking focus in/out
function checkFocus(fieldId, fieldState) {
  $(fieldId).addEventListener("focusout", function () {
    fieldState.firstFocus = false;
    fieldState.focusOut = true;
    $(fieldId).dispatchEvent(new Event("input"));
  });
}

// Handling error
const errorHandler = (fieldId, fieldState, messageId) => {
  $(messageId).textContent = fieldState.message;

  if (!fieldState.valid && !fieldState.firstFocus && fieldState.focusOut) {
    $(fieldId).style.border = "4px solid red";
  } else {
    $(fieldId).style.border = "none";
  }
};

// Handling input refocus
const refocusHandler = function (Fieldid) {
  $(Fieldid).focus();
};

// Handling back end response
const responseDisplay = (statusCode, heading, description) => {
  if (statusCode === 400) {
    overlayDisplay(heading, description);
  } else if (statusCode === 201) {
    window.location.replace("../pages/home.html");
  }
};

// Handling form summit response
const overlayDisplay = (heading, description) => {
  $("alert-overlay").style.display = "flex";
  document.body.style.overflow = "hidden";
  $("alert-title").textContent = heading;
  $("alert-message").textContent = description;
};

// -------------------------
// Handling Sign Up Username
// -------------------------
$("username").addEventListener("input", function () {
  const value = this.value;

  if (value.includes(" ")) {
    validation.username.message = "Spaces are not allowed";
    validation.username.valid = false;
  } else if (value.length < 3 && !validation.username.firstFocus) {
    validation.username.message = "Username must be at least 3 characters";
    validation.username.valid = false;
  } else {
    validation.username.message = "";
    validation.username.valid = true;
  }

  errorHandler("username", validation.username, "error-username");
});

checkFocus("username", validation.username);

// -------------------------
// Handling Sign Up Email
// -------------------------
$("email").addEventListener("input", function () {
  const value = this.value.trim();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(value) && !validation.email.firstFocus) {
    validation.email.message = "Invalid email address";
    validation.email.valid = false;
  } else {
    validation.email.message = "";
    validation.email.valid = true;
  }

  errorHandler("email", validation.email, "error-email");
});

checkFocus("email", validation.email);

// -------------------------
// Handling Sign Up Password
// -------------------------

$("password").addEventListener("input", function () {
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

  errorHandler("password", validation.password, "error-password");
  checkPassword();
});

checkFocus("password", validation.password);

// ----------------------------------
// Handling Sign Up Password Confirm
// ----------------------------------

$("confirm-password").addEventListener("input", function () {
  checkPassword();
});

function checkPassword() {
  const confirmPassword = $("confirm-password").value;

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
    "confirm-password",
    validation.confirmPassword,
    "error-confirm-password"
  );
}

checkFocus("confirm-password", validation.confirmPassword);

// ----------------------------------
// Handling password show or hide
// ----------------------------------
$("password-toggle").addEventListener("click", function () {
  if (passwordToggle) {
    $("password").type = "password";
    $("confirm-password").type = "password";

    passwordToggle = false;
  } else {
    $("password").type = "text";
    $("confirm-password").type = "text";

    passwordToggle = true;
  }
});

// -------------------------
// Handling sign up form
// -------------------------

$("auth-form").addEventListener("submit", async function (e) {
  e.preventDefault();

  let res;
  const formData = new FormData($("auth-form"));
  const submitBtn = $("btn-submit").value;

  if (!validation.username.valid && submitBtn === "signup") {
    return refocusHandler("username");
  } else if (!validation.email.valid) {
    return refocusHandler("email");
  } else if (!validation.password.valid) {
    return refocusHandler("password");
  } else if (!validation.confirmPassword.valid && submitBtn === "signup") {
    return refocusHandler("confirm-password");
  }

  try {
    if (submitBtn === "signup") {
      // FIXME: change in real host
      res = await fetch("http://localhost:3000/api/auth/sign-up", {
        method: "POST",
        body: formData,
      });
    } else if (submitBtn === "signin") {
      // FIXME: change in real host
      res = await fetch("http://localhost:3000/api/auth/sign-in", {
        method: "POST",
        body: formData,
      });
    }

    const statusCode = res.status;

    const data = await res.json();

    responseDisplay(statusCode, data.heading, data.message);
  } catch (err) {
    overlayDisplay(
      400,
      "Network Error!",
      "Oops! Something went wrong \nCheck your internet connection"
    );
  }
});

// Handling notification message
$("alert-close").addEventListener("click", function () {
  $("alert-overlay").style.display = "none";
  document.body.style.overflow = "auto";

  localStorage.setItem("signup", true);
});
