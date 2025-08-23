const form = document.querySelector(".form");
const passwordError = document.querySelector(".password-error");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const email = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;

  console.log({ email, password });

  email.endsWith("@gmail.com")
    ? console.log("Valid email")
    : console.log("Invalid email");

  if (
    password.length > 8 &&
    /^(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,}$/.test(password)
  ) {
    passwordError.style.display = "none";
  } else {
    passwordError.style.display = "block";
  }
});

// include symbol at least 8 character with number | password verification
// When the form is not valid refocus on the error part
// Add click listener in eye button to hidden or show the password
// Make function about sign in and sign up for switching btw
// change full width of password border
// forget password but add click listener ? ?keep for later
// change the font forget password and sign up
