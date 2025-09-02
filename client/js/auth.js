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
    $(fieldId).style.border = "4px solid yellow";
  } else {
    $(fieldId).style.border = "none";
  }
};

// Handling input refocus
const refocusHandler = function (Fieldid) {
  $(Fieldid).focus();
};

// Handling form summit response
// TODO: Finished up later
const responseHandler = (res) => {
  console.log("Successfull ", res);
};

// -------------------------
// Handling Sign Up Username
// -------------------------
$("signup-username").addEventListener("input", function () {
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

  errorHandler("signup-username", validation.username, "error-signup-username");
});

checkFocus("signup-username", validation.username);

// -------------------------
// Handling Sign Up Email
// -------------------------
$("signup-email").addEventListener("input", function () {
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

$("signup-password").addEventListener("input", function () {
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

$("signup-confirm-password").addEventListener("input", function () {
  checkPassword();
});

function checkPassword() {
  const confirmPassword = $("signup-confirm-password").value;

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
$("password-toggle").addEventListener("click", function () {
  if (passwordToggle) {
    $("signup-password").type = "password";
    $("signup-confirm-password").type = "password";

    passwordToggle = false;
  } else {
    $("signup-password").type = "text";
    $("signup-confirm-password").type = "text";

    passwordToggle = true;
  }
});

// -------------------------
// Handling sign up form
// -------------------------

$("form-signup").addEventListener("submit", async function (e) {
  e.preventDefault();

  if (!validation.username.valid) {
    return refocusHandler("signup-username");
  } else if (!validation.email.valid) {
    return refocusHandler("signup-email");
  } else if (!validation.password.valid) {
    return refocusHandler("signup-password");
  } else if (!validation.confirmPassword.valid) {
    return refocusHandler("signup-confirm-password");
  }

  const formData = new FormData($("form-signup"));

  try {
    const res = await fetch("http://localhost:3000/api/auth/sign-up", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    successfulHandler(data);
  } catch (err) {
    console.log("Something went wrong! Please try again.", err);
  }
});

function successfulHandler(data) {
  console.log(data);
}
