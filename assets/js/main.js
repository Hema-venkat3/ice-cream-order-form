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
    console.log(nameEl);
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
    console.log(addressEl);
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
    console.log(numberEl);
    return true;
  }
}

function validateEmail() {
  const emailInput = document.querySelector("#email");
  const emailError = document.querySelector("#emailError");
  const emailEl = emailInput.value.trim();
  if (emailEl === "") {
    emailError.textContent = "Please enter valid email";
    return false;
  } else {
    emailError.textContent = "";
    console.log(emailEl);
    return true;
  }
}

// FORM VALIDATE
function validation() {
  const isNameValid = validateName();
  const isAddressValid = validateAddress();
  const isNumberValid = validateNumber();
  const isEmailValid = validateEmail();

  return isNameValid && isAddressValid && isNumberValid && isEmailValid;
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

// LOCAL STORAGE
const formEl = document.querySelector("#myForm");
let formValueObj;
formEl.addEventListener("submit", (e) => {
  e.preventDefault();
  if (!validation()) {
    return;
  }
  const formData = new FormData(formEl);
  formValueObj = Object.fromEntries(formData.entries());
  console.log("This is entries of form data: ", formValueObj);

  // checkbox
  const checkboxEl = document.querySelectorAll('input[type="checkbox"]');
  const checkedValues = [];
  checkboxEl.forEach((checkbox) => {
    if (checkbox.checked) {
      checkedValues.push(checkbox.value);
    }
  });
  console.log("checked values", checkedValues);

  // Retrieve existing data from local storage
  let existingData = localStorage.getItem("orderData")
    ? JSON.parse(localStorage.getItem("orderData"))
    : [];

  // Ensure existingData is an array
  if (!Array.isArray(existingData)) {
    existingData = []; // Initialize it as an empty array if it's not already an array
  }

  // latest order details to get
  const latestOrder = existingData[existingData.length-1];

  // Push the new form data into the existing data array
  existingData.push({
    formValueObj: formValueObj,
    checkedValues: checkedValues,
  });

  // Store the updated data back to local storage
  localStorage.setItem("orderData", JSON.stringify(existingData));
  formEl.reset();

  let getDataEl = document.getElementById("getData");
  let showDataEl = document.getElementById("showData");

  getDataEl.classList.add("hidden");
  showDataEl.classList.remove("hidden");

  const homemade_cakes = document.getElementById("homemade_cakes");
  homemade_cakes.classList.add("hidden");

  const menuEl = document.getElementById("menu");
  menuEl.classList.add("hidden");

  // Displaying details in UI
  let tableEl = document.getElementById("table");
  const getItems = localStorage.getItem("orderData");
  console.log("getted items", getItems);
  const getItemsArr = JSON.parse(localStorage.getItem("orderData"));
  const finalData = getItemsArr.map((getItems) => {
    console.log("this is name", getItems.formValueObj.address); // Check if formValueObj is defined
    console.log(getItems.checkedValues);
    const newTrTemplate = `
  <tr class="rounded hover:bg-orange-200 divide-y divide-gray-200">
  <style>
  .word-wrap {
    white-space: normal;
    word-break: break-all;
  }
</style>

<td class="p-3 text-xs border-2 border-s-slate-50 text-center text-slate-500 word-wrap" style="width: 150px;">
  ${getItems.formValueObj.Name}
</td>
<td class="p-3 text-xs border-2 border-s-slate-50 text-center text-slate-500 word-wrap" style="width: 150px;">
  ${getItems.formValueObj.address}
</td>
<td class="p-3 text-xs border-2 border-s-slate-50 text-center text-slate-500 word-wrap" style="width: 100px;">
  ${getItems.formValueObj.number}
</td>
<td class="p-3 text-xs border-2 border-s-slate-50 text-center text-slate-500 word-wrap" style="width: 150px;">
  ${getItems.formValueObj.email}
</td>
<td class="p-3 text-xs border-2 border-s-slate-50 text-center text-slate-500 word-wrap" style="width: 150px;">
  ${getItems.checkedValues}
</td>
   </tr>
  `;
    return newTrTemplate;
  });
  console.log("this is final data", finalData);
  tableEl.innerHTML += finalData.join("");
});
