// Utility function to get element by ID
const id = (name) => document.getElementById(name);

// State
let showPassword = false;
let firstFocus = {
  username: true,
  email: true,
  password: true,
  confirm: true,
};

let validation = {
  username: { message: "", valid: false },
  email: { message: "", valid: false },
  password: { message: "", valid: false, value: "" },
  confirmPassword: { message: "", valid: false },
};

// ---- Message handler ----
const setMessage = (fieldId, message) => {
  id(fieldId).textContent = message;
};

// ====== Remove error border ======
const rmBorder = (fieldId) => {
  id(fieldId).style.border = "none";
};

// ======= Check focus out error ========
const checkFocus = (fieldId, messageId, message) => {
  id(fieldId).addEventListener("focusout", () => {
    firstFocus.username = false;
    setMessage(messageId, message);

    if (!validation.username.valid) {
      id(fieldId).style.border = "4px red solid";
    }
  });
};

// Username Validation
id("user-id").addEventListener("input", function () {
  const value = this.value;

  if (value.includes(" ")) {
    validation.username = { message: "Spaces are not allowed", valid: false };
  } else if (value.length < 4) {
    validation.username = {
      message: "Username must be at least 4 characters",
      valid: false,
    };
  } else {
    rmBorder("user-id");
    validation.username = { message: "Valid username", valid: true };
  }

  if (!firstFocus.username) {
    setMessage("sign-up-username", validation.username.message);
  }
});

checkFocus("user-id", "sign-up-username", validation.username.message);

// Email Validation
id("email-id").addEventListener("input", function () {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!regex.test(this.value)) {
    validation.email = { message: "Email not valid", valid: false };
  } else {
    validation.email = { message: "Valid email", valid: true };
  }

  setMessage("sign-up-email", validation.email.message);
});

// Password Validation
id("pass-id").addEventListener("focus", () => {
  firstFocus.password = true;
});

id("pass-id").addEventListener("input", function () {
  const value = this.value;
  const regex = /[^a-zA-Z0-9]/; // checks for symbol

  if (value.includes(" ")) {
    validation.password = {
      message: "Spaces are not allowed",
      valid: false,
      value,
    };
  } else if (!(value.length >= 8 && regex.test(value))) {
    validation.password = {
      message: "Password must contain at least 8 characters including a symbol",
      valid: false,
      value,
    };
  } else {
    validation.password = { message: "Valid password", valid: true, value };
  }

  setMessage("sign-up-pass-error", validation.password.message);

  // Re-check confirm password if already typed
  if (firstFocus.password) checkConfirmPassword();
});

// Confirm Password Validation
id("confirm-id").addEventListener("input", checkConfirmPassword);

function checkConfirmPassword() {
  const confirmValue = id("confirm-id").value;

  if (validation.password.value !== confirmValue) {
    validation.confirmPassword = {
      message: "Passwords do not match",
      valid: false,
    };
  } else {
    validation.confirmPassword = { message: "Passwords match", valid: true };
  }

  setMessage("sign-up-confirm-pass", validation.confirmPassword.message);
}

// Password Show/Hide
id("password-show").addEventListener("click", function () {
  showPassword = !showPassword;

  id("pass-id").type = showPassword ? "text" : "password";
  id("confirm-id").type = showPassword ? "text" : "password";
});

// Form Submission
id("sign-up-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const { username, email, password, confirmPassword } = validation;

  if (
    username.valid &&
    email.valid &&
    password.valid &&
    confirmPassword.valid
  ) {
    const formData = new FormData(id("form"));
    await authSubmit(formData);
  } else {
    alert("Please fix errors before submitting.");
  }
});

// Backend Request
const authSubmit = async (formData) => {
  try {
    const res = await fetch("/auth/sign-up", {
      method: "POST",
      body: formData,
    });

    // Response from backend
  } catch (err) {
    console.error("Submission failed:", err);
    // TODO: Show error to user in UI
  }
};
