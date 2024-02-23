// Array of special characters to be included in password
var specialCharacters = [
  '@',
  '%',
  '+',
  '\\',
  '/',
  "'",
  '!',
  '#',
  '$',
  '^',
  '?',
  ':',
  ',',
  ')',
  '(',
  '}',
  '{',
  ']',
  '[',
  '~',
  '-',
  '_',
  '.',
]

// Array of numeric characters to be included in password
var numericCharacters = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']

// Array of lowercase characters to be included in password
var lowerCasedCharacters = [
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  'h',
  'i',
  'j',
  'k',
  'l',
  'm',
  'n',
  'o',
  'p',
  'q',
  'r',
  's',
  't',
  'u',
  'v',
  'w',
  'x',
  'y',
  'z',
]

// Array of uppercase characters to be included in password
var upperCasedCharacters = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z',
]

// Function to prompt user for password length
function getPasswordLength() {
  while (true) {
    let lengthPassword = prompt('Please enter the length of your password')
    if (lengthPassword === null) {
      return null
    }
    lengthPassword = parseInt(lengthPassword)
    if (isNaN(lengthPassword)) {
      alert('Please enter a valid number')
    } else if (lengthPassword >= 8 && lengthPassword <= 128) {
      // If the password length is between 8 and 128 (inclusive), return it
      return lengthPassword
    } else {
      alert('Please enter a password length between 8 and 128 characters')
    }
  }
}

//Functions to prompt user for password charcter options
function getLowercaseOptions() {
  return confirm('Do you want your password to contain lowercase letters')
}

function getUppercaseOptions() {
  return confirm('Do you want your password to contain uppercase letters')
}

function getSpecialOptions() {
  return confirm('Do you want your password to contain special characters')
}

function getNumericOptions() {
  return confirm('Do you want your password to contain numbers')
}

function getPasswordOptions() {
  const passwordLength = getPasswordLength()
  if (passwordLength === null) {
    // User canceled
    return null
  }
  const checkLowercase = getLowercaseOptions()
  const checkUppercase = getUppercaseOptions()
  const checkNumbers = getNumericOptions()
  const checkSpecialChar = getSpecialOptions()

  if (
    !checkLowercase &&
    !checkUppercase &&
    !checkNumbers &&
    !checkSpecialChar
  ) {
    alert('Please select at least one character type for your password.')
    return null
  }

  return {
    passwordLength: passwordLength,
    checkLowercase: checkLowercase,
    checkUppercase: checkUppercase,
    checkNumbers: checkNumbers,
    checkSpecialChar: checkSpecialChar,
  }
}

// Function to shuffle an array before selecting characters
function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1))
    let temp = arr[i]
    arr[i] = arr[j]
    arr[j] = temp
  }
}

// Function to generate password with user input
function generatePassword() {
  const passwordOptions = getPasswordOptions()
  if (passwordOptions === null) {
    // User canceled or no options selected
    return ''
  }

  let availableChar = []

  if (passwordOptions.checkLowercase) {
    availableChar = availableChar.concat(lowerCasedCharacters)
  }
  if (passwordOptions.checkUppercase) {
    availableChar = availableChar.concat(upperCasedCharacters)
  }
  if (passwordOptions.checkNumbers) {
    availableChar = availableChar.concat(numericCharacters)
  }
  if (passwordOptions.checkSpecialChar) {
    availableChar = availableChar.concat(specialCharacters)
  }
  if (availableChar.length === 0) {
    alert('Please select at least one character type for your password.')
    return ''
  }
  //Randomize the user password options
  let password = ''
  shuffleArray(availableChar)
  for (let i = 0; i < passwordOptions.passwordLength; i++) {
    password += availableChar[i % availableChar.length]
  }

  return password
}

// Get references to the #generate element
var generateBtn = document.querySelector('#generate')

// Write password to the #password input
function writePassword() {
  var password = generatePassword()
  var passwordText = document.querySelector('#password')

  passwordText.value = password
}

// Add event listener to generate button
generateBtn.addEventListener('click', writePassword)

//Create functionality for the copy button
function copyBtnClicked() {
  let copyText = document.getElementById('password')
  // Create a temporary textarea element
  let textarea = document.createElement('textarea')
  textarea.value = copyText.value

  // Hide the textarea
  textarea.style.position = 'fixed'
  textarea.style.top = 0
  textarea.style.left = 0
  textarea.style.opacity = 0

  // Append the textarea to the document body
  document.body.appendChild(textarea)

  // Select the content of the textarea
  textarea.select()
  try {
    var success = document.execCommand('copy')
    if (!success) {
      throw new Error('Copying failed')
    }
    // Alert the user that the password has been copied
    alert('Password copied to clipboard')
  } catch (err) {
    console.error('Unable to copy:', err)
    alert('Oops, unable to copy the password. Please try again.')
  } finally {
    // Remove the textarea
    document.body.removeChild(textarea)
  }
}
