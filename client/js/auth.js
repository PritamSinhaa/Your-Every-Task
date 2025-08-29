const id = (id) => document.getElementById(id);

// State
const validation = {
  userName: { message: "", valid: false, firstFocus: true, focusOut: false },
  email: { message: "", valid: false, firstFocus: true, focusOut: false },
};

// Checking focus out
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
const errorHandler = (fieldId, dataId, messageId, message) => {
  id(messageId).textContent = message;

  if (!dataId.valid && !dataId.firstFocus && dataId.focusOut) {
    id(fieldId).style.border = "4px solid red";
  } else {
    id(fieldId).style.border = "2px solid green"; // or reset border
  }
};

// Handling username
id("user-name").addEventListener("input", function () {
  const value = this.value.trim();

  if (value.includes(" ")) {
    validation.userName.message = "Space is not allowed";
    validation.userName.valid = false;
  } else if (value.length < 4 && !validation.userName.firstFocus) {
    validation.userName.message = "User name must be at least 4 characters";
    validation.userName.valid = false;
  } else {
    validation.userName.message = "";
    validation.userName.valid = true;
  }

  errorHandler(
    "user-name",
    validation.userName,
    "sign-up-username",
    validation.userName.message
  );
});

checkFocus("user-name", validation.userName);
