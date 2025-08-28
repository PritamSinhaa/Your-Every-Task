const id = (name) => document.getElementById(name);
let showPassword = false;

let validUserName = {
  message: "",
  valid: false,
};

let validEmail = {
  message: "",
  valid: false,
};

let validPassword = {
  message: "",
  valid: false,
  password: "",
  hide: true,
};

let comfirmPassword = {
  message: "",
  valid: true,
};

// Validation username
function userNameHandler() {
  id("sign-up-username").textContent = validUserName.message;
}

id("user-id").addEventListener("input", function () {
  const value = this.value;

  if (value.includes(" ")) {
    validUserName = {
      message: "Space is not allow",
      valid: false,
    };

    userNameHandler();
  } else if (value.length < 3) {
    validUserName = {
      message: "User name much atleast 4 character",
      valid: false,
    };

    userNameHandler();
  } else {
    validUserName = {
      message: "Valid username",
      valid: true,
    };

    userNameHandler();
  }
});

// Validation email
function emailHandler() {
  id("sign-up-email").textContent = validEmail.message;
}

id("email-id").addEventListener("input", function () {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!regex.test(this.value)) {
    validEmail = {
      message: "Email not valid",
      valid: false,
    };

    emailHandler();
  } else {
    validEmail = {
      message: "Valid email",
      valid: true,
    };

    emailHandler();
  }
});

// Validation password
function passwordHandler() {
  id("sign-up-pass-error").textContent = validPassword.message;
}

id("pass-id").addEventListener("input", function () {
  const value = this.value;
  const regex = /[^a-zA-Z0-9]/;

  if (value.includes(" ")) {
    validPassword = {
      message: "Space is not allow.",
      valid: false,
    };
  } else if (!(value.length >= 8 && regex.test(value))) {
    validPassword = {
      message: "Password much be contain 8 character with symbol",
      valid: false,
      password: value,
    };
  } else {
    validPassword = {
      message: "Valid password",
      valid: true,
      password: value,
    };
  }

  passwordHandler();
});

// Confirm password

function confirmHandler(message) {
  id("sign-up-confirm-pass").textContent = comfirmPassword.message;
}

id("confirm-id").addEventListener("input", function () {
  if (validPassword.password !== this.value) {
    comfirmPassword = {
      message: "Password is not match.",
      valid: false,
    };
  } else {
    comfirmPassword = {
      message: "Password is match",
    };
  }

  confirmHandler();
});

// Handling the password hide and show
id("password-show").addEventListener("click", function () {
  if (!showPassword) {
    id("pass-id").type = "text";
    id("confirm-id").type = "text";
    showPassword = true;
  } else {
    id("pass-id").type = "password";
    id("confirm-id").type = "password";
    showPassword = false;
  }
});

// TODO: This is not complete yet
// Form submittion
const formSubmittion = (e) => {
  e.preventDefault();

  const formData = new FormData(id("form"));

  if (validUserName.valid && validEmail.valid && validPassword.valid) {
    authSubmit(formData);
  }
};

// TODO: This is not complete yet
// Passing to backend
const authSubmit = async (formData) => {
  try {
    await fetch("/auth/sign-up", {
      type: "POST",
      body: formData,
    });
  } catch (err) {
    // FIXME: Pass to user this error
  }
};
