const id = (id) => document.getElementById(id);

// State
const validation = {
  username: { message: "", valid: false, firstFocus: true, focusOut: false },
  email: { message: "", valid: false, firstFocus: true, focusOut: false },
  password: { message: "", valid: false, firstFocus: true, focusOut: false },
};

// Checking focus in/out
function checkFocus(fieldId, fieldState) {
  id(fieldId).addEventListener("focus", function () {
    fieldState.firstFocus = false;
  });

  id(fieldId).addEventListener("focusout", function () {
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

  errorHandler("signup-password", validation.password, "error-signup-password");
});

checkFocus("signup-password", validation.password);
