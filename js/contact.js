const contactForm = document.querySelector("#contactForm");

const firstName = document.querySelector("#firstName");
const firstNameError = document.querySelector("#firstName-error");

const subject = document.querySelector("#subject");
const subjectError = document.querySelector("#subject-error");

const email = document.querySelector("#email");
const emailError = document.querySelector("#email-error");

const message = document.querySelector("#message");
const messageError = document.querySelector("#message-error");

const success = document.querySelector(".success");
const submitIfValid = document.querySelector(".submit");

function contactValidation(e) {
  e.preventDefault();
  const firstNameLength = numberOfCharacters(firstName.value, 5);
  const subjectLength = numberOfCharacters(subject.value, 15);
  const messageLength = numberOfCharacters(message.value, 25);
  const emailCheck = emailValidation(email.value);

  if (firstNameLength && subjectLength && messageLength && emailCheck) {
    success.innerHTML =
      '<div class="success">Your message has been successfully sent. We will contact you very soon!</div>';
  } else {
    success.innerHTML = "";
  }
  if (firstNameLength === true) {
    firstNameError.style.display = "none";
  } else {
    firstNameError.style.display = "block";
  }

  if (subjectLength === true) {
    subjectError.style.display = "none";
  } else {
    subjectError.style.display = "block";
  }

  if (emailCheck === true) {
    emailError.style.display = "none";
  } else {
    emailError.style.display = "block";
  }
  if (messageLength === true) {
    messageError.style.display = "none";
  } else {
    messageError.style.display = "block";
  }

  contactForm.reset();
}

contactForm.addEventListener("submit", contactValidation);

function numberOfCharacters(value, len) {
  if (value.trim().length > len) {
    return true;
  } else {
    return false;
  }
}

function emailValidation(email) {
  const regEx = /\S+@\S+\.\S+/;
  const patternMatches = regEx.test(email);
  return patternMatches;
}

const checkCharacterType = function checkIfOnlyLetter(field) {
  if (/^[a-zA-Z ]+$/.test(field.value)) {
    setValid(field);
    return true;
  } else {
    setInvalid(field, `$(field.name)must contain only letter`);
    return false;
  }
};
