// VALIDATIONS
function validateName() {
  const nameInput = document.querySelector("#Name");
  const nameError = document.querySelector("#nameError");
  const nameEl = nameInput.value.trim();
  if (nameEl === "") {
    nameError.textContent = "Please enter valid name";
    return false;
  } else if (nameEl.length <= 3) {
    nameError.textContent = "Name should contain above three characters!";
    return false;
  } else {
    nameError.textContent = "";
    return true;
  }
}

function validateAddress() {
  const addressInput = document.querySelector("#address");
  const addressError = document.querySelector("#textareaError");
  const addressEl = addressInput.value.trim();
  if (addressEl === "" || addressEl.length <= 10) {
    addressError.textContent = "Please enter valid address";
    return false;
  } else {
    addressError.textContent = "";
    return true;
  }
}

function validateNumber() {
  const numberInput = document.querySelector("#number");
  const numberError = document.querySelector("#numberError");
  const numberEl = numberInput.value.trim();
  if (numberEl === "" || numberEl.length < 10) {
    numberError.textContent = "Please enter valid number";
    return false;
  } else {
    numberError.textContent = "";
    return true;
  }
}

function validateEmail(){
    const emailInput = document.querySelector("#email");
    const emailError = document.querySelector("#emailError");
    const emailEl = emailInput.value.trim();
    if(emailEl === ""){
        emailError.textContent = "Please enter valid email";
        return false;
    }else{
        emailError.textContent = "";
        return true;
    }
}

// FORM VALIDATE
function validation() {
  const isNameValid = validateName();
  const isAddressValid = validateAddress();
  const isNumberValid = validateNumber();
  const isEmailValid = validateEmail();

  return isNameValid && isAddressValid && isNumberValid&& isEmailValid;
}

// Validate while typing
function handleInput(event) {
  validateName();
  validateAddress();
  validateNumber();
  validateEmail();
}

document.querySelectorAll("input").forEach((input) => {
  input.addEventListener("input", handleInput);
});

const formEl = document.querySelector("#myForm");
formEl.addEventListener("submit", (e) => {
  if (!validation()) {
    e.preventDefault();
  }
});
