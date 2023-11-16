// Function to validate the name field
function validateName(name) {
    return name.length >= 5;
  }
  
  // Function to validate the email field
  function validateEmail(email) {
    var emailPattern = /\S+@\S+\.\S+/;
    return emailPattern.test(email);
  }
  
  // Function to validate the phone number field
  function validatePhone(phone) {
    return !(phone === "123456789" || !/^\d{10}$/.test(phone));
  }
  
  // Function to validate the password field
  function validatePassword(password, name) {
    // Password cannot be 'password'
    if (password.toLowerCase() === 'password') {
      return false;
    }
  
    // Password cannot be the name of the user
    if (password.toLowerCase() === name.toLowerCase()) {
      return false;
    }
  
    // Password should be at least 8 characters long
    return password.length >= 8;
  }
  
  // Function to validate the confirm password field
  function validateConfirmPassword(password, confirmPassword) {
    return password === confirmPassword;
  }
  
  // Validation object to store the validation functions for each input field
  const validations = {
    fullName: validateName,
    email: validateEmail,
    phoneNumber: validatePhone,
    password: (password, fullName) => validatePassword(password, fullName),
    confirmPassword: (password, confirmPassword) => validateConfirmPassword(password, confirmPassword),
    gender: (gender) => !!gender,
    dob: (dob) => !!dob,
    country: (country) => !!country,
  };
  
  // Function to handle input changes (real-time validation)
  function onInputChange(event) {
    var inputElement = event.target;
    var value = inputElement.value.trim();
    var inputName = inputElement.name;
  
    // You can perform real-time validation here if needed
    const validationFunction = validations[inputName];
    if (validationFunction) {
      if (validationFunction(value, document.getElementById('fullName').value)) {
        inputElement.classList.remove('is-invalid');
        inputElement.classList.add('is-valid');
      } else {
        inputElement.classList.remove('is-valid');
        inputElement.classList.add('is-invalid');
      }
    }
  
    // Additional check to display the tick symbol for username, email, and phone number
    if (inputName === 'fullName' || inputName === 'email' || inputName === 'phoneNumber') {
      var isValid = false;
      switch (inputName) {
        case 'fullName':
          isValid = validateName(value);
          break;
        case 'email':
          isValid = validateEmail(value);
          break;
        case 'phoneNumber':
          isValid = validatePhone(value);
          break;
      }
  
      if (isValid) {
        inputElement.classList.add('is-valid');
        inputElement.classList.remove('is-invalid');
      } else {
        inputElement.classList.remove('is-valid');
        inputElement.classList.add('is-invalid');
      }
    }
  }
  
  // Function to handle form submission
  function onSubmitForm(event) {
    event.preventDefault(); // Prevent form submission if validation fails
  
    var fullName = document.getElementById('fullName').value;
    var email = document.getElementById('email').value;
    var phoneNumber = document.getElementById('phoneNumber').value;
    var gender = document.getElementById('gender').value;
    var dob = document.getElementById('dob').value;
    var country = document.getElementById('country').value;
    var password = document.getElementById('password').value;
    var confirmPassword = document.getElementById('confirmPassword').value;
    var errorMessages = [];
  
    // Restyle all input fields as valid by default
    var inputFields = document.querySelectorAll("input, select");
    for (var i = 0; i < inputFields.length; i++) {
      inputFields[i].classList.remove('is-invalid');
      inputFields[i].classList.add('is-valid');
    }
  
    // Name must not be less than 5 characters
    if (fullName.length < 5) {
      errorMessages.push('Name must be at least 5 characters long.');
      document.getElementById("fullName").classList.add('is-invalid');
    }
  
    // Email Id should have @ character in it
    if (!validateEmail(email)) {
      errorMessages.push('Invalid email address.');
      document.getElementById('email').classList.add('is-invalid');
    }
  
    // Phone Number should not be 123456789 and must be a 10-digit number.
    if (phoneNumber === '123456789' || phoneNumber.length !== 10 || isNaN(phoneNumber)) {
      errorMessages.push('Enter a valid 10-digit phone number.');
      document.getElementById('phoneNumber').classList.add('is-invalid');
    }
  
    // Gender must be selected
    if (!validations.gender(gender)) {
      errorMessages.push('Please select your gender.');
      document.getElementById('gender').classList.add('is-invalid');
    }
  
    // Date of Birth must be selected
    if (!validations.dob(dob)) {
      errorMessages.push('Please select your date of birth.');
      document.getElementById('dob').classList.add('is-invalid');
    }
     // Country must be selected
     if (!validations.country(country)) {
      errorMessages.push('Please select your country.');
      document.getElementById('country').classList.add('is-invalid');
    }
  
    // Password cannot be 'password' or 'name of the user' or less than 8 characters.
    if (!validatePassword(password, fullName)) {
      errorMessages.push('Password should be at least 8 characters long and password is not strong.');
      document.getElementById('password').classList.add('is-invalid');
    }
  
    // Password and confirm password should match
    if (!validateConfirmPassword(password, confirmPassword)) {
      errorMessages.push('Passwords do not match.');
      document.getElementById('confirmPassword').classList.add('is-invalid');
    }
   
    const errorDiv = document.getElementById('errorMessages');
    const successDiv = document.getElementById('successMessage');
   
    if (errorMessages.length === 0) {
      // Hide any existing error messages
      errorDiv.innerHTML = '';
      // Show success message
      successDiv.innerHTML = '<div class="alert alert-success">Form submitted successfully!</div>';
      successDiv.style.display = 'block';
      // Hide the success message after 3 seconds
      setTimeout(function () {
        successDiv.style.display = 'none';
      }, 30000);
      // Open a new window for the popup message
      const popupWindow = window.open('', '_blank', 'width=535,height=150,top=200,left=400');
      if (popupWindow) {
         // Center the popup window
         const screenWidth = window.innerWidth;
         const screenHeight = window.innerHeight;
         const popupWidth = 500;
         const popupHeight = 150;
         const left = (screenWidth - popupWidth) / 2;
         const top = (screenHeight - popupHeight) / 2;
        // Write the popup message content to the new window
        popupWindow.document.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>Popup Message</title>
            <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
          </head>
          <body>
            <div class="container mt-3">
              <div class="alert alert-success">Thank you for your submission.</div>
            </div>
          </body>
        </html>
        `);
        // Close the popup window after 3 minutes
        setTimeout(function () {
          popupWindow.close();
        }, 30000);
      }
  
  
      // You can submit the form to the server here if needed.
    } else {
      // Show error messages
      const errorList = errorMessages.map(message => `<div class="alert alert-danger">${message}</div>`).join('');
      errorDiv.innerHTML = errorList;
      // Clear the success message if there was any
      successDiv.style.display = 'none';
    }
  }
  
  // Add event listeners after the page is loaded
  document.addEventListener("DOMContentLoaded", function () {
    // Add onSubmit event listener to the form
    var registrationForm = document.getElementById("registrationForm");
    registrationForm.addEventListener("submit", onSubmitForm);
  
    // Add onChange event listeners to form input fields (real-time validation)
    var inputFields = document.querySelectorAll("input, select");
    for (var i = 0; i < inputFields.length; i++) {
      var inputElement = inputFields[i];
      inputElement.dispatchEvent(new Event('change'));
    }
    // Add event listener to toggle password visibility
  document.getElementById("togglePassword").addEventListener("click", function () {
    const passwordInput = document.getElementById("password");
    const passwordType = passwordInput.getAttribute("type");
    passwordInput.setAttribute("type", passwordType === "password" ? "text" : "password");
    // Toggle the rotation of the eye icon
    const eyeIcon = document.getElementById("togglePassword");
    eyeIcon.classList.toggle("eye-rotated");
  });
  
  // Add event listener to toggle confirm password visibility
  document.getElementById("toggleConfirmPassword").addEventListener("click", function () {
    const confirmPasswordInput = document.getElementById("confirmPassword");
    const confirmPasswordType = confirmPasswordInput.getAttribute("type");
    confirmPasswordInput.setAttribute("type", confirmPasswordType === "password" ? "text" : "password");
     // Toggle the rotation of the eye icon
     const eyeIcon = document.getElementById("toggleConfirmPassword");
     eyeIcon.classList.toggle("eye-rotated");
  });
  });
  